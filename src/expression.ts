import {bigLcm} from './utils';

export type PlainLiteral = {
  type: 'PlainLiteral';
  value: bigint;
};

export type DecimalLiteral = {
  type: 'DecimalLiteral';
  whole: bigint;
  fractional: string;
};

export type NedoLiteral = {
  type: 'NedoLiteral';
  numerator: bigint;
  denominator: bigint;
};

export type IntervalLiteral = PlainLiteral | DecimalLiteral | NedoLiteral;

export function addNodes(
  a?: IntervalLiteral,
  b?: IntervalLiteral
): IntervalLiteral | undefined {
  if (!a || !b) {
    return undefined;
  }
  if (a.type === 'PlainLiteral' && b.type === 'PlainLiteral') {
    return {
      type: a.type,
      value: a.value + b.value,
    };
  }
  if (a.type === 'NedoLiteral' && b.type === 'NedoLiteral') {
    const denominator = bigLcm(a.denominator, b.denominator);
    return {
      type: a.type,
      numerator:
        (denominator / a.denominator) * a.numerator +
        (denominator / b.denominator) * b.numerator,
      denominator,
    };
  }

  return undefined;
}

export function subNodes(
  a?: IntervalLiteral,
  b?: IntervalLiteral
): IntervalLiteral | undefined {
  if (!a || !b) {
    return undefined;
  }
  if (a.type === 'PlainLiteral' && b.type === 'PlainLiteral') {
    return {
      type: a.type,
      value: a.value - b.value,
    };
  }
  if (a.type === 'NedoLiteral' && b.type === 'NedoLiteral') {
    const denominator = bigLcm(a.denominator, b.denominator);
    return {
      type: a.type,
      numerator:
        (denominator / a.denominator) * a.numerator -
        (denominator / b.denominator) * b.numerator,
      denominator,
    };
  }

  return undefined;
}

export function toString(literal: IntervalLiteral) {
  switch (literal.type) {
    case 'NedoLiteral':
      return `${literal.numerator}\\${literal.denominator}`;
    case 'DecimalLiteral':
      return `${literal.whole},${literal.fractional}`;
    default:
      return literal.value.toString();
  }
}
