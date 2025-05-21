import Big from 'big.js';

const lbf_N = 4.4482216152605;
const in_M = 0.0254;
const ft_M = 0.3048;
const lbfin_Nm = 0.1129848290276167;
const lbfft_Nm = 1.355818;
const kipin_Nm = 112.984829;
const kipft_Nm = 1355.817948;

const conversions = {
  MN: { N: (N: Big): Big => N.div(1000000) },
  MNm: { Nm: (nm: Big): Big => nm.div(1000000) },
  MPa: { 'N/m²': (nm2: Big): Big => nm2.div(1000000) },
  N: {
    kN: (kN: Big): Big => kN.times(1000),
    MN: (MN: Big): Big => MN.times(1000000),
    lbf: (lbf: Big): Big => lbf.times(lbf_N),
    kip: (kip: Big): Big => kip.times(lbf_N).times(1000),
  },
  'N/m': {
    'kN/m': (knm: Big): Big => knm.times(1000),
    't/m': (tm: Big): Big => tm.times(10000),
  },
  'N/m²': {
    'kN/m²': (knm2: Big): Big => knm2.times(1000),
    MPa: (mpa: Big): Big => mpa.times(1000000),
    'kPa': (pa: Big): Big => pa.times(1000),
  },
  'N/m³': {
    'kN/m³': (knm3: Big): Big => knm3.times(1000),
    'N/mm³': (knm3: Big): Big => knm3.div(1000000000),
  },
  'N/mm²': {
    'N/m²': (nm2: Big): Big => nm2.times(1000000),
  },
  'N/mm³': {
    'N/m³': (nm3: Big): Big => nm3.times(1000000000),
  },
  Ncm: {
    Nm: (Nm: Big): Big => Nm.times(100),
    kNm: (kNm: Big): Big => kNm.times(100000),
  },
  Nm: {
    kNm: (knm: Big): Big => knm.times(1000),
    MNm: (mnm: Big): Big => mnm.times(1000000),
    lbfin: (lbfin: Big): Big => lbfin.times(lbfin_Nm),
    lbfft: (lbfft: Big): Big => lbfft.times(lbfft_Nm),
    kipin: (kipin: Big): Big => kipin.times(kipin_Nm),
    kipft: (kipft: Big): Big => kipft.times(kipft_Nm),
    Nmm: (Nmm: Big): Big => Nmm.div(1000),
    Ncm: (Ncm: Big): Big => Ncm.div(100),
    kNmm: (kNmm: Big): Big => kNmm,
    kNcm: (kNcm: Big): Big => kNcm.times(10),
  },
  'Nm/m': {
    'kNm/m': (knm: Big): Big => knm.times(1000),
  },
  Nmm: {
    Nm: (Nm: Big): Big => Nm.times(1000),
    kNm: (kNm: Big): Big => kNm.times(1000000),
  },
  cm: {
    m: (m: Big): Big => m.times(100.0),
  },
  'cm²': {
    'm²': (m2: Big): Big => m2.times(10000.0),
  },
  deg: {
    rad: (rad: Big): Big => rad.times(180.0).div(Math.PI),
  },
  ft: {
    m: (m: Big): Big => m.div(ft_M),
  },
  'ft²': {
    'm²': (m2: Big): Big => m2.div(ft_M).div(ft_M),
  },
  g: {
    kg: (kg: Big): Big => kg.times(1000),
  },
  'g/m': {
    'kg/m': (kgm: Big): Big => kgm.times(1000),
  },
  'g/m³': {
    'kg/m³': (kgm3: Big): Big => kgm3.times(1000),
  },
  in: {
    m: (m: Big): Big => m.div(in_M),
  },
  'in²': {
    'm²': (m2: Big): Big => m2.div(in_M).div(in_M),
  },
  kN: {
    N: (N: Big): Big => N.div(1000),
  },
  'kN/m': {
    'N/m': (nm: Big): Big => nm.div(1000),
    't/m': (tm: Big): Big => tm.times(10),
  },
  'kN/m²': {
    'N/m²': (nm2: Big): Big => nm2.div(1000),
  },
  'kN/m³': {
    'N/m³': (nm3: Big): Big => nm3.div(1000),
  },
  kNcm: {
    Nm: (Nm: Big): Big => Nm.div(10),
    kNm: (kNm: Big): Big => kNm.times(100),
  },
  kNm: {
    Nm: (nm: Big): Big => nm.div(1000),
  },
  'kNm/m': {
    'Nm/m': (nm: Big): Big => nm.div(1000),
  },
  kNmm: {
    Nm: (Nm: Big): Big => Nm,
    kNm: (kNm: Big): Big => kNm.times(1000),
  },
  'kg/m': {
    'g/m': (gm: Big): Big => gm.div(1000),
  },
  'kg/m³': {
    'g/m³': (gm3: Big): Big => gm3.div(1000),
    't/m³': (tm3: Big): Big => tm3.times(1000),
  },
  kip: {
    N: (N: Big): Big => N.div(lbf_N).div(1000),
    kN: (kN: Big): Big => kN.div(lbf_N),
  },
  kipft: {
    Nm: (Nm: Big): Big => Nm.div(kipft_Nm),
    kNm: (kNm: Big): Big => kNm.div(kipft_Nm).times(1000),
  },
  kipin: {
    Nm: (Nm: Big): Big => Nm.div(kipin_Nm),
    kNm: (kNm: Big): Big => kNm.div(kipin_Nm).times(1000),
  },
  lbf: {
    N: (N: Big): Big => N.div(lbf_N),
    kN: (kN: Big): Big => kN.div(lbf_N).div(1000),
  },
  lbfft: {
    Nm: (Nm: Big): Big => Nm.div(lbfft_Nm),
    kNm: (kNm: Big): Big => kNm.div(lbfft_Nm).times(1000),
  },
  lbfin: {
    Nm: (Nm: Big): Big => Nm.div(lbfin_Nm),
    kNm: (kNm: Big): Big => kNm.div(lbfin_Nm).times(1000),
  },
  m: {
    mm: (mm: Big): Big => mm.div(1000.0),
    cm: (cm: Big): Big => cm.div(100.0),
    in: (inch: Big): Big => inch.times(in_M),
    ft: (ft: Big): Big => ft.times(ft_M),
  },
  'm²': {
    'mm²': (mm2: Big): Big => mm2.div(1000000.0),
    'cm²': (cm2: Big): Big => cm2.div(10000.0),
    'in²': (inch2: Big): Big => inch2.times(in_M).times(in_M),
    'ft²': (ft2: Big): Big => ft2.times(ft_M).times(ft_M),
  },
  mm: {
    m: (m: Big): Big => m.times(1000.0),
  },
  'mm²': {
    'm²': (m2: Big): Big => m2.times(1000000.0),
  },
  kPa: {
    'N/m²': (knm2: Big): Big => knm2.div(1000)
  },
  rad: {
    deg: (deg: Big): Big => deg.times(Math.PI).div(180.0),
  },
  't/m': {
    'N/m': (nm: Big): Big => nm.div(10000),
    'kN/m': (knm: Big): Big => knm.div(10),
  },
  't/m³': {
    'kg/m³': (kgm3: Big): Big => kgm3.div(1000),
  },
};

