import {MetricPrefix} from './utils';
import {Pythagorean, AbsolutePitch} from './pythagorean';
import {Fraction, lcm} from 'xen-dev-utils';

export type FJSFlavor = '' | 'n';

export type FJSInflection = [number, FJSFlavor];

export type IntegerLiteral = {
  type: 'IntegerLiteral';
  value: bigint;
};

export type DecimalLiteral = {
  type: 'DecimalLiteral';
  whole: bigint;
  fractional: string;
  exponent: bigint | null;
  flavor: '' | 'r' | 'e' | 'E';
};

export type FractionLiteral = {
  type: 'FractionLiteral';
  numerator: bigint;
  denominator: bigint;
};

// Not found in the AST
export type RadicalLiteral = {
  type: 'RadicalLiteral';
  argument: Fraction;
  exponent: Fraction;
};

export type StepLiteral = {
  type: 'StepLiteral';
  count: number;
};

export type NedjiLiteral = {
  type: 'NedoLiteral';
  numerator: number;
  denominator: number;
  // These synthetic fields are not found in the AST
  equaveNumerator?: number;
  equaveDenominator?: number;
};

export type CentsLiteral = {
  type: 'CentsLiteral';
  whole: bigint;
  fractional: string;
};

export type CentLiteral = {
  type: 'CentLiteral';
};

export type ReciprocalCentLiteral = {
  type: 'ReciprocalCentLiteral';
};

export type TrueLiteral = {
  type: 'TrueLiteral';
};

export type FalseLiteral = {
  type: 'FalseLiteral';
};

export type HertzLiteral = {
  type: 'HertzLiteral';
  prefix: MetricPrefix;
};

export type SecondLiteral = {
  type: 'SecondLiteral';
  prefix: MetricPrefix;
};

export type FJS = {
  type: 'FJS';
  ups: number;
  lifts: number;
  pythagorean: Pythagorean;
  superscripts: FJSInflection[];
  subscripts: FJSInflection[];
};

// FJS has stable representation for everything but ups.
// This node acts as a placeholder to indicate context-dependent up-down-lift-drop formatting.
export type AspiringFJS = {
  type: 'AspiringFJS';
};

export type AbsoluteFJS = {
  type: 'AbsoluteFJS';
  ups: number;
  lifts: number;
  pitch: AbsolutePitch;
  superscripts: FJSInflection[];
  subscripts: FJSInflection[];
};

// Ironically the meaning of absolute FJS depends on context.
export type AspiringAbsoluteFJS = {
  type: 'AspiringAbsoluteFJS';
};

export type WartsLiteral = {
  type: 'WartsLiteral';
  equave: string;
  divisions: number;
  warts: string[];
  basis: string[];
};

export type VectorComponent = {
  sign: '' | '+' | '-';
  left: bigint;
  separator?: '/' | '.';
  right: string;
  exponent: bigint | null;
};

export type MonzoLiteral = {
  type: 'MonzoLiteral';
  components: VectorComponent[];
  ups: number;
  lifts: number;
};

export type ValLiteral = {
  type: 'ValLiteral';
  components: VectorComponent[];
  ups: number;
  lifts: number;
};

export type IntervalLiteral =
  | IntegerLiteral
  | DecimalLiteral
  | FractionLiteral
  | RadicalLiteral
  | StepLiteral
  | NedjiLiteral
  | CentsLiteral
  | CentLiteral
  | ReciprocalCentLiteral
  | TrueLiteral
  | FalseLiteral
  | FJS
  | AspiringFJS
  | AbsoluteFJS
  | AspiringAbsoluteFJS
  | HertzLiteral
  | SecondLiteral
  | MonzoLiteral
  | ValLiteral
  | WartsLiteral;

export function uniformInvertNode(
  node?: IntervalLiteral
): IntervalLiteral | undefined {
  if (!node) {
    return undefined;
  }
  switch (node.type) {
    case 'IntegerLiteral':
      return {
        type: 'FractionLiteral',
        numerator: 1n,
        denominator: node.value,
      };
    case 'FractionLiteral':
      return {
        type: 'FractionLiteral',
        numerator: node.denominator,
        denominator: node.numerator,
      };
  }
  return undefined;
}

function aspireNodes(
  a: IntervalLiteral,
  b: IntervalLiteral
): IntervalLiteral | undefined {
  if (a.type === 'AbsoluteFJS' || a.type === 'AspiringAbsoluteFJS') {
    if (b.type === 'FJS' || b.type === 'AspiringAbsoluteFJS') {
      return {type: 'AspiringAbsoluteFJS'};
    }
  }
  if (a.type === 'FJS' || a.type === 'AspiringFJS') {
    if (b.type === 'AbsoluteFJS' || b.type === 'AspiringAbsoluteFJS') {
      return {type: 'AspiringAbsoluteFJS'};
    }
    if (b.type === 'FJS' || b.type === 'AspiringFJS') {
      return {type: 'AspiringFJS'};
    }
  }

  return undefined;
}

