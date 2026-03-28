"use client";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "./Theme";
import { formatARS } from "../lib/calculations";

export function AnimNum({ value }) {
  const [d, setD] = useState(value);
  const ref = useRef(null);
  useEffect(() => {
    const s = d, e = value, dur = 350, t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      setD(Math.round(s + (e - s) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(ref.current);
  }, [value]);
  return <span>$ {Math.abs(d).toLocaleString("es-AR")}</span>;
}

export function Card({ children, accent, style }) {
  const { theme: t } = useTheme();
  return (
    <div style={{
      background: accent ? t.resultBg : t.card,
      border: `1px solid ${accent ? t.resultBd : t.cardBorder}`,
      borderRadius: "12px", padding: "24px", ...style,
    }}>
      {children}
    </div>
  );
}

export function SectionLabel({ children }) {
  const { theme: t } = useTheme();
  return <div style={{ fontSize: "11px", letterSpacing: ".15em", color: t.ts, marginBottom: "12px", fontWeight: 500 }}>{children}</div>;
}

export function NumInput({ value, onChange, placeholder }) {
  const { theme: t } = useTheme();
  const [raw, setRaw] = useState(value > 0 ? value.toLocaleString("es-AR") : "");
  useEffect(() => { if (value > 0) setRaw(value.toLocaleString("es-AR")); }, [value]);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", background: t.input, border: `1px solid ${t.inputBorder}`, borderRadius: "10px", padding: "12px 16px" }}>
      <span style={{ fontSize: "18px", color: t.ts, fontWeight: 500 }}>$</span>
      <input type="text" value={raw} placeholder={placeholder || "0"}
        onChange={e => { const n = parseInt(e.target.value.replace(/\D/g, "")) || 0; onChange(n); setRaw(n > 0 ? n.toLocaleString("es-AR") : ""); }}
        style={{ background: "transparent", border: "none", outline: "none", fontFamily: "var(--mo)", fontSize: "20px", fontWeight: 400, color: t.tx, width: "100%" }}
      />
    </div>
  );
}

export function Toggle({ checked, onChange, label }) {
  const { theme: t } = useTheme();
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
      <span style={{ fontSize: "14px", color: t.ts }}>{label}</span>
      <div onClick={() => onChange(!checked)} style={{ width: "44px", height: "24px", borderRadius: "12px", cursor: "pointer", position: "relative", background: checked ? t.toggleTrackOn : t.toggleTrack, transition: "background .2s" }}>
        <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: t.toggleThumb, position: "absolute", top: "2px", left: checked ? "22px" : "2px", transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }} />
      </div>
    </div>
  );
}

export function Stepper({ value, onChange, max, label }) {
  const { theme: t } = useTheme();
  const bs = { width: "36px", height: "36px", borderRadius: "8px", border: `1px solid ${t.inputBorder}`, background: t.card, color: t.ts, cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" };
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
      <span style={{ fontSize: "14px", color: t.ts }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button onClick={() => onChange(Math.max(0, value - 1))} style={bs}>−</button>
        <span style={{ fontFamily: "var(--mo)", fontSize: "18px", color: t.tx, minWidth: "24px", textAlign: "center" }}>{value}</span>
        <button onClick={() => onChange(Math.min(max || 10, value + 1))} style={bs}>+</button>
      </div>
    </div>
  );
}

export function Slider({ value, onChange, min, max, step, suffix }) {
  const { theme: t } = useTheme();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "6px" }}>
      <input type="range" min={min} max={max} step={step || 1} value={value}
        onChange={e => onChange(+e.target.value)}
        style={{ flex: 1, background: t.inputBorder, accentColor: t.a }} />
      <span style={{ fontFamily: "var(--mo)", fontSize: "16px", color: t.a, minWidth: "50px", textAlign: "right" }}>{value}{suffix || ""}</span>
    </div>
  );
}

export function Btn({ children, active, onClick, flex }) {
  const { theme: t } = useTheme();
  return (
    <button onClick={onClick} style={{
      flex: flex ? 1 : undefined, padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "13px",
      border: `1px solid ${active ? t.aBorder : t.inputBorder}`,
      background: active ? t.aDim : "transparent", color: active ? t.a : t.ts,
      fontFamily: "var(--sa)", transition: "all .2s",
    }}>
      {children}
    </button>
  );
}

export function RRow({ label, value, bold }) {
  const { theme: t } = useTheme();
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: bold ? "none" : `1px solid ${t.bd}` }}>
      <span style={{ fontSize: "14px", color: bold ? t.tx : t.ts, fontWeight: bold ? 600 : 400 }}>{label}</span>
      <span style={{ fontFamily: "var(--mo)", fontSize: "14px", color: bold ? t.a : t.tx, fontWeight: bold ? 600 : 400 }}>{formatARS(value)}</span>
    </div>
  );
}

export function Soon({ title, desc }) {
  const { theme: t } = useTheme();
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center" }}>
      <div style={{ width: "72px", height: "72px", borderRadius: "16px", background: t.aDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", marginBottom: "24px" }}>🚧</div>
      <div style={{ fontSize: "24px", fontWeight: 600, color: t.tx, marginBottom: "10px" }}>{title}</div>
      <div style={{ fontSize: "15px", color: t.ts, maxWidth: "420px", lineHeight: 1.6, marginBottom: "20px" }}>{desc}</div>
      <div style={{ fontSize: "13px", color: t.warn, padding: "8px 20px", background: t.pillBg, borderRadius: "20px", border: `1px solid ${t.pillBd}`, fontWeight: 500 }}>Próximamente</div>
    </div>
  );
}
