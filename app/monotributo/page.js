"use client";
import { useState } from "react";
import { useTheme } from "../../components/Theme";
import { Card, SectionLabel, NumInput, Btn } from "../../components/UI";
import { formatARS } from "../../lib/calculations";
import { MONOTRIBUTO } from "../../lib/data";

export default function MonotributoPage() {
  const { theme: t } = useTheme();
  const [ing, setIng] = useState(0);
  const [tipo, setTipo] = useState("s");
  const cat = MONOTRIBUTO.find(c => ing <= c.ingresos);

  return (
    <>
      <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "4px", color: t.tx }}>Categorías Monotributo 2026</h1>
      <p style={{ fontSize: "14px", color: t.ts, marginBottom: "20px" }}>Encontrá tu categoría y cuota mensual. Valores vigentes desde febrero 2026.</p>

      <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <Card>
          <SectionLabel>INGRESO BRUTO ANUAL</SectionLabel>
          <NumInput value={ing} onChange={setIng} placeholder="Ej: 15.000.000" />
          <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
            <Btn active={tipo === "s"} onClick={() => setTipo("s")}>Servicios</Btn>
            <Btn active={tipo === "b"} onClick={() => setTipo("b")}>Bienes</Btn>
          </div>
        </Card>
        {cat && ing > 0 ? (
          <Card accent>
            <SectionLabel>CATEGORÍA SUGERIDA</SectionLabel>
            <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
              <span style={{ fontSize: "52px", fontWeight: 700, color: t.a, lineHeight: 1 }}>{cat.cat}</span>
              <div>
                <div style={{ fontSize: "13px", color: t.ts }}>Cuota mensual</div>
                <div style={{ fontFamily: "var(--mo)", fontSize: "24px", color: t.tx, fontWeight: 500 }}>{formatARS(tipo === "s" ? cat.servicios : cat.bienes)}</div>
                <div style={{ fontSize: "12px", color: t.ts, marginTop: "4px" }}>Tope: {formatARS(cat.ingresos)}</div>
              </div>
            </div>
          </Card>
        ) : (
          <Card><div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: t.tm, fontSize: "14px" }}>Ingresá tu facturación anual</div></Card>
        )}
      </div>

      <Card style={{ marginTop: "16px" }}>
        <SectionLabel>TABLA COMPLETA — FEB 2026</SectionLabel>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ color: t.ts }}>
                {["Cat.", "Tope ingresos", "Servicios", "Bienes"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", borderBottom: `2px solid ${t.bd}`, fontWeight: 500, fontSize: "12px", textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MONOTRIBUTO.map((c, i) => {
                const m = cat && c.cat === cat.cat && ing > 0;
                return (
                  <tr key={i} style={{ color: m ? t.a : t.tx, background: m ? t.aDim : "transparent" }}>
                    <td style={{ padding: "10px 12px", borderBottom: `1px solid ${t.bd}`, fontWeight: m ? 600 : 400, fontSize: "15px" }}>
                      {c.cat}
                      {m && <span style={{ marginLeft: "6px", fontSize: "9px", background: t.aDim, padding: "2px 6px", borderRadius: "4px", color: t.a, fontWeight: 500 }}>Tu cat.</span>}
                    </td>
                    <td style={{ padding: "10px 12px", borderBottom: `1px solid ${t.bd}`, fontFamily: "var(--mo)", fontSize: "12px" }}>{formatARS(c.ingresos)}</td>
                    <td style={{ padding: "10px 12px", borderBottom: `1px solid ${t.bd}`, fontFamily: "var(--mo)", fontSize: "12px" }}>{formatARS(c.servicios)}</td>
                    <td style={{ padding: "10px 12px", borderBottom: `1px solid ${t.bd}`, fontFamily: "var(--mo)", fontSize: "12px" }}>{formatARS(c.bienes)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
