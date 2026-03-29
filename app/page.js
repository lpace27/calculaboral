"use client";
import Link from "next/link";
import { useTheme } from "../components/Theme";

const CALCS = [
  { href: "/calculadora-sueldo-neto", label: "Sueldo Neto", desc: "Bruto a neto con ganancias", icon: "💰", ready: true },
  { href: "/calculadora-comercio", label: "Comercio", desc: "CCT 130/75 FAECyS", icon: "🏪", ready: false },
  { href: "/monotributo", label: "Monotributo", desc: "Categorías y cuotas", icon: "📋", ready: true },
  { href: "/calculadora-aguinaldo", label: "Aguinaldo", desc: "SAC proporcional y completo", icon: "🎄", ready: false },
  { href: "/calculadora-vacaciones", label: "Vacaciones", desc: "Días + plus vacacional", icon: "🏖", ready: true },
  { href: "/calculadora-domestico", label: "Doméstico", desc: "Casas particulares", icon: "🏠", ready: false },
  { href: "/liquidacion-final", label: "Liquidación", desc: "Despido o renuncia", icon: "📄", ready: true },
];

export default function HomePage() {
  const { theme: t } = useTheme();

  return (
    <>
      <header style={{ padding: "48px 0 32px", textAlign: "center", animation: "fadeUp .5s ease both" }}>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 700, lineHeight: 1.2, marginBottom: "12px", color: t.tx }}>
          Calculadoras laborales e impositivas,
          <br />siempre actualizadas.
        </h1>
        <p style={{ fontSize: "15px", color: t.ts, maxWidth: "520px", margin: "0 auto", lineHeight: 1.6 }}>
          Herramientas gratuitas para trabajadores, contadores y empleadores argentinos.
        </p>
      </header>

      <div className="grid-4col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
        {CALCS.slice(0, 4).map(c => (
          <Link key={c.href} href={c.href} style={{
            padding: "20px 12px", borderRadius: "12px", textDecoration: "none",
            border: `1.5px solid ${t.tabBorder}`, background: t.tabBg,
            display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
            position: "relative", transition: "all .2s", color: t.ts, textAlign: "center",
          }}>
            {!c.ready && (
              <span style={{ position: "absolute", top: "6px", right: "6px", fontSize: "9px", fontWeight: 500, padding: "2px 8px", borderRadius: "4px", background: t.pillBg, color: t.pillTx, border: `1px solid ${t.pillBd}` }}>Pronto</span>
            )}
            <span style={{ fontSize: "28px" }}>{c.icon}</span>
            <span style={{ fontSize: "13px", fontWeight: 600, color: t.tx }}>{c.label}</span>
            <span style={{ fontSize: "11px", color: t.ts }}>{c.desc}</span>
          </Link>
        ))}
      </div>
      <div className="grid-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginTop: "10px" }}>
        {CALCS.slice(4).map(c => (
          <Link key={c.href} href={c.href} style={{
            padding: "20px 12px", borderRadius: "12px", textDecoration: "none",
            border: `1.5px solid ${t.tabBorder}`, background: t.tabBg,
            display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
            position: "relative", transition: "all .2s", color: t.ts, textAlign: "center",
          }}>
            {!c.ready && (
              <span style={{ position: "absolute", top: "6px", right: "6px", fontSize: "9px", fontWeight: 500, padding: "2px 8px", borderRadius: "4px", background: t.pillBg, color: t.pillTx, border: `1px solid ${t.pillBd}` }}>Pronto</span>
            )}
            <span style={{ fontSize: "28px" }}>{c.icon}</span>
            <span style={{ fontSize: "13px", fontWeight: 600, color: t.tx }}>{c.label}</span>
            <span style={{ fontSize: "11px", color: t.ts }}>{c.desc}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
