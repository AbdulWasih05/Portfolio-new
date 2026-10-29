# Shopify doesn't tell you when an order is deleted

My last Mergetober connector brings a Shopify store into cognee. Testing it on a real dev store found a bug that no mock would have caught.

## What it does

It's a dlt source for cognee. Products and collections are synced by default. Customers and orders are opt-in, because they contain personal data. Each item becomes a document. Orders name their customer and products, and collections name their products, so cognee links them up. Product documents leave out inventory on purpose, because it changes with every sale. Then you can ask things like "which products are in the summer collection?" or "what did this customer order last month?".

## Setting it up

The PR is open, so the code is on my fork's `feat/shopify-connector` branch, in `packages/connector/shopify/`. Install it with `uv sync --all-extras`.

You need a dev store and an app:

1. In the Shopify Dev Dashboard, create an organization and a development store. Make the store in the Dev Dashboard. One made from the Shopify admin fails the token request.
2. Create an app with `read_products`, plus `read_customers` and `read_orders` if you want them, release it and install it on the store.
3. Export `SHOPIFY_SHOP`, `SHOPIFY_CLIENT_ID` and `SHOPIFY_CLIENT_SECRET`.

```python
await cognee.remember(
    shopify_source(),  # resources=(..., "customers", "orders") to opt in
    dataset_name="shopify",
    primary_key="id",
    write_disposition="merge",
    max_rows_per_table=0,
)
```

The connector swaps the client id and secret for a token at the start of every run and keeps it in memory only. It only ever sends read queries.

## The missing delete event

To forget deleted items, the connector waits for Shopify to confirm they're gone. I deleted a product and a collection on my dev store, and each showed up right away as a `destroy` event. Then I deleted an order. Shopify logged cancelled, closed and refund events, but no `destroy` event, even 8 minutes later.

My first version waited for that event, so deleted orders stayed in cognee forever. Now the connector checks missing orders directly with a `nodes(ids:)` query. If Shopify answers `null`, the order is gone. That query costs 1 point whether you ask about 1 order or 250.

Orders have one more catch. Without a special scope you only see the last 60 days, and an order ageing out of that window is not a deletion. So orders are only checked while they're more than 7 days inside the window, measured on Shopify's clock so a wrong local clock can't shift it.

## Changing my own plan

My proposal said customers and orders would be relational tables. After reading cognee's code, I saw three problems: one source can't mix tables and documents, foreign keys couldn't point at product documents, and one changed order would reprocess every customer and order. So I switched to plain documents for all of it, and cognee's entity extraction does the linking.

## Paying for queries in points

Shopify limits GraphQL by query cost, not request count. The connector reads the throttle status that comes back with every answer and waits before a query it can't afford. My most expensive query, orders, cost 74 points live, well under the 1,000-point limit. The test fake refuses anything over 1,000, so every query is checked in tests.

Customer data is granted per field, too. Without the Name field, Shopify refuses `displayName`. I hit that live, so the connector now stops with the field name instead of a vague error.

## Trying it for real

On my dev store I edited one product and deleted another, then ran the example again. It updated one document and removed one, and cognee went from 22 documents to 21. 138 tests pass on cognee 1.6.5 and 1.6.2.

The live test was worth more than any amount of reading the docs.

- PR: https://github.com/topoteretes/cognee-community/pull/418
- Issue: https://github.com/topoteretes/cognee/issues/5348
