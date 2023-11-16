"use client";
import { Theme } from "../types";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={Theme.Dark}>
      {children}
    </ThemeProvider>
  );
}
