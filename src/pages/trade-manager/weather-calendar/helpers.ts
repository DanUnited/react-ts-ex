import moment from 'moment';
import { toUTCFormat, toUTCMoment } from 'utils/date';

import type { Moment } from 'moment';

export const generateCalendarWeekDays = (currentDate: Moment | null | undefined, days = 7) => {
  const cDate = currentDate ? currentDate : new Date();
  const startDay = toUTCMoment(cDate).startOf('week').diff(toUTCMoment(new Date()).startOf('week'), 'days') > 0
    ? moment(cDate).startOf('week')
    : moment(new Date());

  return (new Array(days))
    .fill(null)
    .map((_, index) => ({
      day: toUTCFormat(startDay.add(index > 0 ? 1 : 0, 'days')),
    }))
}
