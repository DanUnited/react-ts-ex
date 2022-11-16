import moment from 'moment';

import { ServerTimeFormat, TimeFormat } from 'utils/date';

export const periodDate = (date: string): string =>
  moment(date, ServerTimeFormat).format(TimeFormat);