export function addNodes(
  a?: IntervalLiteral,
  b?: IntervalLiteral
): IntervalLiteral | undefined {
  if (!a || !b) {
    return undefined;
  }
  if (a.type === 'IntegerLiteral' && b.type === 'IntegerLiteral') {
    return {
      type: a.type,
      value: a.value + b.value,
    };
  }
  if (a.type === 'NedoLiteral' && b.type === 'NedoLiteral') {
    if (
      a.equaveNumerator !== b.equaveNumerator ||
      a.equaveDenominator !== b.equaveDenominator
    ) {
      return undefined;
    }
    const denominator = lcm(a.denominator, b.denominator);
    return {
      type: a.type,
      numerator:
        (denominator / a.denominator) * a.numerator +
        (denominator / b.denominator) * b.numerator,
      denominator,
      equaveNumerator: a.equaveNumerator,
      equaveDenominator: a.equaveDenominator,
    };
  }

  return aspireNodes(a, b);
}

export function subNodes(
  a?: IntervalLiteral,
  b?: IntervalLiteral
): IntervalLiteral | undefined {
  if (!a || !b) {
    return undefined;
  }
  if (a.type === 'IntegerLiteral' && b.type === 'IntegerLiteral') {
    return {
      type: a.type,
      value: a.value - b.value,
    };
  }
  if (a.type === 'NedoLiteral' && b.type === 'NedoLiteral') {
    const negB = {...b};
    negB.numerator = -b.numerator;
    return addNodes(a, negB);
  }
  if (a.type === 'AbsoluteFJS' || a.type === 'AspiringAbsoluteFJS') {
    if (b.type === 'FJS' || b.type === 'AspiringAbsoluteFJS') {
      return {type: 'AspiringAbsoluteFJS'};
    }
  }

  return aspireNodes(a, b);
}

export function modNodes(
  a?: IntervalLiteral,
  b?: IntervalLiteral
): IntervalLiteral | undefined {
  if (!a || !b) {
    return undefined;
  }
  if (
    (a.type === 'FJS' || a.type === 'AspiringFJS') &&
    (b.type === 'FJS' || b.type === 'AspiringFJS')
  ) {
    return {type: 'AspiringFJS'};
  }
  return undefined;
}

export function roundToNodes(
  a?: IntervalLiteral,
  b?: IntervalLiteral
): IntervalLiteral | undefined {
  if (!a || !b) {
    return undefined;
  }
  if (
    (a.type === 'FJS' || a.type === 'AspiringFJS') &&
    (b.type === 'FJS' || b.type === 'AspiringFJS')
  ) {
    return {type: 'AspiringFJS'};
  }
  return undefined;
}

export function divNodes(
  a?: IntervalLiteral,
  b?: IntervalLiteral
): IntervalLiteral | undefined {
  if (!a || !b) {
    return undefined;
  }
  if (a.type === 'IntegerLiteral' && b.type === 'IntegerLiteral') {
    return {
      type: 'FractionLiteral',
      numerator: a.value,
      denominator: b.value,
    };
  }
  return undefined;
}

export function mulNodes(
  a?: IntervalLiteral,
  b?: IntervalLiteral
): IntervalLiteral | undefined {
  if (!a || !b) {
    return undefined;
  }
  if (a.type === 'IntegerLiteral') {
    if (b.type === 'NedoLiteral') {
      return {
        type: 'NedoLiteral',
        numerator: Number(a.value) * b.numerator,
        denominator: b.denominator,
        equaveNumerator: b.equaveNumerator,
        equaveDenominator: b.equaveDenominator,
      };
    } else if (b.type === 'FJS' || b.type === 'AspiringFJS') {
      return {type: 'AspiringFJS'};
    } else if (b.type === 'CentLiteral') {
      return {
        type: 'CentsLiteral',
        whole: a.value,
        fractional: '',
      };
    }
    return undefined;
  }
  if (a.type === 'DecimalLiteral') {
    if (a.exponent || a.flavor) {
      return undefined;
    }
    if (b.type === 'CentLiteral') {
      return {
        type: 'CentsLiteral',
        whole: a.whole,
        fractional: a.fractional,
      };
    }
    return undefined;
  }
  if (b.type === 'IntegerLiteral' || b.type === 'DecimalLiteral') {
    return mulNodes(b, a);
  }
  return undefined;
}

