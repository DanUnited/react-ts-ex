import React, { useState, useCallback, useEffect, useMemo } from 'react';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';
import locale from 'antd/lib/calendar/locale/en_US';
import { useQuery, useQueryClient } from 'react-query';

import { StyledCalendar } from './elements';
import { useAppSelector } from 'utils/hooks';
import { CalendarHeader } from './calendar-header';
import { usePrevious } from 'utils/hooks/use-previous';
import { CalendarDateCell } from './calendar-date-cell';
import { queryOptions } from 'modules/api-requests/constants';
import { getCurrentCourseId } from 'models/profile/selectors';
import { getCalendarEvents } from 'modules/api-requests/events';
import { DateFormat, DateTimeFormat, ServerDateFormat } from 'utils/date';
import { useWeatherForecastQuery } from 'modules/api-requests/weather/queries';

const localLocale = cloneDeep({
  ...locale,
  dateTimeFormat: DateTimeFormat,
  dateFormat: DateFormat,
  timePickerLocale: {
    ...locale.timePickerLocale,
  },
});

localLocale.lang.shortWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const CalendarTab = (): React.ReactElement => {
  const queryClient = useQueryClient();
  const [currentCalendarDate, setCurrentCalendarDate] = useState(moment());
  const prevCalendarDate = usePrevious(currentCalendarDate, moment().add(1, 'days'));
  const currentCourseId = useAppSelector(getCurrentCourseId);
  const nextMonth = useCallback((): void => {
    setCurrentCalendarDate(currentCalendarDate.clone().add(1, 'month'));
  }, [currentCalendarDate]);
  const fromDate = useMemo(() =>
    currentCalendarDate.clone().startOf('month').startOf('week'), [currentCalendarDate]);

  const previousMonth = useCallback((): void => {
    setCurrentCalendarDate(currentCalendarDate.clone().subtract(1, 'month'));
  }, [currentCalendarDate]);

  const { data: weatherData } = useWeatherForecastQuery(currentCourseId);

  const { data: eventList, refetch: hardEventsRefetch } = useQuery({
    queryKey: ['getCalendarEvents', currentCourseId, fromDate.format(DateFormat)],
    queryFn: () => {
      return getCalendarEvents(currentCourseId, {
        fromDate: fromDate.format(ServerDateFormat),
        toDate: fromDate.clone().add(41, 'days').format(ServerDateFormat),
      });
    },
    select: events => events.data.map(event => ({
      ...event,
      date: moment.utc(event.date).format(ServerDateFormat),
    })),
    cacheTime: 2000,
    enabled: Boolean(currentCourseId),
    ...queryOptions
  });

  useQuery({
    queryKey: ['getCalendarEvents'],
    queryFn: () => hardEventsRefetch(),
  });

  const onCalendarChange = useCallback((date: moment.Moment) => {
    setCurrentCalendarDate(date);
  }, []);

  useEffect(() => {
    if (currentCalendarDate.clone().startOf('month').startOf('week')
      .diff(prevCalendarDate.clone().startOf('month').startOf('week')) !== 0) {
      queryClient.invalidateQueries(['getCalendarEvents', currentCourseId, currentCalendarDate]);
    }
  }, [prevCalendarDate, currentCalendarDate, currentCourseId, queryClient]);

  return (
    <StyledCalendar
      value={currentCalendarDate}
      onChange={onCalendarChange}
      headerRender={CalendarHeader({ nextMonth, previousMonth })}
      dateFullCellRender={CalendarDateCell({ currentCalendarDate, eventList, weather: weatherData })}
      locale={localLocale}
    />
  );
};

export default CalendarTab;
