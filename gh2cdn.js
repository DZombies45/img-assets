#!/usr/bin/env node

const input = process.argv[2];

if (!input) {
  console.error("Usage: node convert.js <github-url>");
  process.exit(1);
}

function toJsDelivr(githubUrl) {
  const blobPattern =
    /https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)/;
  const rawPattern =
    /https:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)/;

  const match = githubUrl.match(blobPattern) || githubUrl.match(rawPattern);
  if (!match) return null;

  const [, user, repo, branch, filePath] = match;
  return `https://cdn.jsdelivr.net/gh/${user}/${repo}@${branch}/${filePath}`;
}

const result = toJsDelivr(input);

if (!result) {
  console.error("Error: URL tidak valid atau format tidak dikenali.");
  process.exit(1);
}

console.log(result);
