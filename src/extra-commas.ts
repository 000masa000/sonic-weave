import {Fraction, PRIMES} from 'xen-dev-utils';
import {TimeMonzo, getNumberOfComponents} from './monzo';
import {ZERO} from './utils';

// Lumi's irrational collection
const LUMIS_COMMAS = {
  // For 15/14 ~ sm2^0l
  '0': ['-25/4', '17/4', '1', '-1'],
  // For 11/10 ~ sM2_1l
  '1': ['3/4', '1/4', '1', '0', '-1'],
  // For 34/19 ~ α4_2l
  '2': ['-13/2', '4', '0', '0', '0', '0', '-1', '1'],
  // For 15/13 ~ φ4_3l
  '3': ['1', '-3/2', '-1', '0', '0', '1'],
  // For 25/14 ~ α4^4l
  '4': ['-9/2', '4', '-2', '1'],
  // For 7/5 ~ ζ4_5l
  '5': ['1/2', '0', '1', '-1'],
  // For 28/17 ~ sM6_6l
  '6': ['-13/4', '5/4', '0', '-1', '0', '0', '1'],
  // For 35/27 ~ χ4^7l
  '7': ['-2', '9/2', '-1', '-1'],
  // For 39/28 ~ ζ4_8l
  '8': ['5/2', '-1', '0', '1', '0', '-1'],
  // For 21/19 ~ sM2_9l
  '9': ['-1/4', '-3/4', '0', '-1', '0', '0', '0', '1'],
};

// https://en.xen.wiki/w/Helmholtz-Ellis_notation
const HELMHOLTZ_ELLIS = {
  '5': '81/80',
  '7': '64/63',
  '11': '33/32',
  '13': '27/26',
  '17': '2187/2176',
  '19': '513/512',
  '23': '736/729',
  '29': '261/256',
  '31': '32/31',
  '37': '37/36',
  '41': '82/81',
  '43': '129/128',
  '47': '752/729',
  // https://en.xen.wiki/w/Richie%27s_HEJI_extensions
  '53': '54/53',
  '59': '243/236',
  '61': '244/243',
  '67': '2187/2144',
  '71': '72/71',
  '73': '73/72',
  '79': '81/79',
  '83': '256/249',
  '89': '729/712',
};

// http://www.tonalsoft.com/enc/h/hewm.aspx
const HEWM53 = {
  '5': '81/80',
  '7': '64/63',
  '11': '33/32',
  '13': '27/26',
  '17': '18/17',
  '19': '19/18',
  '23': '24/23',
  '29': '261/256',
  '31': '32/31',
  '37': '37/36',
  '41': '82/81',
  '43': '129/128',
  '47': '48/47',
  '53': '54/53',
};

const LUMIS_MAP = new Map<number, TimeMonzo>();

for (const [key, value] of Object.entries(LUMIS_COMMAS)) {
  const monzo = new TimeMonzo(
    ZERO,
    value.map(f => new Fraction(f))
  );
  monzo.numberOfComponents = getNumberOfComponents();
  LUMIS_MAP.set(parseInt(key, 10), monzo);
}

const UNITY = TimeMonzo.fromFraction(1);

export function getLumisComma(id: number) {
  if (LUMIS_MAP.has(id)) {
    return LUMIS_MAP.get(id)!;
  }
  return UNITY;
}

const HELMHOLTZ_ELLIS_ARRAY = [UNITY, UNITY];

for (const [prime, fraction] of Object.entries(HELMHOLTZ_ELLIS)) {
  HELMHOLTZ_ELLIS_ARRAY[PRIMES.indexOf(parseInt(prime, 10))] =
    TimeMonzo.fromFraction(fraction);
}

export function getHelmholtzEllis(index: number) {
  if (index < HELMHOLTZ_ELLIS_ARRAY.length) {
    return HELMHOLTZ_ELLIS_ARRAY[index];
  }
  return UNITY;
}

const HEWM53_ARRAY = [UNITY, UNITY];

for (const [prime, fraction] of Object.entries(HEWM53)) {
  HEWM53_ARRAY[PRIMES.indexOf(parseInt(prime, 10))] =
    TimeMonzo.fromFraction(fraction);
}

export function getHEWM53(index: number) {
  if (index < HEWM53_ARRAY.length) {
    return HEWM53_ARRAY[index];
  }
  return UNITY;
}
