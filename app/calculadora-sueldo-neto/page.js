"use client";
import { useState } from "react";
import { useTheme } from "../../components/Theme";
import { Card, SectionLabel, NumInput, Toggle, Stepper, Btn, AnimNum, RRow } from "../../components/UI";
import { calcularSueldoNeto, formatARS } from "../../lib/calculations";

export default function SueldoNetoPage() {
  const { theme: t } = useTheme();
  const [bruto, setBruto] = useState(3000000);
  const [conyuge, setConyuge] = useState(false);
  const [hijos, setHijos] = useState(0);
  const [sindicato, setSindicato] = useState(false);

  const r = calcularSueldoNeto({ bruto, conyuge, hijos, sindicato });
  const pn = bruto > 0 ? r.neto / bruto : 0;
  const presets = [1500000, 2500000, 3500000, 5000000, 7500000];

  const descuentos = [
    { label: "Jubilación (11%)", val: r.jubilacion },
    { label: "Obra Social (3%)", val: r.obraSocial },
    { label: "PAMI (3%)", val: r.pami },
  ];
  if (sindicato) descuentos.push({ label: "Sindicato (2%)", val: r.sindicato });
  if (r.impGanancias > 0) descuentos.push({ label: "Ganancias", val: r.impGanancias });

  return (
    <>
      <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "4px", color: t.tx }}>Calculadora de Sueldo Neto</h1>
      <p style={{ fontSize: "14px", color: t.ts, marginBottom: "20px" }}>Calculá cuánto cobrás en mano. Valores actualizados al 1er semestre 2026.</p>

      <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <Card>
          <SectionLabel>SUELDO BRUTO MENSUAL</SectionLabel>
          <NumInput value={bruto} onChange={setBruto} />
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "12px" }}>
            {presets.map(p => <Btn key={p} active={bruto === p} onClick={() => setBruto(p)}>{(p / 1e6).toFixed(1)}M</Btn>)}
          </div>
        </Card>
        <Card>
          <Toggle checked={conyuge} onChange={setConyuge} label="Cónyuge a cargo" />
          <Toggle checked={sindicato} onChange={setSindicato} label="Sindicato (2%)" />
          <Stepper value={hijos} onChange={setHijos} max={10} label="Hijos" />
        </Card>
      </div>

      <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
        <Card accent>
          <SectionLabel>TU SUELDO NETO</SectionLabel>
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px", flexWrap: "wrap" }}>
            <div style={{ fontFamily: "var(--mo)", fontSize: "clamp(28px, 5vw, 38px)", fontWeight: 600, color: t.a, lineHeight: 1 }}>
              <AnimNum value={Math.round(r.neto)} />
            </div>
            <span style={{ fontSize: "14px", color: t.ts }}>{(pn * 100).toFixed(1)}% del bruto</span>
          </div>
          {r.impGanancias > 0 ? (
            <div style={{ fontSize: "12px", color: t.warn, marginTop: "14px", padding: "6px 14px", background: t.pillBg, borderRadius: "20px", display: "inline-block", border: `1px solid ${t.pillBd}` }}>Alcanzado por Ganancias</div>
          ) : bruto > 0 ? (
            <div style={{ fontSize: "12px", color: t.a, marginTop: "14px", padding: "6px 14px", background: t.aDim, borderRadius: "20px", display: "inline-block", border: `1px solid ${t.aBorder}` }}>No alcanzado por Ganancias</div>
          ) : null}
        </Card>
        <Card>
          <RRow label="Total Deducciones" value={r.totalAportes + r.impGanancias} bold />
          {descuentos.map((d, i) => <RRow key={i} label={d.label} value={d.val} />)}
        </Card>
      </div>
    </>
  );
}