const unitToSIMap = {
  'K': 'K',
  'MN': 'N',
  'MNm': 'Nm',
  'MPa': 'N/m²',
  'N': 'N',
  'N/m': 'N/m',
  'N/mm²': 'N/m²',
  'N/mm³': 'N/m³',
  'N/m²': 'N/m²',
  'N/m³': 'N/m³',
  'Ncm': 'Nm',
  'Nm': 'Nm',
  'Nm/m': 'Nm/m',
  'Nmm': 'Nm',
  'W/m*K': 'W/m*K',
  'cm': 'm',
  'cm²': 'm²',
  'deg': 'rad',
  'ft': 'm',
  'ft²': 'm²',
  'g': 'kg',
  'g/m': 'kg/m',
  'g/m³': 'kg/m³',
  'in': 'm',
  'in²': 'm²',
  'kN': 'N',
  'kN/m': 'N/m',
  'kN/m²': 'N/m²',
  'kN/m³': 'N/m³',
  'kNcm': 'Nm',
  'kNm': 'Nm',
  'kNm/m': 'Nm/m',
  'kNmm': 'Nm',
  'kg': 'kg',
  'kg/m': 'kg/m',
  'kg/m³': 'g/m³',
  'kip': 'N',
  'kipft': 'Nm',
  'kipin': 'Nm',
  'lbf': 'N',
  'lbfft': 'Nm',
  'lbfin': 'Nm',
  'm': 'm',
  'mm': 'm',
  'mm²': 'm²',
  'm²': 'm²',
  'kPa': 'N/m²',
  'rad': 'rad',
  't/m': 'N/m',
  't/m³': 'kg/m³',
};

export type AvailableUnits = keyof typeof unitToSIMap;

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
