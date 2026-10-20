# Doctren

The public research site for Doctren, published at [doctren.com](https://doctren.com). Plain HTML and CSS, built with [Eleventy](https://www.11ty.dev/), searchable with [Pagefind](https://pagefind.app/), and hosted free on Netlify.

## Publish a new report

1. Copy `report-template.md` into `src/reports/` and rename it, for example `src/reports/volunteer-retention.md`. The file name becomes the web address: `/reports/volunteer-retention/`.
2. Fill in the details at the top (title, description, date, topic, authors) and write the report below it. Each `##` heading becomes an entry in the contents list.
3. Put the PDF and thumbnail image in `src/files/`, and point `pdf:` and `thumbnail:` at them (e.g. `/files/volunteer-retention.pdf`). Thumbnails look best at 3:2, around 1200 × 800 px.
4. Delete the `draft: true` line when it's ready.
5. Commit and push (or upload the files on github.com). Netlify rebuilds the site in about a minute.

The new report appears automatically on the home page (the newest report is featured), in All research, in its topic page, and in search.

### Bangla edition

The whole site has a Bangla version at `/bn/`, reached with the **EN | বাংলা** switch in the header.

To add a Bangla edition of a report, create `src/reports/bn/<same-file-name>.md` (for example `src/reports/bn/volunteer-retention.md`). Translate the title, description, authors and text; keep `date` and `topic` exactly as in the English file. It is published at `/bn/reports/volunteer-retention/` and linked to the English report automatically. Reports without a Bangla edition still appear on the Bangla site, marked "শুধু ইংরেজিতে" (English only).

Interface text (menus, buttons, labels) is in `src/_data/i18n.js`. Bangla topic names are in `src/_data/site.js` (`nameBn`, `descriptionBn`). The legal pages are English only.

## Change site settings

Edit `src/_data/site.js` for the site name, contact email, social media links and the list of topics. A report's `topic:` must match one of the topic names exactly.

## Contact form

The form on `/contact/` uses Netlify Forms. Messages appear in the Netlify dashboard under **Forms**, and you can turn on email notifications there.

## Run it on your computer

```bash
npm install
npm start        # live preview at http://localhost:8080 (search works after a build)
npm run build    # full build with search, output in _site/
```

## Put it online (first time only)

1. Sign in to [netlify.com](https://www.netlify.com/) with GitHub.
2. **Add new site → Import an existing project → GitHub**, and pick this repository.
3. The settings are read from `netlify.toml`, so just press **Deploy**.
4. Optional: add your own domain under **Domain management**, then update `url` in `src/_data/site.js`.

## Folder map

```
src/
  _data/site.js           site name, social links, topics
  _includes/layouts/      page frame (base.njk) and report page (report.njk)
  _includes/partials/     the report card used in lists
  assets/css/style.css    all styling
  assets/img/             logo, favicon and share image
  files/                  PDFs and thumbnails
  reports/                one Markdown file per report
  index.njk, research.njk, topics/, about.njk, contact.njk, search.njk
report-template.md        copy this to start a new report
```
