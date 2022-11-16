import React from 'react';

import { periodDate } from './constants';
import { Clock, Trash, Vector2 } from 'components/icons';
import { Edit } from 'components/icons/edit';
import { CloseIcon, EditIcon, PeriodControl, Date, DateContainer, Icon, Name, PeriodContainer, VectorIcon } from './elements';

import type { IServerTimePeriod } from 'modules/api-requests/time-period/types';

interface ITimePeriodProps {
  selected?: boolean;
  value?: IServerTimePeriod;
  onClickCallback?: () => void;
  onCloseCallback?: () => void;
  onEditCallback?: () => void;
}

export const TimePeriod = ({ value, selected, onCloseCallback, onClickCallback, onEditCallback }: ITimePeriodProps) => {
  if (!value) return null;

  const { name, startTime, endTime } = value;

  return (
    <PeriodContainer
      $selected={selected}
      onClick={onClickCallback}
      className="period-container"
    >
      <div>
        <Name $selected={selected}>{name}</Name>
        <DateContainer>
          <Icon $selected={selected}>
            <Clock />
          </Icon>
          <Date $selected={selected}>{periodDate(startTime)} - {periodDate(endTime)}</Date>
        </DateContainer>
      </div>
      <PeriodControl>
        {onEditCallback && (
          <EditIcon onClick={onEditCallback}>
            <Edit />
          </EditIcon>
        )}
        {onCloseCallback && (
          <CloseIcon onClick={onCloseCallback}>
            <Trash />
          </CloseIcon>
        )}
      </PeriodControl>
      {selected && (
        <VectorIcon>
          <Vector2 />
        </VectorIcon>
      )}
    </PeriodContainer>
  );
}
