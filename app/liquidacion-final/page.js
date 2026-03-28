"use client";
import { useState } from "react";
import { useTheme } from "../../components/Theme";
import { Card, SectionLabel, NumInput, Slider, Toggle, Btn, AnimNum, RRow } from "../../components/UI";

export default function LiquidacionPage() {
  const { theme: t } = useTheme();
  const [s, setS] = useState(2500000);
  const [a, setA] = useState(5);
  const [mt, setMt] = useState(6);
  const [dv, setDv] = useState(14);
  const [causa, setCausa] = useState("sin_causa");
  const [preav, setPreav] = useState(false);

  const ei = causa === "sin_causa";
  const anI = Math.max(1, Math.ceil(a));
  const iA = ei ? s * anI : 0;
  let mP = 0;
  if (ei && !preav) { if (a < 0.25) mP = 0.5; else if (a < 5) mP = 1; else mP = 2; }
  const iP = s * mP;
  const h = new Date();
  const dR = new Date(h.getFullYear(), h.getMonth() + 1, 0).getDate() - h.getDate();
  const iI = ei ? (s / 30) * dR : 0;
  const sP = (s / 12) * mt, sPr = iP / 12, sI = iI / 12;
  const vN = (s / 25) * dv, sV = vN / 12;
  const dT = h.getDate(), sp = (s / 30) * dT;
  const total = iA + iP + iI + sP + sPr + sI + vN + sV + sp;

  return (
    <>
      <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "4px", color: t.tx }}>Calculadora de Liquidación Final</h1>
      <p style={{ fontSize: "14px", color: t.ts, marginBottom: "20px" }}>Estimá tu liquidación por despido, renuncia o justa causa según la LCT.</p>

      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          <div><div style={{ fontSize: "12px", color: t.ts, marginBottom: "6px", fontWeight: 500 }}>Mejor remuneración</div><NumInput value={s} onChange={setS} /></div>
          <div><div style={{ fontSize: "12px", color: t.ts, marginBottom: "6px", fontWeight: 500 }}>Antigüedad (años)</div><Slider value={a} onChange={setA} min={0.25} max={35} step={0.25} suffix=" a." /></div>
          <div><div style={{ fontSize: "12px", color: t.ts, marginBottom: "6px", fontWeight: 500 }}>Meses trabajados este año</div><Slider value={mt} onChange={setMt} min={1} max={12} /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px", marginTop: "16px" }}>
          <div>
            <div style={{ fontSize: "12px", color: t.ts, marginBottom: "6px", fontWeight: 500 }}>Motivo</div>
            <div style={{ display: "flex", gap: "6px" }}>
              {[{ id: "sin_causa", l: "Sin causa" }, { id: "con_causa", l: "Con causa" }, { id: "renuncia", l: "Renuncia" }].map(m => (
                <Btn key={m.id} active={causa === m.id} onClick={() => setCausa(m.id)}>{m.l}</Btn>
              ))}
            </div>
          </div>
          {ei && <div style={{ alignSelf: "end" }}><Toggle checked={preav} onChange={setPreav} label="Preaviso cumplido" /></div>}
          <div><div style={{ fontSize: "12px", color: t.ts, marginBottom: "6px", fontWeight: 500 }}>Vacaciones no gozadas</div><Slider value={dv} onChange={setDv} min={0} max={35} suffix=" d." /></div>
        </div>
      </Card>

      <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
        <Card accent>
          <SectionLabel>{causa === "renuncia" ? "LIQUIDACIÓN POR RENUNCIA" : causa === "con_causa" ? "LIQUIDACIÓN CON JUSTA CAUSA" : "LIQUIDACIÓN SIN CAUSA"}</SectionLabel>
          <div style={{ fontFamily: "var(--mo)", fontSize: "clamp(28px, 5vw, 38px)", fontWeight: 600, color: t.a, lineHeight: 1 }}>
            <AnimNum value={Math.round(total)} />
          </div>
        </Card>
        <Card>
          <SectionLabel>DESGLOSE</SectionLabel>
          {ei && (
            <>
              <RRow label={`Antigüedad (${anI} ${anI === 1 ? "mes" : "meses"})`} value={iA} />
              {!preav && <RRow label="Preaviso" value={iP} />}
              <RRow label={`Integración (${dR} d.)`} value={iI} />
              {!preav && <RRow label="SAC s/ preaviso" value={sPr} />}
              <RRow label="SAC s/ integración" value={sI} />
            </>
          )}
          <RRow label="SAC proporcional" value={sP} />
          <RRow label="Vac. no gozadas" value={vN} />
          <RRow label="SAC s/ vacaciones" value={sV} />
          <RRow label={`Sueldo prop. (${dT} d.)`} value={sp} />
          <RRow label="TOTAL" value={total} bold />
        </Card>
      </div>
      <p style={{ fontSize: "11px", color: t.tm, lineHeight: 1.7, textAlign: "center", marginTop: "16px" }}>
        Estimación según LCT. No incluye multas (Ley 25.323, Art. 80) ni tope Art. 245. Consultá con un profesional.
      </p>
    </>
  );
}
