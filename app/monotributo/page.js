"use client";
import { useState } from "react";
import { useTheme } from "../../components/Theme";
import { Card, SectionLabel, NumInput, Btn, RRow } from "../../components/UI";
import { formatARS } from "../../lib/calculations";
import { MONOTRIBUTO } from "../../lib/data";

export default function MonotributoPage() {
  const { theme: t } = useTheme();
  const [ing, setIng] = useState(0);
  const [tipo, setTipo] = useState("s");
  const [detalle, setDetalle] = useState(null);
  const cat = MONOTRIBUTO.find(c => ing <= c.ingresos);

  return (
    <>
      <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "4px", color: t.tx }}>Categorías Monotributo 2026</h1>
      <p style={{ fontSize: "14px", color: t.ts, marginBottom: "20px" }}>Encontrá tu categoría, consultá los parámetros y el desglose de la cuota. Fuente: ARCA (ex AFIP). Vigente desde 01/02/2026.</p>

      {/* BUSCADOR */}
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
            <div style={{ fontSize: "13px", color: t.ts, marginBottom: "4px" }}>Tu categoría es:</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
              <span style={{ fontSize: "52px", fontWeight: 700, color: t.a, lineHeight: 1 }}>{cat.cat}</span>
              <div>
                <div style={{ fontSize: "13px", color: t.ts }}>Cuota mensual total</div>
                <div style={{ fontFamily: "var(--mo)", fontSize: "24px", color: t.tx, fontWeight: 500 }}>{formatARS(tipo === "s" ? cat.servicios : cat.bienes)}</div>
                <div style={{ fontSize: "12px", color: t.ts, marginTop: "4px" }}>Tope ingresos: {formatARS(cat.ingresos)}</div>
              </div>
            </div>
            {/* DESGLOSE */}
            <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: `1px solid ${t.bd}` }}>
              <div style={{ fontSize: "11px", color: t.ts, marginBottom: "8px", fontWeight: 500 }}>DESGLOSE DE LA CUOTA</div>
              <RRow label="Impuesto integrado" value={tipo === "s" ? cat.impServ : cat.impBien} />
              <RRow label="Aportes SIPA (jubilación)" value={cat.sipa} />
              <RRow label="Obra social" value={cat.os} />
              <RRow label="Total" value={tipo === "s" ? cat.servicios : cat.bienes} bold />
            </div>
            {/* PARÁMETROS */}
            <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: `1px solid ${t.bd}` }}>
              <div style={{ fontSize: "11px", color: t.ts, marginBottom: "8px", fontWeight: 500 }}>PARÁMETROS DE LA CATEGORÍA</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                {[
                  { l: "Superficie máx.", v: cat.sup },
                  { l: "Energía eléctrica", v: cat.energia },
                  { l: "Alquileres anuales", v: formatARS(cat.alquileres) },
                  { l: "Precio unit. máx.", v: formatARS(cat.precioMax) },
                ].map((p, i) => (
                  <div key={i} style={{ padding: "8px", borderRadius: "6px", background: t.aDim }}>
                    <div style={{ fontSize: "10px", color: t.ts }}>{p.l}</div>
                    <div style={{ fontSize: "12px", color: t.tx, fontWeight: 500, fontFamily: "var(--mo)" }}>{p.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ) : (
          <Card>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: t.tm, fontSize: "14px" }}>
              Ingresá tu facturación anual para ver tu categoría, el desglose de la cuota y los parámetros
            </div>
          </Card>
        )}
      </div>

      {/* TABLA COMPLETA */}
      <Card style={{ marginTop: "16px" }}>
        <SectionLabel>TABLA COMPLETA — VIGENTE DESDE 01/02/2026</SectionLabel>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", minWidth: "700px" }}>
            <thead>
              <tr style={{ color: t.ts }}>
                {["Cat.", "Tope ingresos", "Imp. integrado", "SIPA", "Obra social", "Total serv.", "Total bienes"].map(h => (
                  <th key={h} style={{ padding: "10px 8px", borderBottom: `2px solid ${t.bd}`, fontWeight: 500, fontSize: "11px", textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MONOTRIBUTO.map((c, i) => {
                const m = cat && c.cat === cat.cat && ing > 0;
                const sel = detalle === c.cat;
                return (
                  <>
                    <tr key={c.cat} onClick={() => setDetalle(sel ? null : c.cat)} style={{ color: m ? t.a : t.tx, background: m ? t.aDim : "transparent", cursor: "pointer" }}>
                      <td style={{ padding: "10px 8px", borderBottom: `1px solid ${t.bd}`, fontWeight: m ? 600 : 400, fontSize: "14px" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ color: t.a, fontSize: "12px", fontWeight: 700, transition: "transform .2s", display: "inline-block", transform: sel ? "rotate(90deg)" : "rotate(0deg)" }}>›</span>
                          {c.cat}
                          {m && <span style={{ display: "inline-block", width: "7px", height: "7px", borderRadius: "50%", background: t.a, verticalAlign: "middle" }} />}
                        </span>
                      </td>
                      <td style={{ padding: "10px 8px", borderBottom: `1px solid ${t.bd}`, fontFamily: "var(--mo)" }}>{formatARS(c.ingresos)}</td>
                      <td style={{ padding: "10px 8px", borderBottom: `1px solid ${t.bd}`, fontFamily: "var(--mo)" }}>{formatARS(tipo === "s" ? c.impServ : c.impBien)}</td>
                      <td style={{ padding: "10px 8px", borderBottom: `1px solid ${t.bd}`, fontFamily: "var(--mo)" }}>{formatARS(c.sipa)}</td>
                      <td style={{ padding: "10px 8px", borderBottom: `1px solid ${t.bd}`, fontFamily: "var(--mo)" }}>{formatARS(c.os)}</td>
                      <td style={{ padding: "10px 8px", borderBottom: `1px solid ${t.bd}`, fontFamily: "var(--mo)", fontWeight: 500 }}>{formatARS(c.servicios)}</td>
                      <td style={{ padding: "10px 8px", borderBottom: `1px solid ${t.bd}`, fontFamily: "var(--mo)", fontWeight: 500 }}>{formatARS(c.bienes)}</td>
                    </tr>
                    {sel && (
                      <tr key={c.cat + "-detail"}>
                        <td colSpan={7} style={{ padding: "12px 8px", background: t.aDim, borderBottom: `1px solid ${t.bd}` }}>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "8px" }}>
                            <div><div style={{ fontSize: "10px", color: t.ts }}>Superficie máx.</div><div style={{ fontSize: "13px", fontWeight: 500, color: t.tx }}>{c.sup}</div></div>
                            <div><div style={{ fontSize: "10px", color: t.ts }}>Energía eléctrica anual</div><div style={{ fontSize: "13px", fontWeight: 500, color: t.tx }}>{c.energia}</div></div>
                            <div><div style={{ fontSize: "10px", color: t.ts }}>Alquileres anuales</div><div style={{ fontSize: "13px", fontWeight: 500, color: t.tx, fontFamily: "var(--mo)" }}>{formatARS(c.alquileres)}</div></div>
                            <div><div style={{ fontSize: "10px", color: t.ts }}>Precio unit. máx.</div><div style={{ fontSize: "13px", fontWeight: 500, color: t.tx, fontFamily: "var(--mo)" }}>{formatARS(c.precioMax)}</div></div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "11px", color: t.tm, marginTop: "8px" }}>Hacé clic en una categoría para ver sus parámetros (superficie, energía, alquileres, precio unitario máximo).</p>
      </Card>

      {/* REFERENCIAS OFICIALES */}
      <Card style={{ marginTop: "16px" }}>
        <SectionLabel>INFORMACIÓN IMPORTANTE</SectionLabel>

        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: t.tx, marginBottom: "6px" }}>¿Quiénes no pagan impuesto integrado?</div>
          <ul style={{ fontSize: "13px", color: t.ts, lineHeight: 1.8, paddingLeft: "20px" }}>
            <li>Trabajadores independientes promovidos</li>
            <li>Asociados a cooperativas con ingresos que no superen el tope de categoría A</li>
            <li>Locadores de hasta 2 inmuebles (cualquier destino)</li>
            <li>Inscriptos en el Registro Nacional de Efectores (hasta cat. A)</li>
            <li>Actividades primarias (tabaco, caña de azúcar, yerba mate, té) hasta cat. D</li>
          </ul>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: t.tx, marginBottom: "6px" }}>¿Quiénes no pagan aportes jubilatorios ni obra social?</div>
          <ul style={{ fontSize: "13px", color: t.ts, lineHeight: 1.8, paddingLeft: "20px" }}>
            <li>Quienes están obligados por otros regímenes previsionales</li>
            <li>Menores de 18 años</li>
            <li>Locadores de bienes muebles o inmuebles</li>
            <li>Sucesiones indivisas que continúen en el régimen</li>
            <li>Jubilados por leyes anteriores a julio de 1994</li>
          </ul>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: t.tx, marginBottom: "6px" }}>Obra social</div>
          <p style={{ fontSize: "13px", color: t.ts, lineHeight: 1.7 }}>
            El monto es por afiliación individual sin adherentes. Por cada adherente (familiar a cargo) se debe abonar un importe adicional igual al de la obra social de la categoría correspondiente. Los jubilados quedan exceptuados del aporte de obra social.
          </p>
        </div>

        <div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: t.tx, marginBottom: "6px" }}>Superficie afectada</div>
          <p style={{ fontSize: "13px", color: t.ts, lineHeight: 1.7 }}>
            Este parámetro no se considera en ciudades de menos de 40.000 habitantes, salvo algunas excepciones.
          </p>
        </div>

        <div style={{ marginTop: "16px", padding: "12px", borderRadius: "8px", background: t.aDim, fontSize: "12px", color: t.ts, lineHeight: 1.6 }}>
          Fuente oficial: <a href="https://www.afip.gob.ar/monotributo/categorias.asp" target="_blank" rel="noopener noreferrer" style={{ color: t.a, textDecoration: "underline" }}>ARCA — Montos y categorías vigentes</a>. Valores vigentes desde el 01/02/2026.
        </div>
      </Card>
    </>
  );
}
