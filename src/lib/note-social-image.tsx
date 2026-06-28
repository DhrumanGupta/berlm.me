import { formatNoteDateLong } from "@/lib/format-date";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const noteSocialImageSize = { width: 1200, height: 630 };
export const noteSocialImageContentType = "image/png";

type NoteColor = "red" | "blue" | "yellow" | "green";

interface NoteSocialImageData {
  title: string;
  description: string;
  date: number;
  readingTime: string;
  color: NoteColor;
}

const noteColorAccents: Record<NoteColor, string> = {
  red: "#ff4545",
  blue: "#8a9bab",
  yellow: "#ffd644",
  green: "#22c55e",
};

const background = "#12141a";
const textPrimary = "#f7f7f7";
const textSecondary = "#9da3ae";

const fontsDirectory = join(process.cwd(), "src/assets/fonts");

const fontFilenames = {
  interRegular: "Inter-Regular.ttf",
  interSemiBold: "Inter-SemiBold.ttf",
  newsreader: "Newsreader-Regular.ttf",
} as const;

async function loadFont(filename: string): Promise<ArrayBuffer> {
  const buffer = await readFile(join(fontsDirectory, filename));
  const arrayBuffer = new ArrayBuffer(buffer.byteLength);
  new Uint8Array(arrayBuffer).set(buffer);
  return arrayBuffer;
}

let fontsPromise: Promise<{
  interRegular: ArrayBuffer;
  interSemiBold: ArrayBuffer;
  newsreader: ArrayBuffer;
}> | null = null;

function getFonts() {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      loadFont(fontFilenames.interRegular),
      loadFont(fontFilenames.interSemiBold),
      loadFont(fontFilenames.newsreader),
    ]).then(([interRegular, interSemiBold, newsreader]) => ({
      interRegular,
      interSemiBold,
      newsreader,
    }));
  }

  return fontsPromise;
}

export async function createNoteSocialImageResponse(
  data: NoteSocialImageData
): Promise<ImageResponse> {
  const { interRegular, interSemiBold, newsreader } = await getFonts();
  const accent = noteColorAccents[data.color];
  const formattedDate = formatNoteDateLong(data.date);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: background,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 8,
            backgroundColor: accent,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "72px 80px 64px 96px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Inter",
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: accent,
              }}
            >
              Note
            </div>

            <div
              style={{
                display: "flex",
                fontFamily: "Newsreader",
                fontSize: 64,
                lineHeight: 1.15,
                color: textPrimary,
                maxWidth: 980,
              }}
            >
              {data.title}
            </div>

            <div
              style={{
                display: "flex",
                fontFamily: "Inter",
                fontSize: 28,
                lineHeight: 1.4,
                color: textSecondary,
                maxWidth: 900,
              }}
            >
              {data.description}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "Inter",
                fontSize: 22,
                color: textSecondary,
              }}
            >
              {formattedDate} · {data.readingTime}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 4,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontFamily: "Inter",
                  fontSize: 22,
                  fontWeight: 600,
                  color: textPrimary,
                }}
              >
                Dhruman Gupta
              </div>
              <div
                style={{
                  display: "flex",
                  fontFamily: "Inter",
                  fontSize: 20,
                  color: accent,
                }}
              >
                berlm.me
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...noteSocialImageSize,
      fonts: [
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interSemiBold, weight: 600, style: "normal" },
        { name: "Newsreader", data: newsreader, weight: 400, style: "normal" },
      ],
    }
  );
}

export async function createFallbackNoteSocialImageResponse(): Promise<ImageResponse> {
  return createNoteSocialImageResponse({
    title: "Notes",
    description: "Writing by Dhruman Gupta",
    date: Date.now(),
    readingTime: "",
    color: "blue",
  });
}
