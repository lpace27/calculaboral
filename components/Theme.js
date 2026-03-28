"use client";
import { createContext, useContext, useState } from "react";

const DARK = {
  bg: "#0d1117", card: "#161b22", cardBorder: "#21262d",
  input: "#0d1117", inputBorder: "#30363d",
  tx: "#e6edf3", ts: "#8b949e", tm: "#484f58",
  a: "#3fb950", aDim: "rgba(63,185,80,0.12)", aBorder: "rgba(63,185,80,0.3)",
  dng: "#f85149", ok: "#3fb950", warn: "#d29922",
  nav: "rgba(13,17,23,0.92)", bd: "#21262d",
  tabBg: "#161b22", tabBorder: "#21262d", tabActive: "#1c2333", tabActiveBorder: "#3fb950",
  toggleTrack: "#30363d", toggleTrackOn: "#238636", toggleThumb: "#e6edf3",
  pillBg: "rgba(210,153,34,0.15)", pillTx: "#d29922", pillBd: "rgba(210,153,34,0.3)",
  tickBg: "rgba(63,185,80,0.06)", tickBd: "rgba(63,185,80,0.1)", tickTx: "#3fb950",
  resultBg: "linear-gradient(135deg, #0d2818, #0d1117)", resultBd: "rgba(63,185,80,0.2)",
  sf: "rgba(255,255,255,0.015)",
};

const LIGHT = {
  bg: "#f6f8fa", card: "#ffffff", cardBorder: "#d0d7de",
  input: "#f6f8fa", inputBorder: "#d0d7de",
  tx: "#1f2328", ts: "#656d76", tm: "#b1bac4",
  a: "#1a7f37", aDim: "rgba(26,127,55,0.08)", aBorder: "rgba(26,127,55,0.25)",
  dng: "#cf222e", ok: "#1a7f37", warn: "#9a6700",
  nav: "rgba(246,248,250,0.92)", bd: "#d0d7de",
  tabBg: "#ffffff", tabBorder: "#d0d7de", tabActive: "#f0fdf4", tabActiveBorder: "#1a7f37",
  toggleTrack: "#d0d7de", toggleTrackOn: "#1a7f37", toggleThumb: "#ffffff",
  pillBg: "rgba(154,103,0,0.08)", pillTx: "#9a6700", pillBd: "rgba(154,103,0,0.2)",
  tickBg: "rgba(26,127,55,0.04)", tickBd: "rgba(26,127,55,0.08)", tickTx: "#1a7f37",
  resultBg: "linear-gradient(135deg, #f0fdf4, #ffffff)", resultBd: "rgba(26,127,55,0.2)",
  sf: "rgba(0,0,0,0.015)",
};

const ThemeCtx = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("dark");
  const theme = mode === "dark" ? DARK : LIGHT;
  return (
    <ThemeCtx.Provider value={{ theme, mode, setMode }}>
      <div style={{ background: theme.bg, color: theme.tx, minHeight: "100vh", transition: "background .3s, color .3s" }}>
        {children}
      </div>
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeCtx);
}
