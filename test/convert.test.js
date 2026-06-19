import assert from "node:assert/strict";
import { mkdtemp, readFile, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import test from "node:test";
import { htmlToAiDocument, htmlToMarkdown } from "../src/convert.js";

const sample = `<!doctype html><html><head><title>Demo</title><meta name="description" content="Desc"></head><body><h1>Hello</h1><p>Use <a href="https://example.com">Example</a>.</p><script>bad()</script><ul><li>One</li></ul></body></html>`;

test("htmlToMarkdown strips noise and converts core tags", () => {
  const markdown = htmlToMarkdown(sample);
  assert.match(markdown, /# Hello/);
  assert.match(markdown, /\[Example\]\(https:\/\/example.com\)/);
  assert.match(markdown, /- One/);
  assert.doesNotMatch(markdown, /bad/);
});

test("htmlToAiDocument returns title, description, and markdown", () => {
  const document = htmlToAiDocument(sample, "sample");
  assert.equal(document.title, "Demo");
  assert.equal(document.description, "Desc");
  assert.match(document.markdown, /# Hello/);
});

test("CLI convert writes markdown and JSON", async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), "site-to-ai-markdown-"));
  const htmlPath = path.join(dir, "sample.html");
  const mdPath = path.join(dir, "sample.md");
  const jsonPath = path.join(dir, "sample.json");
  await writeFile(htmlPath, sample, "utf8");

  const result = await run(["convert", htmlPath, "--out", mdPath, "--json", jsonPath]);
  assert.equal(result.code, 0);
  await stat(mdPath);
  const json = JSON.parse(await readFile(jsonPath, "utf8"));
  assert.equal(json.title, "Demo");
});

function run(args) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [path.resolve("bin/site-to-ai-markdown.js"), ...args], {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("close", (code) => resolve({ code, stdout, stderr }));
  });
}
