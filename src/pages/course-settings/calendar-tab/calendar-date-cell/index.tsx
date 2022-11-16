import React from 'react';
import moment from 'moment';
import cs from 'classnames';
import memoize from 'lodash/memoize';

import { DateFormat } from 'utils/date';
import { ViewEventModal } from './view-event-modal';
import { CreateEventModal } from './create-event-modal';
import { editableEvents } from 'pages/course-settings/constants';
import {
  CalendarCell,
  TopCellContainer,
  CalendarEventsContainer,
  CalendarWeatherContainer,
  CalendarWeatherTemperature,
} from './elements';
import { getConditionIcon } from 'pages/dashboard/weather-widget/utils';

import type { Moment } from 'moment';
import type { IWeatherForecastItem } from 'modules/api-requests/weather/types';
import type { ICalendarEventResponse } from 'modules/api-requests/events/types';

interface IDateCellRender {
  currentCalendarDate: Moment,
  weather?: IWeatherForecastItem[];
  eventList?: ICalendarEventResponse[],
}

export const CalendarDateCell = ({ currentCalendarDate, weather, eventList = [] }: IDateCellRender) =>
  memoize((value: Moment) => {
    const currentDayEvents = eventList?.filter(event => moment(event.date).format('LL') === value.format('LL'));

    const isEventSettingsDisabled = () => {
      return currentCalendarDate.format('MMMM') !== value.format('MMMM')
        || !moment().isSameOrBefore(value, 'day');
    };

    const isCurrentDay = () => value.format('LL') === moment().format('LL');

    const isViewEventDisabled = () => currentCalendarDate.format('MMMM') !== value.format('MMMM');

    const currentWeather = weather?.find(item => moment.unix(item.dt).format(DateFormat) === value.format(DateFormat));

    return (
      <CalendarCell
        title={value.format(DateFormat)}
        className={cs({
          currentDay: isCurrentDay(),
          outDate: moment().isAfter(value),
        })}>

        <CreateEventModal
          date={value.clone()}
          isDisabled={isEventSettingsDisabled()}
        />

        <TopCellContainer>
          <div className="weather-container">
            {currentWeather
              ? <CalendarWeatherContainer>
                <img src={getConditionIcon(currentWeather?.weather?.[0]?.icon)} alt="Cond" />
                <CalendarWeatherTemperature>
                  {currentWeather?.temp ? parseInt(String(currentWeather.temp.day), 10).toFixed(0) : '??? '}°F
                </CalendarWeatherTemperature>
              </CalendarWeatherContainer>
              : null
            }
          </div>
        </TopCellContainer>

        <CalendarEventsContainer>
          {currentDayEvents.map(event => (
            <ViewEventModal
              key={event.id}
              event={event}
              type={editableEvents.includes(event.type) ? 'opened' : 'closed'}
              isDisabled={isViewEventDisabled()}
            />
          ))}
        </CalendarEventsContainer>
      </CalendarCell>
    );
  });
