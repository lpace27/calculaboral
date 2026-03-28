"use client";
import { useState } from "react";
import { useTheme } from "../../components/Theme";
import { Card, SectionLabel, NumInput, Slider } from "../../components/UI";
import { formatARS } from "../../lib/calculations";
import { VACACIONES } from "../../lib/data";

export default function VacacionesPage() {
  const { theme: t } = useTheme();
  const [a, setA] = useState(3);
  const [s, setS] = useState(2000000);
  const [tr, setTr] = useState(200);

  const rg = VACACIONES.find(r => a >= r.minAnios && a < r.maxAnios) || VACACIONES[3];
  let dias = rg.dias;
  if (tr < 182) dias = Math.max(1, Math.floor(tr / 20));
  const plus = (s / 25) * dias;

  return (
    <>
      <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "4px", color: t.tx }}>Calculadora de Vacaciones</h1>
      <p style={{ fontSize: "14px", color: t.ts, marginBottom: "20px" }}>Días que te corresponden según antigüedad + plus vacacional. Art. 150 LCT.</p>

      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          <div><div style={{ fontSize: "12px", color: t.ts, marginBottom: "6px", fontWeight: 500 }}>Antigüedad (años)</div><Slider value={a} onChange={setA} min={0} max={40} /></div>
          <div><div style={{ fontSize: "12px", color: t.ts, marginBottom: "6px", fontWeight: 500 }}>Sueldo bruto mensual</div><NumInput value={s} onChange={setS} /></div>
          <div><div style={{ fontSize: "12px", color: t.ts, marginBottom: "6px", fontWeight: 500 }}>Días trabajados en el año</div><Slider value={tr} onChange={setTr} min={1} max={365} /></div>
        </div>
      </Card>

      <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
        <Card accent>
          <SectionLabel>DÍAS DE VACACIONES</SectionLabel>
          <div style={{ fontSize: "48px", fontWeight: 700, color: t.a, lineHeight: 1 }}>
            {dias}<span style={{ fontSize: "16px", color: t.ts, marginLeft: "8px", fontWeight: 400 }}>días corridos</span>
          </div>
          {tr < 182 && <div style={{ fontSize: "12px", color: t.warn, marginTop: "12px", padding: "6px 14px", background: t.pillBg, borderRadius: "20px", display: "inline-block", border: `1px solid ${t.pillBd}` }}>Proporcional: 1 día cada 20 trabajados</div>}
        </Card>
        <Card>
          <SectionLabel>PLUS VACACIONAL</SectionLabel>
          <div style={{ fontFamily: "var(--mo)", fontSize: "28px", color: t.a, fontWeight: 600, marginBottom: "16px" }}>{formatARS(plus)}</div>
          <div style={{ fontSize: "12px", color: t.ts, lineHeight: 1.6 }}>Sueldo ÷ 25 × {dias} días (Art. 155 LCT)</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px", marginTop: "16px" }}>
            {VACACIONES.map((r, i) => (
              <div key={i} style={{ padding: "10px 4px", borderRadius: "8px", textAlign: "center", background: rg.dias === r.dias ? t.aDim : "transparent", border: `1px solid ${rg.dias === r.dias ? t.aBorder : t.bd}` }}>
                <div style={{ fontSize: "20px", fontWeight: 600, color: rg.dias === r.dias ? t.a : t.tm }}>{r.dias}</div>
                <div style={{ fontSize: "9px", color: t.ts, marginTop: "2px" }}>{r.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
