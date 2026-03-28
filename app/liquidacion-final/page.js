"use client";
import { useState, useMemo } from "react";
import { useTheme } from "../../components/Theme";
import { Card, SectionLabel, NumInput, Toggle, Btn, AnimNum, RRow, Stepper } from "../../components/UI";
import { formatARS } from "../../lib/calculations";

function DateInput({ label, value, onChange }) {
  const { theme: t } = useTheme();
  return (
    <div>
      <div style={{ fontSize: "12px", color: t.ts, marginBottom: "6px", fontWeight: 500 }}>{label}</div>
      <input
        type="date"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: "10px",
          border: `1px solid ${t.inputBorder}`,
          background: t.input,
          color: t.tx,
          fontSize: "16px",
          fontFamily: "var(--mo)",
          outline: "none",
          colorScheme: t.bg === "#0d1117" ? "dark" : "light",
        }}
      />
    </div>
  );
}

function InfoRow({ label, value }) {
  const { theme: t } = useTheme();
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
      <span style={{ fontSize: "13px", color: t.ts }}>{label}</span>
      <span style={{ fontSize: "13px", color: t.tx, fontWeight: 500 }}>{value}</span>
    </div>
  );
}

export default function LiquidacionPage() {
  const { theme: t } = useTheme();

  // Fecha de hoy en formato YYYY-MM-DD
  const hoyStr = new Date().toISOString().split("T")[0];

  const [salario, setSalario] = useState(2500000);
  const [fechaIngreso, setFechaIngreso] = useState("2021-03-15");
  const [fechaEgreso, setFechaEgreso] = useState(hoyStr);
  const [causa, setCausa] = useState("sin_causa");
  const [preav, setPreav] = useState(false);
  const [diasVac, setDiasVac] = useState(14);

  // Calcular todo a partir de las fechas
  const calc = useMemo(() => {
    const ingreso = new Date(fechaIngreso);
    const egreso = new Date(fechaEgreso);

    if (isNaN(ingreso.getTime()) || isNaN(egreso.getTime()) || egreso <= ingreso) {
      return null;
    }

    // Antigüedad en años (con decimales)
    const diffMs = egreso - ingreso;
    const antigAnios = diffMs / (1000 * 60 * 60 * 24 * 365.25);
    const antigAniosEnteros = Math.floor(antigAnios);
    const antigMeses = Math.floor((antigAnios - antigAniosEnteros) * 12);

    // Años para indemnización (1 mes por año o fracción > 3 meses, mínimo 1)
    const aniosIndem = Math.max(1, Math.ceil(antigAnios));

    // Meses trabajados en el año de egreso (desde enero hasta mes de egreso)
    const mesesTrabAnio = egreso.getMonth() + 1;

    // Día del mes de egreso
    const diaEgreso = egreso.getDate();

    // Días restantes del mes para integración
    const ultimoDiaMes = new Date(egreso.getFullYear(), egreso.getMonth() + 1, 0).getDate();
    const diasRestantes = ultimoDiaMes - diaEgreso;

    // Indemnización por antigüedad
    const ei = causa === "sin_causa";
    const iAntig = ei ? salario * aniosIndem : 0;

    // Preaviso
    let mesesPreaviso = 0;
    if (ei && !preav) {
      if (antigAnios < 0.25) mesesPreaviso = 0.5; // 15 días en prueba
      else if (antigAnios < 5) mesesPreaviso = 1;
      else mesesPreaviso = 2;
    }
    const iPreaviso = salario * mesesPreaviso;

    // Integración mes de despido
    const iIntegracion = ei ? (salario / 30) * diasRestantes : 0;

    // SAC proporcional
    const sacProp = (salario / 12) * mesesTrabAnio;

    // SAC sobre preaviso
    const sacPreaviso = iPreaviso / 12;

    // SAC sobre integración
    const sacInteg = iIntegracion / 12;

    // Vacaciones no gozadas
    const vacNG = (salario / 25) * diasVac;

    // SAC sobre vacaciones
    const sacVac = vacNG / 12;

    // Sueldo proporcional del mes
    const sueldoProp = (salario / 30) * diaEgreso;

    const total = iAntig + iPreaviso + iIntegracion + sacProp + sacPreaviso + sacInteg + vacNG + sacVac + sueldoProp;

    return {
      antigAnios, antigAniosEnteros, antigMeses, aniosIndem,
      mesesTrabAnio, diaEgreso, diasRestantes, mesesPreaviso,
      iAntig, iPreaviso, iIntegracion,
      sacProp, sacPreaviso, sacInteg,
      vacNG, sacVac, sueldoProp, total,
      ei,
    };
  }, [salario, fechaIngreso, fechaEgreso, causa, preav, diasVac]);

  return (
    <>
      <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "4px", color: t.tx }}>Calculadora de Liquidación Final</h1>
      <p style={{ fontSize: "14px", color: t.ts, marginBottom: "20px" }}>Estimá tu liquidación por despido, renuncia o justa causa según la LCT.</p>

      {/* INPUTS */}
      <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <Card>
          <SectionLabel>DATOS DEL TRABAJADOR</SectionLabel>
          <div style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "12px", color: t.ts, marginBottom: "6px", fontWeight: 500 }}>Mejor remuneración mensual</div>
            <NumInput value={salario} onChange={setSalario} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <DateInput label="Fecha de ingreso" value={fechaIngreso} onChange={setFechaIngreso} />
            <DateInput label="Fecha de egreso" value={fechaEgreso} onChange={setFechaEgreso} />
          </div>
          {calc && (
            <div style={{ marginTop: "14px", padding: "12px", borderRadius: "8px", background: t.aDim }}>
              <InfoRow label="Antigüedad" value={`${calc.antigAniosEnteros} años y ${calc.antigMeses} meses`} />
              <InfoRow label="Meses trabajados en el año" value={calc.mesesTrabAnio} />
              <InfoRow label="Día de egreso" value={`Día ${calc.diaEgreso} (faltan ${calc.diasRestantes} días del mes)`} />
            </div>
          )}
        </Card>
        <Card>
          <SectionLabel>CONFIGURACIÓN</SectionLabel>
          <div style={{ marginBottom: "12px" }}>
            <div style={{ fontSize: "12px", color: t.ts, marginBottom: "8px", fontWeight: 500 }}>Motivo de egreso</div>
            <div style={{ display: "flex", gap: "6px" }}>
              {[
                { id: "sin_causa", l: "Sin causa" },
                { id: "con_causa", l: "Con causa" },
                { id: "renuncia", l: "Renuncia" },
              ].map(m => (
                <Btn key={m.id} active={causa === m.id} onClick={() => setCausa(m.id)} flex>{m.l}</Btn>
              ))}
            </div>
          </div>
          {causa === "sin_causa" && (
            <Toggle checked={preav} onChange={setPreav} label="Preaviso cumplido" />
          )}
          <Stepper value={diasVac} onChange={setDiasVac} max={35} label="Días vacaciones no gozadas" />
        </Card>
      </div>

      {/* RESULTADO */}
      {calc && (
        <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
          <Card accent>
            <SectionLabel>
              {causa === "renuncia" ? "LIQUIDACIÓN POR RENUNCIA" : causa === "con_causa" ? "LIQUIDACIÓN CON JUSTA CAUSA" : "LIQUIDACIÓN SIN CAUSA"}
            </SectionLabel>
            <div style={{ fontFamily: "var(--mo)", fontSize: "clamp(28px, 5vw, 38px)", fontWeight: 600, color: t.a, lineHeight: 1 }}>
              <AnimNum value={Math.round(calc.total)} />
            </div>
            {calc.ei && (
              <div style={{ fontSize: "12px", color: t.ts, marginTop: "12px", lineHeight: 1.6 }}>
                Indemnización: {calc.aniosIndem} {calc.aniosIndem === 1 ? "mes" : "meses"} de sueldo
                {!preav && calc.mesesPreaviso > 0 && (
                  <span> + preaviso {calc.mesesPreaviso === 0.5 ? "15 días" : calc.mesesPreaviso + " mes" + (calc.mesesPreaviso > 1 ? "es" : "")}</span>
                )}
              </div>
            )}
          </Card>
          <Card>
            <SectionLabel>DESGLOSE</SectionLabel>
            {calc.ei && (
              <>
                <RRow label={`Indemnización (${calc.aniosIndem} ${calc.aniosIndem === 1 ? "mes" : "meses"})`} value={calc.iAntig} />
                {!preav && <RRow label={`Preaviso`} value={calc.iPreaviso} />}
                <RRow label={`Integración (${calc.diasRestantes} días)`} value={calc.iIntegracion} />
                {!preav && <RRow label="SAC s/ preaviso" value={calc.sacPreaviso} />}
                <RRow label="SAC s/ integración" value={calc.sacInteg} />
              </>
            )}
            <RRow label={`SAC proporcional (${calc.mesesTrabAnio} meses)`} value={calc.sacProp} />
            <RRow label={`Vac. no gozadas (${diasVac} días)`} value={calc.vacNG} />
            <RRow label="SAC s/ vacaciones" value={calc.sacVac} />
            <RRow label={`Sueldo prop. (${calc.diaEgreso} días)`} value={calc.sueldoProp} />
            <RRow label="TOTAL" value={calc.total} bold />
          </Card>
        </div>
      )}

      {!calc && (
        <Card style={{ marginTop: "16px", textAlign: "center", padding: "40px" }}>
          <div style={{ fontSize: "14px", color: t.tm }}>Ingresá las fechas de ingreso y egreso para calcular</div>
        </Card>
      )}

      <p style={{ fontSize: "11px", color: t.tm, lineHeight: 1.7, textAlign: "center", marginTop: "16px" }}>
        Estimación según LCT. No incluye multas (Ley 25.323, Art. 80) ni tope Art. 245. Consultá con un profesional.
      </p>
    </>
  );
}