export function projectNodes(
  octaves?: IntervalLiteral,
  base?: IntervalLiteral
): IntervalLiteral | undefined {
  if (!octaves || !base) {
    return undefined;
  }
  if (octaves.type === 'NedoLiteral' && octaves.equaveNumerator === undefined) {
    if (base.type === 'IntegerLiteral') {
      return {
        ...octaves,
        equaveNumerator: Number(base.value),
      };
    } else if (base.type === 'FractionLiteral') {
      return {
        ...octaves,
        equaveNumerator: Number(base.numerator),
        equaveDenominator: Number(base.denominator),
      };
    }
  }
  return undefined;
}

function formatUps(literal: MonzoLiteral | ValLiteral | FJS | AbsoluteFJS) {
  let result: string;
  if (literal.lifts < 0) {
    result = '\\'.repeat(-literal.lifts);
  } else {
    result = '/'.repeat(literal.lifts);
  }
  if (literal.ups < 0) {
    result += 'v'.repeat(-literal.ups);
  } else {
    result += '^'.repeat(literal.ups);
  }
  return result;
}

function tailFJS(literal: FJS | AbsoluteFJS) {
  let result = '';
  if (literal.superscripts.length) {
    result += '^' + literal.superscripts.map(i => i.join('')).join(',');
  }
  if (literal.subscripts.length) {
    result += '_' + literal.subscripts.map(i => i.join('')).join(',');
  }
  return result;
}

function formatFJS(literal: FJS) {
  const base = formatUps(literal);
  const d = literal.pythagorean.degree;
  return `${base}${literal.pythagorean.quality}${d.negative ? '-' : ''}${
    d.base + 7 * d.octaves
  }${tailFJS(literal)}`;
}

function formatAbsoluteFJS(literal: AbsoluteFJS) {
  const base = formatUps(literal);
  const p = literal.pitch;
  return `${base}${p.nominal}${p.accidentals.join('')}${p.octave}${tailFJS(
    literal
  )}`;
}

function formatDecimal(literal: DecimalLiteral) {
  let result = literal.whole.toString();
  if (literal.fractional) {
    result += '.' + literal.fractional;
  }
  const exponent = literal.exponent
    ? 'e' + literal.exponent.toString()
    : literal.flavor
    ? ''
    : 'e';
  return `${result}${exponent}${literal.flavor}`;
}

export function formatComponent(component: VectorComponent) {
  const {sign, left, separator, right, exponent} = component;
  const exponentPart = exponent ? `e${exponent}` : '';
  return `${sign === '-' ? '-' : ''}${left}${
    separator ?? ''
  }${right}${exponentPart}`;
}

function formatComponents(components: VectorComponent[]) {
  return components.map(formatComponent).join(' ');
}

function formatNedji(literal: NedjiLiteral) {
  if (literal.equaveNumerator === undefined) {
    return `${literal.numerator}\\${literal.denominator}`;
  }
  let equave = literal.equaveNumerator.toString();
  if (literal.equaveDenominator !== undefined) {
    equave += '/' + literal.equaveDenominator.toString();
  }
  return `${literal.numerator}\\${literal.denominator}<${equave}>`;
}

export function literalToString(literal: IntervalLiteral) {
  switch (literal.type) {
    case 'NedoLiteral':
      return formatNedji(literal);
    case 'StepLiteral':
      return `${literal.count}\\`;
    case 'FractionLiteral':
      return `${literal.numerator}/${literal.denominator}`;
    case 'RadicalLiteral':
      return `${literal.argument.toFraction()}^${literal.exponent.toFraction()}`;
    case 'DecimalLiteral':
      return formatDecimal(literal);
    case 'CentsLiteral':
      return `${literal.whole}.${literal.fractional}`;
    case 'CentLiteral':
      return 'c';
    case 'ReciprocalCentLiteral':
      return '€';
    case 'TrueLiteral':
      return 'true';
    case 'FalseLiteral':
      return 'false';
    case 'FJS':
      return formatFJS(literal);
    case 'AbsoluteFJS':
      return formatAbsoluteFJS(literal);
    case 'WartsLiteral':
      return `${literal.equave}${literal.divisions}${literal.warts.join(
        ''
      )}@${literal.basis.join('.')}`;
    case 'HertzLiteral':
      return `${literal.prefix}Hz`;
    case 'SecondLiteral':
      return `${literal.prefix}s`;
    case 'MonzoLiteral':
      return `${formatUps(literal)}[${formatComponents(literal.components)}>`;
    case 'ValLiteral':
      return `${formatUps(literal)}<${formatComponents(literal.components)}]`;
    case 'IntegerLiteral':
      return literal.value.toString();
    default:
      throw new Error(`Cannot format ${literal.type}`);
  }
}
