import fs from "node:fs/promises";
import path from "node:path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const MIME_TYPES = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
};

function parseArgs(argv) {
  const args = {};

  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--slug") args.slug = argv[++i];
    else if (argv[i] === "--file") args.file = argv[++i];
    else if (argv[i] === "--name") args.name = argv[++i];
  }

  return args;
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required env var: ${name}`);
    process.exit(1);
  }
  return value;
}

async function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");

  try {
    const content = await fs.readFile(envPath, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIndex = trimmed.indexOf("=");
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex).trim();
      const value = trimmed.slice(eqIndex + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // .env.local is optional
  }
}

async function main() {
  await loadEnvLocal();

  const { slug, file, name } = parseArgs(process.argv.slice(2));

  if (!slug || !file) {
    console.error(
      "Usage: pnpm upload:note-media --slug <note-slug> --file <path> [--name <filename>]"
    );
    process.exit(1);
  }

  const accountId = requireEnv("R2_ACCOUNT_ID");
  const accessKeyId = requireEnv("R2_ACCESS_KEY_ID");
  const secretAccessKey = requireEnv("R2_SECRET_ACCESS_KEY");
  const bucketName = requireEnv("R2_BUCKET_NAME");
  const publicUrl = requireEnv("NEXT_PUBLIC_R2_PUBLIC_URL");

  const filePath = path.resolve(file);
  const filename = name ?? path.basename(filePath);
  const key = `notes/${slug}/${filename}`;
  const ext = path.extname(filename).toLowerCase();
  const contentType = MIME_TYPES[ext] ?? "application/octet-stream";

  const body = await fs.readFile(filePath);

  const client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });

  await client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  const url = `${publicUrl.replace(/\/$/, "")}/${key}`;
  console.log(`Uploaded ${filename} → ${url}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
