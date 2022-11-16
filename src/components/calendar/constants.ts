import type { IAvailableDays } from 'modules/api-requests/rates/types';

export const calendarValues: {
  shortName: string;
  value: keyof IAvailableDays;
}[] = [
  {
    shortName: 'Su',
    value: 'Sunday',
  },
  {
    shortName: 'Mo',
    value: 'Monday',
  },
  {
    shortName: 'Tu',
    value: 'Tuesday',
  },
  {
    shortName: 'We',
    value: 'Wednesday',
  },
  {
    shortName: 'Th',
    value: 'Thursday',
  },
  {
    shortName: 'Fr',
    value: 'Friday',
  },
  {
    shortName: 'St',
    value: 'Saturday',
  },
  {
    shortName: 'Ho',
    value: 'Holiday',
  },
];
