import Big from 'big.js';

const lbf_N = 4.4482216152605;
const in_M = 0.0254;
const ft_M = 0.3048;
const lbfin_Nm = 0.1129848290276167;
const lbfft_Nm = 1.355818;
const kipin_Nm = 112.984829;
const kipft_Nm = 1355.817948;

const conversions = {
  m: {
    mm: (mm) => mm.div(1000.0),
    cm: (cm) => cm.div(100.0),
    in: (inch) => inch.times(in_M),
    ft: (ft) => ft.times(ft_M),
  },
  mm: {
    m: (m) => m.times(1000.0),
  },
  cm: {
    m: (m) => m.times(100.0),
  },
  'm²': {
    'mm²': (mm2) => mm2.div(1000000.0),
    'cm²': (cm2) => cm2.div(10000.0),
    'in²': (inch2) => inch2.times(in_M).times(in_M),
    'ft²': (ft2) => ft2.times(ft_M).times(ft_M),
  },
  'mm²': {
    'm²': (m2) => m2.times(1000000.0),
  },
  'cm²': {
    'm²': (m2) => m2.times(10000.0),
  },
  rad: {
    deg: (deg) => deg.times(Math.PI).div(180.0),
  },
  deg: {
    rad: (rad) => rad.times(180.0).div(Math.PI),
  },
  N: {
    kN: (kN) => kN.times(1000),
    MN: (MN) => MN.times(1000000),
    lbf: (lbf) => lbf.times(lbf_N),
    kip: (kip) => kip.times(lbf_N).times(1000),
  },
  kN: {
    N: (N) => N.div(1000),
  },
  g: {
    kg: (kg) => kg.times(1000),
  },
  MN: {
    N: (N) => N.div(1000000),
  },
  'N/m': {
    'kN/m': (knm) => knm.times(1000),
    't/m': (tm) => tm.times(10000),
  },
  'kN/m': {
    'N/m': (nm) => nm.div(1000),
    't/m': (tm) => tm.times(10),
  },
  'kNm/m': {
    'Nm/m': (nm) => nm.div(1000),
  },
  'Nm/m': {
    'kNm/m': (knm) => knm.times(1000),
  },
  't/m': {
    'N/m': (nm) => nm.div(10000),
    'kN/m': (knm) => knm.div(10),
  },
  'g/m': {
    'kg/m': (knm) => kgm.times(1000),
  },
  'kg/m': {
    'g/m': (nm) => gm.div(1000),
  },
  'kN/m²': {
    'N/m²': (nm2) => nm2.div(1000),
  },
  'N/m²': {
    'kN/m²': (knm2) => knm2.times(1000),
  },
  'N/m³': {
    'kN/m³': (knm3) => knm3.times(1000),
    'N/mm³': (knm3) => knm3.div(1000000000),
  },
  'N/mm³': {
    'N/m³': (nm3) => nm3.times(1000000000),
  },
  'kN/m³': {
    'N/m³': (nm3) => nm3.div(1000),
  },
  'kg/m³': {
    'g/m³': (gm3) => gm3.div(1000),
  },
  'g/m³': {
    'kg/m³': (kgm3) => kgm3.times(1000),
  },
  kNm: {
    Nm: (nm) => nm.div(1000),
  },
  Nm: {
    kNm: (knm) => knm.times(1000),
    MNm: (mnm) => mnm.times(1000000),
    lbfin: (lbfin) => lbfin.times(lbfin_Nm),
    lbfft: (lbfft) => lbfft.times(lbfft_Nm),
    kipin: (kipin) => kipin.times(kipin_Nm),
    kipft: (kipft) => kipft.times(kipft_Nm),
    Nmm: (Nmm) => Nmm.div(1000),
    Ncm: (Ncm) => Ncm.div(100),
    kNmm: (kNmm) => kNmm,
    kNcm: (kNcm) => kNcm.times(10),
  },
  MNm: {
    Nm: (nm) => nm.div(1000000),
  },
  'N/mm²': {
    'N/m²': (nm2) => nm2.times(1000000),
  },
  MPa: {
    'N/m²': (nm2) => nm2.times(1000000),
  },
  in: {
    m: (m) => m.div(in_M),
  },
  ft: {
    m: (m) => m.div(ft_M),
  },
  'in²': {
    'm²': (m2) => m2.div(in_M).div(in_M),
  },
  'ft²': {
    'm²': (m2) => m2.div(ft_M).div(ft_M),
  },
  lbf: {
    N: (N) => N.div(lbf_N),
    kN: (kN) => kN.div(lbf_N).div(1000),
  },
  lbfin: {
    Nm: (Nm) => Nm.div(lbfin_Nm),
    kNm: (kNm) => kNm.div(lbfin_Nm).times(1000),
  },
  lbfft: {
    Nm: (Nm) => Nm.div(lbfft_Nm),
    kNm: (kNm) => kNm.div(lbfft_Nm).times(1000),
  },
  kip: {
    N: (N) => N.div(lbf_N).div(1000),
    kN: (kN) => kN.div(lbf_N),
  },
  kipin: {
    Nm: (Nm) => Nm.div(kipin_Nm),
    kNm: (kNm) => kNm.div(kipin_Nm).times(1000),
  },
  kipft: {
    Nm: (Nm) => Nm.div(kipft_Nm),
    kNm: (kNm) => kNm.div(kipft_Nm).times(1000),
  },
  Nmm: {
    Nm: (Nm) => Nm.times(1000),
    kNm: (kNm) => kNm.times(1000000),
  },
  Ncm: {
    Nm: (Nm) => Nm.times(100),
    kNm: (kNm) => kNm.times(100000),
  },
  kNmm: {
    Nm: (Nm) => Nm,
    kNm: (kNm) => kNm.times(1000),
  },
  kNcm: {
    Nm: (Nm) => Nm.div(10),
    kNm: (kNm) => kNm.times(100),
  },
};

