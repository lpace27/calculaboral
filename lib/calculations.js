import { ESCALA_GANANCIAS, DEDUCCIONES, APORTES } from './data';

export function calcularGanancias(gananciaNetaSujetaImpuesto) {
  if (gananciaNetaSujetaImpuesto <= 0) return 0;
  let prev = 0;
  for (const tramo of ESCALA_GANANCIAS) {
    if (gananciaNetaSujetaImpuesto <= tramo.limite) {
      return tramo.fijo + (gananciaNetaSujetaImpuesto - prev) * tramo.tasa;
    }
    prev = tramo.limite;
  }
  return 0;
}

export function calcularSueldoNeto({ bruto, conyuge, hijos, sindicato }) {
  const aj = bruto * APORTES.jubilacion;
  const ao = bruto * APORTES.obraSocial;
  const ap = bruto * APORTES.pami;
  const as2 = sindicato ? bruto * APORTES.sindicato : 0;
  const totalAportes = aj + ao + ap + as2;

  const remConSAC = bruto * 1.0833;
  const ganBruta = remConSAC - remConSAC * (0.17 + (sindicato ? 0.02 : 0));
  const dedMensual = (DEDUCCIONES.gananciasNoImponibles + DEDUCCIONES.deduccionEspecial + (conyuge ? DEDUCCIONES.conyuge : 0) + hijos * DEDUCCIONES.hijo) / 12;
  const totalDed = dedMensual + dedMensual / 12;
  const gnsi = Math.max(0, ganBruta - totalDed);
  const impGanancias = calcularGanancias(gnsi);

  return {
    jubilacion: aj,
    obraSocial: ao,
    pami: ap,
    sindicato: as2,
    totalAportes,
    impGanancias,
    neto: bruto - totalAportes - impGanancias,
  };
}

export function formatARS(n) {
  return n.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
