# A GitHub connector for cognee that costs nothing on a quiet day

My third Mergetober connector brings GitHub issues, pull requests and releases into cognee. The goal I cared about most was not wasting the rate limit.

## What it does

It's a dlt source. Each repository, issue, pull request and release becomes a cognee document, with comments and reviews folded in. Repository documents include the description, topics and README. You can turn on commit messages too.

It doesn't ingest code or diffs, on purpose. A pull request document lists its changed files with line counts, and that's it. This connector is for the discussion around the code, so you can ask cognee things like "which open bugs are waiting on a review?" or "why did we drop that dependency?".

## Setting it up

The PR is open, so the code is on my fork's `feat/github-connector` branch, in `packages/connector/github/`. Install it with `uv sync --all-extras`.

You need a token. A classic token needs `repo` for private repositories. A fine-grained one needs read-only Metadata, Issues, Pull requests and Contents. Export it as `GITHUB_TOKEN`, then:

```python
await cognee.remember(
    github_source(repos=["owner/name"]),
    dataset_name="github",
    primary_key="id",
    write_disposition="merge",
    max_rows_per_table=0,
)
```

`include_commits` and `include_bots` are off by default, and `include_readme` is on.

## Free syncs with ETags

GitHub lets you send back the ETag it gave you last time. If nothing changed, it answers `304 Not Modified`. I checked live, and a 304 doesn't count against your rate limit. The connector stores ETags for every listing page, the repo and the README, so syncing a quiet repo costs zero quota.

For changes, it uses the `since` filter on `GET /issues`, which returns issues and pull requests together. `GET /pulls` ignores `since`, which I also checked.

One thing I found while testing: GitHub updates an issue's `updated_at` a few seconds after the change. A read 3 seconds after a review showed nothing; 15 seconds later it had moved. So the connector looks back 5 minutes each run to catch late stamps.

## "Missing" doesn't always mean deleted

When an issue disappears from the listing, the connector asks GitHub about it once, without following redirects:

- `410` means it was deleted, so forget it.
- `301` to a different repo means it was transferred, so forget it.
- `301` back to the same repo just means the repo was renamed. That one must never delete anything.

Anything else keeps the document and logs a warning. I'd rather keep a stale issue than lose a real one.

## Two kinds of 403

A 403 from GitHub can mean "you don't have access" or "slow down". A secondary rate limit can come back as a 403 with no rate-limit headers at all, only a message. The connector tells them apart and waits the rate limit out instead of treating it as a permission problem. Waits are capped at 60 seconds each and 120 seconds per run. After that, the run stops cleanly and the next one picks up where it left off.

## Trying it for real

I ran ten syncs against my own private test repository, changing things in between, and used a second repo to test transfers. Quiet syncs got a `304` on every single request. In the example, after I edited a comment and deleted an issue, the next run updated one issue and removed one. 151 tests pass on cognee 1.6.2 and 1.6.5.

The PR hasn't been reviewed yet, but it carries every lesson from the reviews of my Asana and Shortcut PRs: prove something is gone before deleting it, cap every wait, and keep the token out of error messages.

- PR: https://github.com/topoteretes/cognee-community/pull/411
- Issue: https://github.com/topoteretes/cognee/issues/5363
