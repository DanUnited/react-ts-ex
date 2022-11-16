import { createAction, createReducer } from '@reduxjs/toolkit';
import { TradeManagerFixture } from './constants';

import type { IRoundList } from 'modules/api-requests/trade-manager/types';

export const tradeRoundsActions = {
  setRounds: createAction<IRoundList>('traderRounds/setRounds'),
};

export const tradeRoundsReducer = createReducer(
  TradeManagerFixture,
  (builder) => {
    builder.addCase(tradeRoundsActions.setRounds, (state, { payload }) => {
      return { ...state, ...payload }
    })
  }
);
