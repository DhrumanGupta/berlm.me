import Footer from "@/components/Footer";
import { cn } from "@/lib/cn";
import { baseUrl } from "@/lib/constants";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Inter, Newsreader } from "next/font/google";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import "../styles/prose.css";

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
  display: "swap",
  adjustFontFallback: false,
});

const title = "Dhruman Gupta";
const description =
  "Hi! I'm Dhruman Gupta, a tech enthusiant and an aspiring Software Engineer, currently working personal and open source projects.";
const themeScript = `
try {
  const theme = localStorage.getItem("theme") || "dark";
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.classList.toggle("light", theme === "light");
} catch {}
`;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: title,
    template: `%s – Dhruman Gupta`,
  },
  description,
  manifest: "/manifest.json",
  openGraph: {
    locale: "en_US",
    type: "website",
    siteName: "Dhruman Gupta",
    title: {
      default: title,
      template: `%s – Dhruman Gupta`,
    },
    description,
    url: baseUrl,
  },
  twitter: {
    site: "@dhrumangupta",
    title: {
      default: title,
      template: `%s – Dhruman Gupta`,
    },
    description,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "Dhruman Gupta", url: baseUrl }],
  other: {
    "google-adsense-account": "ca-pub-6670854316805103",
  },
};

export const viewport = {
  themeColor: "#12141a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-pt-24">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <meta name="google-adsense-account" content="ca-pub-6670854316805103" />
        <link
          rel="shortcut icon"
          href={"/logo/dark/72x72.png"}
          type="image/x-icon"
        />
      </head>
      <body
        className={cn(
          "transition duration-500 bg-white dark:bg-gray-900 font-sans",
          sans.variable,
          serif.variable
        )}
      >
        <Navbar />

        <div className="mx-5 sm:mx-8">
          <main className="mx-auto max-w-[75ch]">
            {children}
            <Footer />
          </main>
        </div>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
