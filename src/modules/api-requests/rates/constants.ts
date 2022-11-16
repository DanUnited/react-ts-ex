import type { WeekDayType } from './types';

export const DEFAULT_OVERRIDE_DAYS: Record<WeekDayType, number | undefined> & { key: string } = {
  key: 'key',
  Sunday: 0,
  Monday: 0,
  Tuesday: 0,
  Wednesday: 0,
  Thursday: 0,
  Friday: 0,
  Saturday: 0,
  Holiday: 0,
};
