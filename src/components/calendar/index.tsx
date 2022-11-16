import React from 'react';

import { calendarValues } from './constants';
import { defaultAvailableDays } from 'models/rates';
import { CalendarContainer, DayBlock } from './elements';

import type { IAvailableDays } from 'modules/api-requests/rates/types';

interface ICalendarProps {
  size?: 'large' | 'medium';
  value?: IAvailableDays;
  onChange?: (value: IAvailableDays, changedValue: keyof IAvailableDays) => void;
}

export const Calendar = ({ size = 'medium', value = defaultAvailableDays, onChange }: ICalendarProps) => {
  const onCalendarChange = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const currentValue = target.dataset.value as keyof IAvailableDays;

    if (onChange) {
      onChange({
          ...value,
          [currentValue]: !value[currentValue],
        },
        currentValue,
      );
    }
  };

  return (
    <CalendarContainer>
      {calendarValues.map(({ value: dayValue, shortName }) => (
        <DayBlock
          key={dayValue}
          $size={size}
          data-value={dayValue}
          onClick={onCalendarChange}
          $active={value[dayValue]}
        >
          {shortName}
        </DayBlock>
      ))}
    </CalendarContainer>
  );
};
