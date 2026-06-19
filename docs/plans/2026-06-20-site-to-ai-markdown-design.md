# site-to-ai-markdown Design

## Goal

Build a zero-dependency CLI that converts a URL or local HTML file into Markdown and JSON suitable for AI workflows. The positioning is a local first-pass alternative to hosted scraping APIs.

## Scope

- `fetch <url>` command
- `convert <file.html>` command
- Markdown output
- JSON output with title, description, source, and markdown
- Tests for conversion and CLI output

## Non-Goals

- Full crawling
- JavaScript execution
- Anti-bot bypassing
- Hosted service

## Verification

Run `npm run check`, then execute through GitHub with `npm exec`.
