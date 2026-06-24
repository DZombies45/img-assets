import { execSync } from "node:child_process";
import path from "node:path";

function getGithubLink(filePath) {
  const repo = execSync("git remote get-url origin", {
    encoding: "utf8",
  }).trim();
  const branch = execSync("git branch --show-current", {
    encoding: "utf8",
  }).trim();
  const root = execSync("git rev-parse --show-toplevel", {
    encoding: "utf8",
  }).trim();

  // Ubah URL SSH menjadi HTTPS
  let url = repo;
  if (url.startsWith("git@github.com:")) {
    url = "https://github.com/" + url.slice("git@github.com:".length);
  }
  url = url.replace(/\.git$/, "");

  const relPath = path
    .relative(root, path.resolve(filePath))
    .replace(/\\/g, "/");

  return `${url}/blob/${branch}/${relPath}`;
}

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

const fileLink = getGithubLink(input);

const result = toJsDelivr(fileLink);

if (!result) {
  console.error("Error: URL tidak valid atau format tidak dikenali.");
  process.exit(1);
}

console.log(result);
