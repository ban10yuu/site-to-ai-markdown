# site-to-ai-markdown

Turn one messy web page into Markdown for an LLM without buying scraper credits.

`site-to-ai-markdown` fetches a URL or reads an HTML file, strips the junk, and saves clean Markdown plus JSON. It is for the common case where you need one inspectable page in an agent workflow, not a hosted crawler account.

Run it in 20 seconds:

```bash
npm exec --yes --package github:ban10yuu/site-to-ai-markdown#main -- site-to-ai-markdown fetch https://example.com --out page.md --json page.json
```

No account. No hosted scraper. No dependencies.

## Why people star it

- Turn a page into LLM-ready Markdown without signing up for a scraping API
- Keep source capture local, inspectable, and easy to commit with the rest of your work
- Save both Markdown and JSON so agents and scripts can consume the same fetch
- Use a small zero-dependency CLI for one-page research and prompt prep

If this saves you from opening a hosted scraper account for one page, star the repo so other agent builders can find it.

## Why this exists

AI agents often need web pages as clean text, not raw HTML. Hosted scraping APIs are useful, but a lot of work starts with one page and should not require an account or monthly plan. `site-to-ai-markdown` gives you a local first pass that is easy to inspect and version-control.

## Usage

Fetch a URL:

```bash
site-to-ai-markdown fetch https://example.com --out page.md --json page.json
```

Convert a local HTML file:

```bash
site-to-ai-markdown convert examples/sample.html --out sample.md --json sample.json
```

Output JSON shape:

```json
{
  "title": "Example",
  "description": "Short description",
  "markdown": "# Example..."
}
```

## Limits

This is a single-page cleaner, not a full crawler. It does not execute JavaScript. That is intentional for v0.1: fast, local, inspectable.

## Share it

Manual launch copy is in [`docs/launch-assets.md`](docs/launch-assets.md). Use it as a starting point for X, LinkedIn, Hacker News, or Reddit. Do not mass-post identical text.

## Verification

```bash
npm run check
```

## License

MIT
