# site-to-ai-markdown

Turn a URL or HTML file into clean Markdown and JSON for AI workflows.

```bash
npm exec --yes --package github:ban10yuu/site-to-ai-markdown#main -- site-to-ai-markdown fetch https://example.com --out page.md --json page.json
```

No account. No hosted scraper. No dependencies.

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

## Verification

```bash
npm run check
```

## License

MIT
