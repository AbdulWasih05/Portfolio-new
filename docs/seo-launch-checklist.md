# SEO launch checklist: wasihh.tech

Goal: rank #1 on Google for "Abdul Wasih", and be described accurately by AI assistants
(ChatGPT, Claude, Perplexity). The on-site work is done in code (prerendered pages,
structured data, sitemap, llms.txt). These steps happen outside the codebase.

## Before deploying

- [ ] Replace placeholder copy, because `llms.txt` / `llms-full.txt` publish it as fact:
  - [ ] Stealth Startup entry: the made-up "Logistics startup" and "AI summarisation engine"
        (`src/data/experience.ts`)
  - [ ] Saarthi: the number of features shipped (TODO in `src/data/experience.ts`)
  - [ ] Every line marked `DRAFT copy` (projects, About, quick facts)
- [ ] Make sure the demo subdomains are live on the new domain:
  - [ ] https://vidyut-mitra.wasihh.tech/ (VidyutMitra "Try it live")
  - [ ] https://square.wasihh.tech/ (Real Estate Platform)

## Right after deploying

- [ ] Check https://www.wasihh.tech/sitemap.xml, /llms.txt and /robots.txt load
- [ ] Check an unknown URL (e.g. /nope) shows the 404 page with a real 404 status
- [ ] Test a share preview: paste the site link into LinkedIn's Post Inspector and X

## Profiles (the biggest ranking factor for a name search)

- [ ] GitHub: website field `wasih.tech` → `https://www.wasihh.tech`
- [ ] LinkedIn: Contact info → Website, and add the site to Featured
- [ ] X (@iamwasih): website field in the bio
- [ ] Use exactly "Abdul Wasih" as the display name everywhere
- [ ] Link the site from GitHub READMEs and open-source contributor profiles

## Search engines

- [ ] Google Search Console: add `https://www.wasihh.tech`, verify (DNS record, or ask
      for a verification meta tag in index.html), submit `sitemap.xml`
- [ ] URL Inspection → "Request indexing" for the home page and /projects
- [ ] Bing Webmaster Tools: import from Search Console, submit the sitemap
      (ChatGPT's search uses Bing's index)
- [ ] If you still own `wasih.tech`: 301-redirect it to `https://www.wasihh.tech`

## Later

- [ ] One or two short write-ups (dev.to, Hashnode or LinkedIn articles) that link to
      the case studies
- [ ] After a week or two: search "Abdul Wasih" and check Search Console → Performance
