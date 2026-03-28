"use client";
import { useState, useEffect } from "react";
import { useTheme } from "./Theme";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NEWS_FALLBACK } from "../lib/data";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/calculadora-sueldo-neto", label: "Sueldo Neto", ready: true },
  { href: "/monotributo", label: "Monotributo", ready: true },
  { href: "/calculadora-vacaciones", label: "Vacaciones", ready: true },
  { href: "/liquidacion-final", label: "Liquidación Final", ready: true },
  { href: "/calculadora-comercio", label: "Empleados de Comercio", ready: false },
  { href: "/calculadora-aguinaldo", label: "Aguinaldo / SAC", ready: false },
  { href: "/calculadora-domestico", label: "Servicio Doméstico", ready: false },
];

function Ticker() {
  const { theme: t } = useTheme();
  const [news, setNews] = useState(NEWS_FALLBACK);

  useEffect(() => {
    const RSS_URL = "https://news.google.com/rss/search?q=paritarias+sueldos+monotributo+ganancias+argentina&hl=es-419&gl=AR&ceid=AR:es-419";
    const API = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(RSS_URL);
    fetch(API).then(r => r.json()).then(data => {
      if (data.status === "ok" && data.items && data.items.length > 0) {
        setNews(data.items.slice(0, 8).map(item => item.title.replace(/ - .+$/, "")));
      }
    }).catch(() => {});
  }, []);

  const text = news.concat(news).map(n => "  ●  " + n).join("");
  return (
    <div style={{ background: t.tickBg, borderBottom: `1px solid ${t.tickBd}`, overflow: "hidden", height: "32px", display: "flex", alignItems: "center" }}>
      <div style={{ whiteSpace: "nowrap", animation: "scroll 50s linear infinite", fontSize: "12px", color: t.tickTx }}>{text}</div>
    </div>
  );
}

export default function Nav() {
  const { theme: t, mode, setMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const calcLinks = NAV_LINKS.filter(l => l.href !== "/");

  return (
    <>
      <Ticker />
      <nav style={{
        position: "sticky", top: 0, zIndex: 100, padding: "14px 20px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: t.nav, backdropFilter: "blur(16px)", borderBottom: `1px solid ${t.bd}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <span style={{ fontSize: "20px" }}>📊</span>
            <span style={{ fontSize: "16px", fontWeight: 700, color: t.tx, letterSpacing: "-.02em" }}>
              CALCUL<span style={{ color: t.a }}>ABORAL</span>
            </span>
          </Link>
          <div className="nav-links" style={{ display: "flex", gap: "24px" }}>
            <Link href="/" style={{ fontSize: "14px", color: pathname === "/" ? t.a : t.ts, textDecoration: "none", fontWeight: pathname === "/" ? 500 : 400 }}>Inicio</Link>
            <div className="calc-trigger" style={{ position: "relative" }}>
              <span style={{ fontSize: "14px", color: t.ts, cursor: "pointer" }}>Calculadoras ▾</span>
              <div className="calc-dropdown" style={{ background: t.card, border: `1px solid ${t.cardBorder}`, boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
                {calcLinks.map(cl => (
                  <Link key={cl.href} href={cl.href} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: "8px", textDecoration: "none", color: pathname === cl.href ? t.a : t.tx, fontSize: "13px" }}>
                    {cl.label}
                    {!cl.ready && <span style={{ fontSize: "9px", padding: "2px 8px", borderRadius: "4px", background: t.pillBg, color: t.pillTx, border: `1px solid ${t.pillBd}` }}>Pronto</span>}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="#" style={{ fontSize: "14px", color: t.ts, textDecoration: "none" }}>Blog</Link>
            <Link href="#" style={{ fontSize: "14px", color: t.ts, textDecoration: "none" }}>Contacto</Link>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button onClick={() => setMode("dark")} style={{ width: "32px", height: "32px", borderRadius: "8px", border: `1px solid ${t.bd}`, background: mode === "dark" ? t.aDim : "transparent", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>🌙</button>
          <button onClick={() => setMode("light")} style={{ width: "32px", height: "32px", borderRadius: "8px", border: `1px solid ${t.bd}`, background: mode === "light" ? t.aDim : "transparent", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>☀️</button>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", width: "36px", height: "36px", borderRadius: "8px", border: `1px solid ${t.bd}`, background: "transparent", cursor: "pointer", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px" }}>
            <span style={{ width: "18px", height: "2px", background: t.ts, borderRadius: "1px" }} />
            <span style={{ width: "18px", height: "2px", background: t.ts, borderRadius: "1px" }} />
            <span style={{ width: "18px", height: "2px", background: t.ts, borderRadius: "1px" }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} style={{ display: "none", flexDirection: "column", gap: "4px", padding: "12px 20px 16px", background: t.card, borderBottom: `1px solid ${t.bd}`, zIndex: 99 }}>
        <Link href="/" onClick={() => setMenuOpen(false)} style={{ padding: "12px", borderRadius: "8px", color: t.a, textDecoration: "none", fontSize: "15px", fontWeight: 500 }}>Inicio</Link>
        <div style={{ fontSize: "11px", color: t.tm, padding: "8px 12px 4px", letterSpacing: ".1em", fontWeight: 500 }}>CALCULADORAS</div>
        {calcLinks.map(cl => (
          <Link key={cl.href} href={cl.href} onClick={() => setMenuOpen(false)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: "8px", textDecoration: "none", color: t.ts, fontSize: "14px" }}>
            {cl.label}
            {!cl.ready && <span style={{ fontSize: "9px", padding: "2px 8px", borderRadius: "4px", background: t.pillBg, color: t.pillTx, border: `1px solid ${t.pillBd}` }}>Pronto</span>}
          </Link>
        ))}
      </div>
    </>
  );
}

export function Footer() {
  const { theme: t } = useTheme();
  return (
    <footer style={{ borderTop: `1px solid ${t.bd}`, padding: "24px 20px", maxWidth: "960px", margin: "0 auto", textAlign: "center" }}>
      <p style={{ fontSize: "12px", color: t.ts, lineHeight: 1.7, marginBottom: "8px" }}>Sin publicidad. Sin registro. Sin vueltas.</p>
      <p style={{ fontSize: "11px", color: t.tm, lineHeight: 1.6 }}>calculaboral.com.ar — Estimaciones orientativas. No constituyen asesoramiento profesional.</p>
      <div style={{ fontSize: "10px", color: t.tm, marginTop: "8px", opacity: 0.6 }}>Fuentes: ARCA · LCT 20.744 · Ley 27.743 · INDEC</div>
      <div style={{ fontSize: "11px", color: t.tm, marginTop: "12px" }}>© CALCULABORAL. Todos los derechos reservados.</div>
    </footer>
  );
}
