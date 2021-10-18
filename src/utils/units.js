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
};

const SI = {
  m: 'm',
  mm: 'm',
  cm: 'm',
  rad: 'rad',
  deg: 'rad',
  'N/m': 'N/m',
};

const aliases = {
  '°': 'deg',
};

export function convert(quantity, _from, _to) {
  const from = aliases[_from] || _from; // eslint-disable-line
  const to = aliases[_to] || _to; // eslint-disable-line
  if (!conversions[to] || !conversions[to][from]) {
    throw new Error(`Units unable to convert ${from} to ${to}.`);
  }
  return conversions[to][from](Big(quantity)).toNumber();
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

export default convert;
