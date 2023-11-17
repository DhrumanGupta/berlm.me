import fs from "fs/promises";
import path from "path";
import { getPlaiceholder } from "plaiceholder";

export const getPlaceholderLocal = async (image: string) => {
  const buffer = await fs.readFile(path.join("./public", image));
  const { base64 } = await getPlaiceholder(buffer);

  return base64;
};
