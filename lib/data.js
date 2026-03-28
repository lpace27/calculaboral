// =============================================
// DATOS ACTUALIZABLES — 1er Semestre 2026
// Cuando ARCA publique nuevos valores, editá los números acá
// y toda la página se actualiza automáticamente.
// =============================================

// Aportes obligatorios del empleado
export const APORTES = {
  jubilacion: 0.11,   // 11%
  obraSocial: 0.03,   // 3%
  pami: 0.03,         // 3%
  sindicato: 0.02,    // 2% (opcional)
};

// Deducciones anuales Ganancias 4ta categoría - 1er semestre 2026
export const DEDUCCIONES = {
  gananciasNoImponibles: 5151802.5,
  deduccionEspecial: 24728652.02,
  conyuge: 4851964.66,
  hijo: 2446863.48,
};

// Escala progresiva Art. 94 - Mensual estimada (anual / 6)
export const ESCALA_GANANCIAS = [
  { limite: 333338.35, tasa: 0.05, fijo: 0 },
  { limite: 666676.70, tasa: 0.09, fijo: 16666.92 },
  { limite: 1000015.04, tasa: 0.12, fijo: 46667.37 },
  { limite: 2000030.09, tasa: 0.15, fijo: 86668 },
  { limite: 3000045.14, tasa: 0.19, fijo: 236670.26 },
  { limite: 6000090.27, tasa: 0.23, fijo: 426673.22 },
  { limite: 8000120.36, tasa: 0.27, fijo: 1116683.4 },
  { limite: 10125152.33, tasa: 0.31, fijo: 1656691.57 },
  { limite: Infinity, tasa: 0.35, fijo: 2445453.46 },
];

// Monotributo - Categorías vigentes desde Febrero 2026
export const MONOTRIBUTO = [
  { cat: "A", ingresos: 10277988.13, servicios: 42386.74, bienes: 42386.74 },
  { cat: "B", ingresos: 15058447.71, servicios: 48250.78, bienes: 48250.78 },
  { cat: "C", ingresos: 21113696.52, servicios: 56501.85, bienes: 55227.06 },
  { cat: "D", ingresos: 26212853.42, servicios: 72414.10, bienes: 70661.26 },
  { cat: "E", ingresos: 30833964.37, servicios: 102537.97, bienes: 92658.35 },
  { cat: "F", ingresos: 38642048.36, servicios: 129045.32, bienes: 111198.27 },
  { cat: "G", ingresos: 46211109.37, servicios: 197108.23, bienes: 135918.34 },
  { cat: "H", ingresos: 70113407.33, servicios: 447346.93, bienes: 272063.40 },
  { cat: "I", ingresos: 78479211.62, servicios: 824802.26, bienes: 406512.05 },
  { cat: "J", ingresos: 89872640.30, servicios: 999007.65, bienes: 497059.41 },
  { cat: "K", ingresos: 108357084.05, servicios: 1381687.90, bienes: 600879.51 },
];

// Vacaciones - Art. 150 LCT
export const VACACIONES = [
  { minAnios: 0, maxAnios: 5, dias: 14, label: "Hasta 5 años" },
  { minAnios: 5, maxAnios: 10, dias: 21, label: "5 a 10 años" },
  { minAnios: 10, maxAnios: 20, dias: 28, label: "10 a 20 años" },
  { minAnios: 20, maxAnios: 99, dias: 35, label: "Más de 20 años" },
];

// Noticias de respaldo (si Google News no responde)
export const NEWS_FALLBACK = [
  "Paritaria Comercio 2026: FAECyS inicia negociación salarial",
  "Reforma laboral Ley 27.802: los 7 cambios en el recibo de sueldos",
  "Ganancias 2026: nuevas escalas y deducciones desde enero",
  "Monotributo: nuevas categorías y cuotas desde febrero 2026",
  "Servicio Doméstico: escalas oficiales febrero y marzo 2026",
  "BCRA lanzó calculadora oficial para créditos laborales",
];
