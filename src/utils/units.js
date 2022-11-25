import Big from 'big.js';

const conversions = {
  m: {
    mm: (mm) => mm.div(1000.0),
    cm: (cm) => cm.div(100.0),
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
  'N/m': {
    'kN/m': (knm) => knm.times(1000),
  },
  'kN/m': {
    'N/m': (nm) => nm.div(1000),
  },
  N: {
    kN: (kN) => kN.times(1000),
  },
  kN: {
    N: (N) => N.div(1000),
  },
  'N/m³': {
    'kN/m³': (knm3) => knm3.times(1000),
  },
  'kN/m³': {
    'N/m³': (nm3) => nm3.div(1000),
  },
  'kN/m²': {
    'N/m²': (nm2) => nm2.div(1000),
  },
  'N/m²': {
    'kN/m²': (knm2) => knm2.times(1000),
  },
  MN: {
    N: (N) => N.times(1000000),
  },
  kNm: {
    Nm: (Nm) => Nm.times(1000),
  },
  MNm: {
    Nm: (Nm) => Nm.times(1000000),
  },
  'N/mm²': {
    'N/m²': (nm2) => nm2.times(1000000),
  },
  MPa: {
    'N/m': (nm) => nm.times(1000000),
  },
};

const SI = {
  m: 'm',
  mm: 'm',
  cm: 'm',
  rad: 'rad',
  deg: 'rad',
  'N/m': 'N/m',
  'kN/m': 'N/m',
  N: 'N',
  kN: 'N',
  'kN/m³': 'N/m³',
  'kN/m²': 'N/m²',
  K: 'K',
  'W/m*K': 'W/m*K',
  MN: 'N',
  kNm: 'Nm',
  MNm: 'Nm',
  'N/mm²': 'N/m²',
  MPa: 'N/m²',
};

const aliases = {
  '°': 'deg',
};

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
  if (!SI[unit]) {
    throw new Error(`no SI unit available for ${unit}`);
  }
  if (SI[unit] === unit) return quantity;
  return convert(quantity, SI[unit], unit);
}

export function convertToSI(quantity, _unit) {
  const unit = aliases[_unit] || _unit; // eslint-disable-line
  if (!SI[unit]) {
    throw new Error(`no SI unit available for ${unit}`);
  }
  if (SI[unit] === unit) return quantity;
  return convert(quantity, unit, SI[unit]);
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
