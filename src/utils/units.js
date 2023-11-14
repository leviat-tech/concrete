import Big from 'big.js';

const conversions = {
  m: {
    mm: (mm) => mm.div(1000.0),
    cm: (cm) => cm.div(100.0),
    in: (inch) => inch.times(0.0254),
    ft: (ft) => ft.times(0.3048),
  },
  mm: {
    m: (m) => m.times(1000.0),
  },
  cm: {
    m: (m) => m.times(100.0),
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
  },
  kN: {
    N: (N) => N.div(1000),
    lbf: (lbf) => lbf.time(0.0044482216152605),
    kip: (kip) => kip.times(4.4482216152605),
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
  't/m': {
    'N/m': (nm) => nm.div(10000),
    'kN/m': (knm) => knm.div(10),
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
  kNm: {
    Nm: (nm) => nm.div(1000),
  },
  Nm: {
    kNm: (knm) => knm.times(1000),
    MNm: (mnm) => mnm.times(1000000),
    'lbf in': (lbfin) => lbfin.times(0.1129848290276167),
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
    m: (inch) => inch.div(0.0254),
  },
  ft: {
    m: (ft) => ft.div(0.3048),
  },
  lbf: {
    N: (lbf) => lbf.div(4.4482216152605),
    kN: (lbf) => lbf.div(0.0044482216152605),
  },
  'lbf in': {
    Nm: (lbf) => lbf.div(0.1129848290276167),
  },
  kip: {
    kN: (kip) => kip.div(4.4482216152605),
  },
};

const unitToSIMap = {
  m: 'm',
  mm: 'm',
  cm: 'm',
  rad: 'rad',
  deg: 'rad',
  'N/m': 'N/m',
  'kN/m': 'N/m',
  't/m': 'N/m',
  N: 'N',
  kN: 'N',
  K: 'K',
  'W/m*K': 'W/m*K',
  MN: 'N',
  kNm: 'Nm',
  MNm: 'Nm',
  'kN/m²': 'N/m²',
  'N/mm²': 'N/m²',
  'N/m³': 'N/m³',
  'kN/m³': 'N/m³',
  'N/mm³': 'N/m³',
  MPa: 'N/m²',
  in: 'm',
  ft: 'm',
  lbf: 'kN',
  'lbf in': 'lbf',
  kip: 'kN',
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
