import React, { useState } from 'react';
import moment from 'moment';
import Spin from 'antd/es/spin';

import {
  CardWrapper,
  Name,
  Date,
  Icon,
  FlexContainer,
  DateContainer,
  CardContainer
} from './elements';

import { weekFormat } from 'utils/date';
import { Edit } from 'components/icons/edit';
import { TimeTable2, Trash } from 'components/icons';
import { getConfirmAction } from 'components/modal/confirm';

import type { ButtonProps } from 'antd/es/button';
import type { ISeasonResponse } from 'modules/api-requests/seasons/types';

const okButtonProps = { danger: true, size: 'large' } as ButtonProps;
const cancelButtonProps = { size: 'large' } as ButtonProps;

interface ISeasonCard extends ISeasonResponse {
  loading?: boolean;
  onRemove: (id: string) => void;
  onEdit: (seasonName: string, startDate: string, endDate: string, id: string) => void;
}

export const SeasonCard = ({ id, name, startDate, endDate, onRemove, onEdit, loading }: ISeasonCard) => {
  const [isEdit] = useState(false);

  const onRemoveHandler = (): void => {
    onRemove(id);
  };

  const onEditHandler = (): void => {
    onEdit(name, startDate, endDate, id);
  };

  const onCallRemoveConfirmation = (): void => {
    getConfirmAction({
      title: 'Are you sure you want to delete this season',
      action: onRemoveHandler,
      okText: 'Confirm',
      cancelText: 'Cancel',
      width: 648,
      okButtonProps: okButtonProps,
      cancelButtonProps: cancelButtonProps,
    });
  };

  return (
    <CardContainer>
      <CardWrapper $isEdit={isEdit}>
        <div>
          <Name $isEdit={isEdit}>{name}</Name>
          <DateContainer $isEdit={isEdit}>
            <TimeTable2 width={16} height={16} />
            <Date $isEdit={isEdit}>
              {moment(startDate).format(weekFormat)} - {moment(endDate).format(weekFormat)}
            </Date>
          </DateContainer>
        </div>
        <FlexContainer>
          <Icon $backgroundless={isEdit} $isEdit={false} onClick={onEditHandler}>
            <Edit width={16} height={16} />
          </Icon>
          <Icon $backgroundless={isEdit} $isEdit={false} onClick={onCallRemoveConfirmation}>
            {loading
              ? <Spin size="small" />
              : <Trash width={16} height={16} />}
          </Icon>
        </FlexContainer>
      </CardWrapper>
    </CardContainer>
  )
};
