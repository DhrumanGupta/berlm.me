import fs from "node:fs/promises";
import path from "node:path";
import calculateReadingTime from "reading-time";
import { getPlaiceholder } from "plaiceholder";
import { parse } from "yaml";

const rootDirectory = process.cwd();
const notesDirectory = path.join(rootDirectory, "content", "notes");
const publicDirectory = path.join(rootDirectory, "public");
const manifestPath = path.join(notesDirectory, "manifest.json");

const frontmatterPattern = /^---\s*\n([\s\S]*?)\n---/;
const headerImageNames = [
  "header.webp",
  "header.png",
  "header.jpg",
  "header.jpeg",
];
const requiredFrontmatterFields = ["title", "description", "date", "color"];
const validColors = new Set(["red", "blue", "yellow", "green"]);

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getImageAssets(slug) {
  for (const imageName of headerImageNames) {
    const image = `/notes/${slug}/${imageName}`;
    const imagePath = path.join(publicDirectory, image);

    if (!(await fileExists(imagePath))) {
      continue;
    }

    const buffer = await fs.readFile(imagePath);
    const { base64 } = await getPlaiceholder(buffer, { size: 10 });

    return { image, base64 };
  }

  return {};
}

function parseFrontmatter(fileContent, filename) {
  const match = fileContent.match(frontmatterPattern);

  if (!match) {
    throw new Error(`Missing frontmatter in ${filename}`);
  }

  return parse(match[1]) ?? {};
}

function validateFrontmatter(frontmatter, filename) {
  for (const field of requiredFrontmatterFields) {
    if (frontmatter[field] === undefined || frontmatter[field] === null) {
      throw new Error(`Missing required frontmatter field "${field}" in ${filename}`);
    }
  }

  const parsedDate = new Date(frontmatter.date);
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error(`Invalid date "${frontmatter.date}" in ${filename}`);
  }

  if (!validColors.has(frontmatter.color)) {
    throw new Error(
      `Invalid color "${frontmatter.color}" in ${filename}. Expected one of: ${[...validColors].join(", ")}`
    );
  }
}

await fs.mkdir(notesDirectory, { recursive: true });

const filenames = (await fs.readdir(notesDirectory))
  .filter((filename) => filename.endsWith(".mdx"))
  .sort();

const notes = await Promise.all(
  filenames.map(async (filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(notesDirectory, filename);
    const fileContent = await fs.readFile(filePath, "utf8");
    const frontmatter = parseFrontmatter(fileContent, filename);

    validateFrontmatter(frontmatter, filename);

    const imageAssets = await getImageAssets(slug);

    return {
      ...frontmatter,
      ...imageAssets,
      slug,
      readingTime: calculateReadingTime(fileContent),
    };
  })
);

await fs.writeFile(manifestPath, `${JSON.stringify(notes, null, 2)}\n`);
