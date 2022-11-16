import React, { useCallback, useState } from 'react';
import moment from 'moment';
import DatePicker from 'antd/es/date-picker';

import { CalendarIcon } from './calendar-icon';
import { Header6 } from 'components/layout/headers';
import { generateCalendarWeekDays } from './helpers';
import { toUTCFormat, toUTCMoment } from 'utils/date';
import { CalendarDay, TabPane, WeatherDetails, WeatherTab, WeekSelectorContainer } from './elements';

import type { Moment } from 'moment/moment';

interface IWeatherCalendarProps {
  value: Moment | null | undefined;
  onChange?: (key: string) => void;
}

export const WeatherCalendar = ({ onChange, value }: IWeatherCalendarProps) => {
  const [openedPicker, setOpenedPicker] = useState(false);
  const activeTabKey = toUTCFormat(moment(value) || moment(new Date()));
  const [startDay, setStartDay] = useState<Moment | null>(moment(activeTabKey));
  const [disabled, setDisabled] = useState(false);

  const toggleOpenedPicker = useCallback(() => {
    setDisabled(true);
    setTimeout(() => setDisabled(false), 200);
    setOpenedPicker(false);
  }, []);

  const onManualClickTrigger = () => {
    if (!disabled) {
      setOpenedPicker(value => !value);
    }
  };

  const onDataPickerChange = (value: Moment | null) => {
    if (value) {
      const pointedDay = toUTCMoment(moment(value.toDate()));
      setStartDay(pointedDay.startOf('week'));
    }
  }

  const disabledDate = (date: Moment) => date < moment().subtract(1, 'days').endOf('day');

  const extraContent = {
    right: <WeekSelectorContainer>
      <CalendarIcon onClick={onManualClickTrigger} />

      <DatePicker
        disabled={disabled}
        value={startDay}
        picker="week"
        open={openedPicker}
        className="calendar-date-selector"
        onOpenChange={toggleOpenedPicker}
        disabledDate={disabledDate}
        onChange={onDataPickerChange}
      />
    </WeekSelectorContainer>,
  }

  const onTabChange = (activeKey: string) => {
    if (onChange) {
      onChange(activeKey);
    }
  }

  return (
    <WeatherTab
      onChange={onTabChange}
      tabBarExtraContent={extraContent}
      activeKey={activeTabKey}
    >
      {generateCalendarWeekDays(startDay)
        .map(weather => {
          const dayMoment = moment.utc(weather.day);

          return (
            <TabPane
              tab={(
                <>
                  <CalendarDay>{dayMoment.format('dddd')}</CalendarDay>
                  <WeatherDetails>
                    <Header6>{dayMoment.format('MMM D')}</Header6>
                  </WeatherDetails>
                </>
              )}
              key={weather.day}
            />
          )
        })}
    </WeatherTab>
  );
};
