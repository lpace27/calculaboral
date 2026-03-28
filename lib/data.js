// =============================================
// DATOS ACTUALIZABLES — 1er Semestre 2026
// Cuando ARCA publique nuevos valores, editá los números acá
// y toda la página se actualiza automáticamente.
// =============================================

export const APORTES = {
  jubilacion: 0.11,
  obraSocial: 0.03,
  pami: 0.03,
  sindicato: 0.02,
};

export const DEDUCCIONES = {
  gananciasNoImponibles: 5151802.5,
  deduccionEspecial: 24728652.02,
  conyuge: 4851964.66,
  hijo: 2446863.48,
};

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

// Monotributo - Vigente desde 01/02/2026
// Fuente: https://www.afip.gob.ar/monotributo/categorias.asp
export const MONOTRIBUTO = [
  { cat: "A", ingresos: 10277988.13, sup: "30 m²", energia: "3.330 Kw", alquileres: 2390229.80, precioMax: 613492.31, impServ: 4780.46, impBien: 4780.46, sipa: 15616.17, os: 21990.11, servicios: 42386.74, bienes: 42386.74 },
  { cat: "B", ingresos: 15058447.71, sup: "45 m²", energia: "5.000 Kw", alquileres: 2390229.80, precioMax: 613492.31, impServ: 9082.88, impBien: 9082.88, sipa: 17177.79, os: 21990.11, servicios: 48250.78, bienes: 48250.78 },
  { cat: "C", ingresos: 21113696.52, sup: "60 m²", energia: "6.700 Kw", alquileres: 3266647.39, precioMax: 613492.31, impServ: 15616.17, impBien: 14341.38, sipa: 18895.57, os: 21990.11, servicios: 56501.85, bienes: 55227.06 },
  { cat: "D", ingresos: 26212853.42, sup: "85 m²", energia: "10.000 Kw", alquileres: 3266647.39, precioMax: 613492.31, impServ: 25495.79, impBien: 23742.95, sipa: 20785.13, os: 26133.18, servicios: 72414.10, bienes: 70661.26 },
  { cat: "E", ingresos: 30833964.37, sup: "110 m²", energia: "13.000 Kw", alquileres: 4143064.98, precioMax: 613492.31, impServ: 47804.60, impBien: 37924.98, sipa: 22863.64, os: 31869.73, servicios: 102537.97, bienes: 92658.35 },
  { cat: "F", ingresos: 38642048.36, sup: "150 m²", energia: "16.500 Kw", alquileres: 4143064.98, precioMax: 613492.31, impServ: 67245.13, impBien: 49398.08, sipa: 25150.00, os: 36650.19, servicios: 129045.32, bienes: 111198.27 },
  { cat: "G", ingresos: 46211109.37, sup: "200 m²", energia: "20.000 Kw", alquileres: 4939808.23, precioMax: 613492.31, impServ: 122379.76, impBien: 61189.87, sipa: 35210.00, os: 39518.47, servicios: 197108.23, bienes: 135918.34 },
  { cat: "H", ingresos: 70113407.33, sup: "200 m²", energia: "20.000 Kw", alquileres: 7170689.39, precioMax: 613492.31, impServ: 350567.04, impBien: 175283.51, sipa: 49294.00, os: 47485.89, servicios: 447346.93, bienes: 272063.40 },
  { cat: "I", ingresos: 78479211.62, sup: "200 m²", energia: "20.000 Kw", alquileres: 7170689.39, precioMax: 613492.31, impServ: 697150.35, impBien: 278860.14, sipa: 69011.60, os: 58640.31, servicios: 824802.26, bienes: 406512.05 },
  { cat: "J", ingresos: 89872640.30, sup: "200 m²", energia: "20.000 Kw", alquileres: 7170689.39, precioMax: 613492.31, impServ: 836580.42, impBien: 334632.18, sipa: 96616.24, os: 65810.99, servicios: 999007.65, bienes: 497059.41 },
  { cat: "K", ingresos: 108357084.05, sup: "200 m²", energia: "20.000 Kw", alquileres: 7170689.39, precioMax: 613492.31, impServ: 1171212.59, impBien: 390404.20, sipa: 135262.74, os: 75212.57, servicios: 1381687.90, bienes: 600879.51 },
];

export const VACACIONES = [
  { minAnios: 0, maxAnios: 5, dias: 14, label: "Hasta 5 años" },
  { minAnios: 5, maxAnios: 10, dias: 21, label: "5 a 10 años" },
  { minAnios: 10, maxAnios: 20, dias: 28, label: "10 a 20 años" },
  { minAnios: 20, maxAnios: 99, dias: 35, label: "Más de 20 años" },
];

export const NEWS_FALLBACK = [
  "Paritaria Comercio 2026: FAECyS inicia negociación salarial",
  "Reforma laboral Ley 27.802: los 7 cambios en el recibo de sueldos",
  "Ganancias 2026: nuevas escalas y deducciones desde enero",
  "Monotributo: nuevas categorías y cuotas desde febrero 2026",
  "Servicio Doméstico: escalas oficiales febrero y marzo 2026",
  "BCRA lanzó calculadora oficial para créditos laborales",
];
