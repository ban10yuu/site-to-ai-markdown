#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { htmlToAiDocument } from "../src/convert.js";

const help = `site-to-ai-markdown

Turn a URL or HTML file into clean Markdown and JSON for LLM workflows.

Usage:
  site-to-ai-markdown fetch <url> [--out page.md] [--json page.json]
  site-to-ai-markdown convert <file.html> [--out page.md] [--json page.json]
  site-to-ai-markdown --help
  site-to-ai-markdown --version
`;

async function main(args = process.argv.slice(2)) {
  const command = args[0];
  if (!command || command === "--help" || command === "-h") {
    process.stdout.write(help);
    return 0;
  }
  if (command === "--version" || command === "-v") {
    process.stdout.write("0.1.0\n");
    return 0;
  }

  if (command === "fetch") {
    const url = args[1];
    if (!url) return fail("Missing URL.");
    const response = await fetch(url, { headers: { "user-agent": "site-to-ai-markdown/0.1.0" } });
    if (!response.ok) return fail(`Fetch failed: ${response.status} ${response.statusText}`);
    const html = await response.text();
    return writeOutputs(htmlToAiDocument(html, url), args);
  }

  if (command === "convert") {
    const file = args[1];
    if (!file) return fail("Missing HTML file path.");
    const html = await readFile(file, "utf8");
    return writeOutputs(htmlToAiDocument(html, file), args);
  }

  return fail(`Unknown command: ${command}`);
}

async function writeOutputs(document, args) {
  const markdownPath = valueOf(args, "--out");
  const jsonPath = valueOf(args, "--json");
  if (markdownPath) {
    await writeFile(markdownPath, document.markdown, "utf8");
    process.stdout.write(`Wrote ${markdownPath}\n`);
  }
  if (jsonPath) {
    await writeFile(jsonPath, JSON.stringify(document, null, 2) + "\n", "utf8");
    process.stdout.write(`Wrote ${jsonPath}\n`);
  }
  if (!markdownPath && !jsonPath) {
    process.stdout.write(document.markdown);
  }
  return 0;
}

function valueOf(args, flag) {
  const equal = args.find((arg) => arg.startsWith(`${flag}=`));
  if (equal) return equal.slice(flag.length + 1);
  const index = args.indexOf(flag);
  if (index === -1) return undefined;
  const value = args[index + 1];
  return value && !value.startsWith("-") ? value : undefined;
}

function fail(message) {
  process.stderr.write(`${message}\n\n${help}`);
  return 1;
}

main().then((code) => {
  process.exitCode = code;
}).catch((error) => {
  process.stderr.write(`site-to-ai-markdown failed: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
