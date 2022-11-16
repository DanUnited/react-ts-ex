import React from 'react';
import { push } from 'connected-react-router';

import { HistoryLink } from './elements';
import { PathCreator, RoutePaths } from 'routing/constants';

import type { AppDispatch } from 'modules/store/types';

export const RenderHistoryLink = (dispatch: AppDispatch) =>
  (id: string): React.ReactElement => {
    const goToHistory = (): void => {
      dispatch(push(PathCreator[RoutePaths.MEMBER_BOOKING_HISTORY].getUrl(id)));
    };

    return (
      <HistoryLink onClick={goToHistory} className="disabled">View History</HistoryLink>
    );
  };
