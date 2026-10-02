const fs = require("node:fs");
const path = require("node:path");

const frontendDirectory = path.join(__dirname, "template 3", "frontend");
const outputDirectory = path.join(__dirname, "dist");
const publicDirectory = path.join(frontendDirectory, "public");

if (!fs.existsSync(path.join(frontendDirectory, "index.html"))) {
  throw new Error("Expected template 3/frontend/index.html.");
}

fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.mkdirSync(outputDirectory, { recursive: true });
fs.cpSync(frontendDirectory, outputDirectory, {
  recursive: true,
  filter: (source) => !["public", "img", "node.js", "package-lock.json"].includes(path.basename(source))
});
if (fs.existsSync(publicDirectory)) {
  fs.cpSync(publicDirectory, outputDirectory, { recursive: true });
}

console.log(`Built static site into ${path.relative(__dirname, outputDirectory)}.`);
