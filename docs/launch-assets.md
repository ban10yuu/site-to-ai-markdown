# Launch Assets

Use these manually. Do not mass-post, auto-post, or repeat identical text across accounts. Before posting, fetch one real page and mention what the Markdown looked like.

## GitHub Description

Turn a URL or HTML file into clean Markdown and JSON for LLM workflows. No scraper account.

## One-Liner

`site-to-ai-markdown` turns one URL or HTML file into clean Markdown and JSON for agent workflows without a hosted scraper account.

## Best Manual Channels

- X: AI agent builders, prompt engineers, scraping/API-cost discussions, local-first devtools
- LinkedIn: teams using LLMs for research, sales, support, or internal knowledge capture
- Hacker News: focus on inspectable one-page conversion, not full crawling
- Reddit: relevant LLM, local-first, and web scraping discussions only; check rules before linking

## X Drafts

### Draft 1

Sometimes an agent does not need a crawler.

It needs one web page as clean Markdown.

I made `site-to-ai-markdown` for that boring case:

```bash
npm exec --yes --package github:ban10yuu/site-to-ai-markdown#main -- site-to-ai-markdown fetch https://example.com --out page.md --json page.json
```

No account. No hosted scraper.

https://github.com/ban10yuu/site-to-ai-markdown

### Draft 2

New small OSS tool:

URL/HTML -> Markdown + JSON

`site-to-ai-markdown` is a local-first cleaner for one-page LLM workflows.

It does not execute JS or pretend to be a full crawler. It gives you an inspectable first pass you can commit with the rest of your work.

https://github.com/ban10yuu/site-to-ai-markdown

### Draft 3

I wanted a cheap way to turn a source page into text for an agent prompt without opening another scraper account.

So I made `site-to-ai-markdown`.

Fetch a URL.
Strip the junk.
Save Markdown and JSON.

https://github.com/ban10yuu/site-to-ai-markdown

## LinkedIn Draft

Many LLM workflows start with a simple need: take one web page and turn it into clean text.

Hosted scraping APIs are useful, but not every task needs an account, a plan, or a crawler.

I made a small open-source CLI called `site-to-ai-markdown` for the one-page case.

It fetches a URL or reads local HTML, then saves:

- Markdown for prompts and notes
- JSON for scripts and agent workflows

Try it:

```bash
npm exec --yes --package github:ban10yuu/site-to-ai-markdown#main -- site-to-ai-markdown fetch https://example.com --out page.md --json page.json
```

GitHub: https://github.com/ban10yuu/site-to-ai-markdown

## Hacker News / Reddit Title Ideas

- Show HN: site-to-ai-markdown, turn one web page into Markdown for LLM workflows
- I built a local URL-to-Markdown CLI for agent prompt prep
- Clean Markdown and JSON from a URL without a hosted scraper account

## Comment Reply Angles

- It is intentionally not a full crawler.
- It does not execute JavaScript in v0.1; the tradeoff is speed and inspectability.
- The target use case is prompt prep and small agent workflows, not large-scale scraping.

## Short Reply For Comments

The narrow use case is the point: one page, clean Markdown and JSON, no scraper account when you just need source text for an LLM workflow.
