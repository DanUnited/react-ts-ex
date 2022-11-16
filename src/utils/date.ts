import moment from 'moment';

import type { Moment } from 'moment';

export const weekFormat = 'MM.DD';
export const TimeFormat = 'h:mm A';
export const DateFormat = 'MM-DD-YYYY';
export const DateTimeFormat = 'h:mm A [\r\n] MM-DD-YYYY';

export const ServerTimeFormat = 'HH:mm';
export const ServerDateFormat = 'YYYY-MM-DD';

export const toUTCFormat = (val: Moment): string => {
  return moment.utc(val).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format();
};

export const toUTCMoment = (val?: Moment | string | Date): Moment => {
  return moment(val).utc().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
};

export const fromISOString = (isoDate: string): Date => {
  return new Date(isoDate);
};

export const toISOString = (date: Date): string => {
  return date.toJSON();
};

