import type { IDayOut, IWeekDay } from './types';

export const defaultWeekDaysYield: IWeekDay[] = [
  { from: 80, to: 100, ratios: {} },
  { from: 60, to: 79, ratios: {} },
  { from: 40, to: 59, ratios: {} },
  { from: 20, to: 39, ratios: {} },
  { from: 10, to: 19, ratios: {} },
  { from: 0, to: 9, ratios: {} },
];

export const defaultDaysOutYield: IDayOut[] = [
  { from: 80, to: 100, ratios: {} },
  { from: 60, to: 79, ratios: {} },
  { from: 40, to: 59, ratios: {} },
  { from: 20, to: 39, ratios: {} },
  { from: 10, to: 19, ratios: {} },
  { from: 0, to: 9, ratios: {} },
];

export const defaultDaysOut: Record<string | number, number | null> = {
  0: null,
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  '7-14': null,
};
