import path from "path";
import fs from "fs";
import { bundleMDX } from "mdx-bundler";

interface MdxData {
  frontmatter: {
    [key: string]: any;
  };
  code: string;
}

async function getMdxPath({
  fileName,
  contentPath,
}: {
  fileName: string;
  contentPath: string;
}): Promise<{ filePath: string; directoryPath: string } | null> {
  let fullPath = path.join(contentPath, fileName);

  // if it is a directory, set it as index.mdx
  if (
    fs.existsSync(fullPath) &&
    (await fs.promises.lstat(fullPath)).isDirectory()
  ) {
    return {
      filePath: path.resolve(path.join(fullPath, `index.mdx`)),
      directoryPath: path.resolve(fullPath),
    };
  }
  // if not a folder, check for existence
  fullPath = `${fullPath}.mdx`;
  if (fs.existsSync(fullPath)) {
    return {
      filePath: path.resolve(fullPath),
      directoryPath: path.resolve(contentPath),
    };
  }

  return null;
}

const readMdx = async ({
  fileName,
  contentDir = path.join("src", "content"),
}: {
  fileName: string;
  contentDir?: string;
}): Promise<MdxData | null> => {
  const pathInfo = await getMdxPath({
    fileName: fileName,
    contentPath: contentDir,
  });
  if (!pathInfo) return null;
  return await bundleMDX({
    file: pathInfo.filePath,
    cwd: pathInfo.directoryPath,
  });
};

export type { MdxData };
export { getMdxPath, readMdx };
