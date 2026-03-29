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
  const [news, setNews] = useState(NEWS_FALLBACK.map(n => ({ title: n, source: "", link: null })));

  useEffect(() => {
    const RSS_URL = "https://news.google.com/rss/search?q=when:7d+paritarias+OR+sueldos+OR+monotributo+OR+ganancias+OR+ARCA+OR+reforma+laboral+argentina+2026&hl=es-419&gl=AR&ceid=AR:es-419";
    const API = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(RSS_URL);
    fetch(API).then(r => r.json()).then(data => {
      if (data.status === "ok" && data.items && data.items.length > 0) {
        const recientes = data.items
          .filter(item => {
            const fecha = new Date(item.pubDate);
            const haceUnMes = new Date();
            haceUnMes.setDate(haceUnMes.getDate() - 30);
            return fecha > haceUnMes;
          })
          .slice(0, 8)
          .map(item => {
            const parts = item.title.split(" - ");
            const source = parts.length > 1 ? parts.pop().trim() : "";
            const title = parts.join(" - ").trim();
            return { title, source, link: item.link };
          });
        if (recientes.length >= 3) {
          setNews(recientes);
        }
      }
    }).catch(() => {});
  }, []);

  const items = news.concat(news);
  return (
    <div style={{ background: t.tickBg, borderBottom: `1px solid ${t.tickBd}`, overflow: "hidden", height: "32px", display: "flex", alignItems: "center" }}>
      <div style={{ whiteSpace: "nowrap", animation: "scroll 50s linear infinite", fontSize: "12px", color: t.tickTx, display: "flex", alignItems: "center" }}>
        {items.map((n, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            <span style={{ margin: "0 14px", color: t.a, fontSize: "14px", fontWeight: 700 }}>›</span>
            {n.link ? (
              <a href={n.link} target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}>
                {n.source && (
                  <span style={{ fontWeight: 700, fontSize: "10px", letterSpacing: ".05em", textTransform: "uppercase", color: t.a }}>{n.source}</span>
                )}
                <span style={{ color: t.ts }}>{n.title}</span>
              </a>
            ) : (
              <span style={{ color: t.ts }}>{n.title}</span>
            )}
          </span>
        ))}
      </div>
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
            <svg width="24" height="24" viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
              <rect width="32" height="32" rx="6" fill={t.a}/>
              <rect x="5" y="18" width="5" height="10" rx="1" fill={t.bg}/>
              <rect x="13" y="12" width="5" height="16" rx="1" fill={t.bg} opacity="0.7"/>
              <rect x="21" y="6" width="5" height="22" rx="1" fill={t.bg} opacity="0.5"/>
            </svg>
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
