"use client";

import { useEffect, useId, useLayoutEffect, useState } from "react";

interface MermaidProps {
  chart: string;
}

function getCssVar(name: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();

  return value || fallback;
}

function getMermaidConfig(isDark: boolean) {
  const gray100 = getCssVar("--color-gray-100", "#f7f7f7");
  const gray300 = getCssVar("--color-gray-300", "#babec4");
  const gray400 = getCssVar("--color-gray-400", "#818890");
  const gray500 = getCssVar("--color-gray-500", "#535661");
  const gray800 = getCssVar("--color-gray-800", "#2e3039");
  const gray900 = getCssVar("--color-gray-900", "#1f2028");
  const blue100 = getCssVar("--color-blue-100", "#edf4fc");
  const blue500 = getCssVar("--color-blue-500", "#507a9a");
  const accent = getCssVar("--color-accent", "#1d6fd8");
  const white = getCssVar("--color-white", "#fff");
  const black = getCssVar("--color-black", "#000");
  const fontFamily = getComputedStyle(document.body).fontFamily;

  const themeVariables = isDark
    ? {
        darkMode: true,
        background: "transparent",
        fontFamily,
        fontSize: "13px",
        primaryColor: gray800,
        primaryTextColor: getCssVar("--color-gray-300", "#c5c9cf"),
        primaryBorderColor: blue500,
        secondaryColor: gray900,
        secondaryTextColor: getCssVar("--color-gray-400", "#9da3ae"),
        secondaryBorderColor: gray500,
        tertiaryColor: gray900,
        tertiaryTextColor: getCssVar("--color-gray-400", "#9da3ae"),
        tertiaryBorderColor: gray500,
        lineColor: gray500,
        textColor: getCssVar("--color-gray-300", "#c5c9cf"),
        mainBkg: gray800,
        secondBkg: gray900,
        border1: gray500,
        border2: gray400,
        arrowheadColor: gray400,
        edgeLabelBackground: gray900,
        nodeTextColor: getCssVar("--color-gray-300", "#c5c9cf"),
        clusterBkg: gray900,
        clusterBorder: gray500,
        titleColor: white,
      }
    : {
        darkMode: false,
        background: "transparent",
        fontFamily,
        fontSize: "13px",
        primaryColor: blue100,
        primaryTextColor: "#3a5f78",
        primaryBorderColor: blue500,
        secondaryColor: gray100,
        secondaryTextColor: gray800,
        secondaryBorderColor: gray300,
        tertiaryColor: gray100,
        tertiaryTextColor: gray800,
        tertiaryBorderColor: gray300,
        lineColor: gray400,
        textColor: gray800,
        mainBkg: blue100,
        secondBkg: gray100,
        border1: gray300,
        border2: gray400,
        arrowheadColor: gray500,
        edgeLabelBackground: white,
        nodeTextColor: gray800,
        clusterBkg: gray100,
        clusterBorder: gray300,
        titleColor: black,
        actorBorder: accent,
        actorBkg: blue100,
        actorTextColor: gray800,
      };

  return {
    startOnLoad: false,
    theme: "base" as const,
    securityLevel: "strict" as const,
    themeVariables,
    flowchart: {
      htmlLabels: true,
      curve: "basis" as const,
      padding: 8,
      nodeSpacing: 30,
      rankSpacing: 30,
      diagramPadding: 8,
      useMaxWidth: true,
    },
  };
}

function getIsDark(): boolean {
  return document.documentElement.classList.contains("dark");
}

const containerClassName =
  "not-prose mermaid my-6 flex min-h-[12rem] justify-center overflow-x-auto";

export default function Mermaid({ chart }: MermaidProps) {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [isDark, setIsDark] = useState(() =>
    typeof document === "undefined" ? false : getIsDark()
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(getIsDark());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const darkMode = isDark;
    let cancelled = false;

    async function renderChart() {
      try {
        const mermaid = (await import("mermaid")).default;

        mermaid.initialize(getMermaidConfig(darkMode));

        const { svg: renderedSvg } = await mermaid.render(
          `mermaid-${id}`,
          chart
        );

        if (!cancelled) {
          setSvg(renderedSvg);
          setError(false);
        }
      } catch {
        if (!cancelled) {
          setSvg(null);
          setError(true);
        }
      }
    }

    renderChart();

    return () => {
      cancelled = true;
    };
  }, [chart, id, isDark]);

  if (error) {
    return (
      <div
        className={`${containerClassName} items-center text-sm text-secondary`}
        role="img"
        aria-label="Diagram failed to render"
      />
    );
  }

  if (svg === null) {
    return (
      <div
        className={containerClassName}
        aria-busy="true"
        aria-label="Loading diagram"
      />
    );
  }

  return (
    <div
      className={containerClassName}
      role="img"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
