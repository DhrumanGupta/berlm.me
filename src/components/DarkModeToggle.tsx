"use client";
import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";
import { Theme } from "../types";
import { MoonIcon } from "./icons/moon-icon";
import { SunIcon } from "./icons/sun-icon";

const iconTransformOrigin = { transformOrigin: "50% 100px" };
const shiftSafeSize = "h-10 w-10 lg:h-12 lg:w-12";

export function DarkModeToggle() {
  const [theme, setTheme] = useState<Theme>(Theme.Dark);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const initialTheme = storedTheme === Theme.Light ? Theme.Light : Theme.Dark;

    setTheme(initialTheme);
    setMounted(true);
  }, []);

  if (!mounted) return <i className={shiftSafeSize}>...</i>;

  const label =
    theme === Theme.Dark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => {
        const nextTheme = theme === Theme.Dark ? Theme.Light : Theme.Dark;
        localStorage.setItem("theme", nextTheme);
        document.documentElement.classList.toggle(
          Theme.Dark,
          nextTheme === Theme.Dark
        );
        document.documentElement.classList.toggle(
          Theme.Light,
          nextTheme === Theme.Light
        );
        setTheme(nextTheme);
      }}
      className={cn(
        "relative shrink-0 border-secondary hover:border-primary focus:border-primary focus:outline-none inline-flex items-center justify-center overflow-hidden rounded-full border-2 p-1 transition",
        shiftSafeSize
      )}
    >
      <div className="relative h-6 w-6">
        <span
          className="absolute inset-0 rotate-90 transform text-black transition-transform duration-1000 motion-reduce:duration-[0s] dark:rotate-0 dark:text-white"
          style={iconTransformOrigin}
        >
          <MoonIcon />
        </span>
        <span
          className="absolute inset-0 rotate-0 transform text-black transition-transform duration-1000 motion-reduce:duration-[0s] dark:-rotate-90 dark:text-white"
          style={iconTransformOrigin}
        >
          <SunIcon />
        </span>
      </div>
    </button>
  );
}