const unitToSIMap = {
  m: 'm',
  mm: 'm',
  cm: 'm',
  'm²': 'm²',
  'cm²': 'm²',
  'mm²': 'm²',
  rad: 'rad',
  deg: 'rad',
  'kg/m': 'kg/m',
  'N/m': 'N/m',
  'kN/m': 'N/m',
  't/m': 'N/m',
  kg: 'kg',
  g: 'kg',
  N: 'N',
  kN: 'N',
  K: 'K',
  'W/m*K': 'W/m*K',
  MN: 'N',
  Nm: 'Nm',
  kNm: 'Nm',
  MNm: 'Nm',
  Nmm: 'Nm',
  Ncm: 'Nm',
  kNmm: 'Nm',
  kNcm: 'Nm',
  'kN/m²': 'N/m²',
  'N/mm²': 'N/m²',
  'N/m³': 'N/m³',
  'kN/m³': 'N/m³',
  'kg/m³': 'g/m³',
  'g/m³': 'kg/m³',
  'N/mm³': 'N/m³',
  MPa: 'N/m²',
  in: 'm',
  ft: 'm',
  'in²': 'm²',
  'ft²': 'm²',
  lbf: 'N',
  lbfin: 'Nm',
  lbfft: 'Nm',
  kip: 'N',
  kipin: 'Nm',
  kipft: 'Nm',
  'Nm/m': 'Nm/m',
  'kNm/m': 'Nm/m',
  'N/m²': 'N/m²',
  'kN/m²': 'N/m²'
};

const aliases = {
  '°': 'deg',
};

export function defineCustomUnits(unit, siUnit, { fromSI, toSI }) {
  if (unitToSIMap[unit]) {
    throw new Error(`Cannot add unit ${siUnit} as it already exists`);
  }

  unitToSIMap[unit] = siUnit;

  conversions[unit] = { [siUnit]: fromSI };

  // If SI unit already exists add to existing SI property.
  // Otherwise, create a new property on the conversions object
  if (!conversions[siUnit]) conversions[siUnit] = {};

  conversions[siUnit][unit] = toSI;
}

export function convert(quantity, _from, _to) {
  if (quantity === null) return quantity;
  const from = aliases[_from] || _from; // eslint-disable-line
  const to = aliases[_to] || _to; // eslint-disable-line
  if (!conversions[to] || !conversions[to][from]) {
    throw new Error(`Units unable to convert ${from} to ${to}.`);
  }
  return Number(conversions[to][from](Big(quantity)));
}

export function convertFromSI(quantity, _unit) {
  const unit = aliases[_unit] || _unit; // eslint-disable-line
  if (!unitToSIMap[unit]) {
    throw new Error(`no SI unit available for ${unit}`);
  }
  if (unitToSIMap[unit] === unit) return quantity;
  return convert(quantity, unitToSIMap[unit], unit);
}

export function convertToSI(quantity, _unit) {
  const unit = aliases[_unit] || _unit; // eslint-disable-line
  if (!unitToSIMap[unit]) {
    throw new Error(`no SI unit available for ${unit}`);
  }
  if (unitToSIMap[unit] === unit) return quantity;
  return convert(quantity, unit, unitToSIMap[unit]);
}

export function isNumber(value) {
  if (value === undefined) return false;
  try {
    Big(value);
    return true;
  } catch (e) {
    return false;
  }
}

export default convert;
