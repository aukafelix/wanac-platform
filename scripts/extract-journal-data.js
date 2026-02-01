/**
 * One-time script: extract 365 prompts and 52 weekly actions from the EPUB HTML.
 * Run from project root: node scripts/extract-journal-data.js
 */

const fs = require("fs");
const path = require("path");

const EPUB_TEXT = path.join(__dirname, "../public/365 Journal Writing Ideas.epub/text");
const OUT_DIR = path.join(__dirname, "../src/data");

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function extractPromptText(blockHtml) {
  const beforeTable = blockHtml.includes("<table") ? blockHtml.split("<table")[0] : blockHtml;
  const parts = [];
  const pRegex = /<p class="calibre(?:17|15|18|75)"[^>]*>([\s\S]*?)<\/p>/g;
  let m;
  while ((m = pRegex.exec(beforeTable)) !== null) {
    const text = stripHtml(m[1]);
    if (text && text.length > 2) parts.push(text);
  }
  return parts.join(" ").trim() || stripHtml(beforeTable).slice(0, 500);
}

function extractPrompts() {
  const partFiles = ["part0000_split_000.html", "part0000_split_001.html", "part0000_split_002.html", "part0000_split_003.html"];
  const allPrompts = [];
  const promptNumRegex = /<span class="calibre4">(\d+)<\/span>\s*<\/h1>/g;

  for (const file of partFiles) {
    const html = fs.readFileSync(path.join(EPUB_TEXT, file), "utf8");
    let match;
    const indices = [];
    while ((match = promptNumRegex.exec(html)) !== null) {
      const num = parseInt(match[1], 10);
      if (num >= 1 && num <= 365) indices.push({ num, contentStart: match.index + match[0].length, nextStart: match.index });
    }
    for (let i = 0; i < indices.length; i++) {
      const start = indices[i].contentStart;
      const end = i + 1 < indices.length ? indices[i + 1].nextStart : html.length;
      const block = end > start ? html.slice(start, end) : html.slice(start, start + 3000);
      const text = extractPromptText(block);
      if (text) allPrompts.push({ number: indices[i].num, text });
    }
  }

  const byNum = new Map(allPrompts.map((p) => [p.number, p]));
  const sorted = [];
  for (let n = 1; n <= 365; n++) {
    if (byNum.has(n)) sorted.push(byNum.get(n));
  }
  return sorted;
}

function extractWeeklyActions() {
  const html = fs.readFileSync(path.join(EPUB_TEXT, "part0000_split_003.html"), "utf8");
  const actions = [];
  const weekRegex = /<span class="calibre41">Week (\d+)\.<\/span><\/h2>\s*((?:<p[^>]*>[\s\S]*?<\/p>\s*)*?)(?=<h2[^>]*>|$)/g;
  let m;
  while ((m = weekRegex.exec(html)) !== null) {
    const weekNum = parseInt(m[1], 10);
    if (weekNum >= 1 && weekNum <= 52) {
      const block = m[2];
      const pRegex = /<p class="calibre(?:35|17)"[^>]*>([\s\S]*?)<\/p>/g;
      const parts = [];
      let pm;
      while ((pm = pRegex.exec(block)) !== null) {
        const text = stripHtml(pm[1]);
        if (text) parts.push(text);
      }
      const text = parts.join(" ").trim();
      if (text) actions.push({ week: weekNum, text });
    }
  }
  actions.sort((a, b) => a.week - b.week);
  return actions;
}

function main() {
  console.log("Extracting 365 prompts...");
  const prompts = extractPrompts();
  console.log("Extracting 52 weekly actions...");
  const weeklyActions = extractWeeklyActions();

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  fs.writeFileSync(path.join(OUT_DIR, "journalPrompts.json"), JSON.stringify(prompts, null, 2), "utf8");
  fs.writeFileSync(path.join(OUT_DIR, "weeklyActions.json"), JSON.stringify(weeklyActions, null, 2), "utf8");

  console.log("Wrote journalPrompts.json:", prompts.length, "prompts");
  console.log("Wrote weeklyActions.json:", weeklyActions.length, "weekly actions");
}

main();
