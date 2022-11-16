import set from 'lodash/set';
import { createAction, createReducer } from '@reduxjs/toolkit';
import { DEFAULT_OVERRIDE_DAYS } from 'modules/api-requests/rates/constants';

import type { Key } from 'react';
import type { IChildRate, IServerRate, IRateTableForm, IAvailableDays } from 'modules/api-requests/rates/types';

interface IRateState {
  postChanges: {
    availableDays?: IAvailableDays;
  },
  form: IRateTableForm;
  rate?: IServerRate;
  childRate?: IChildRate;
}

export const defaultAvailableDays = {
  Sunday: false,
  Monday: false,
  Tuesday: false,
  Wednesday: false,
  Thursday: false,
  Friday: false,
  Saturday: false,
  Holiday: false,
};

export const initialRateState: IRateState = {
  postChanges: {
    availableDays: undefined,
  },
  form: {
    name: '',
    description: '',
    isActive: true,
    holes: 18,
    availableDays: defaultAvailableDays,
    options: [],
    tempOverrideDays: [DEFAULT_OVERRIDE_DAYS],
  },
};

export const rateCreatingActions = {
  resetRateState: createAction('rateCreating/resetRate'),
  setRatePostChanges: createAction<typeof initialRateState.postChanges>('rateCreating/setRatePostChanges'),
  setRateFormFields: createAction<Partial<IRateTableForm>>('rateCreating/setRateFormFields'),
  setRateFormValue: createAction<{ path: Key[], value: unknown }>('rateCreating/setRateFormValue'),
  setRate: createAction<IServerRate>('rateCreating/setRate'),
  setChildRate: createAction<IChildRate>('rateCreating/setChildRate'),
  resetChildRate: createAction('rateCreating/resetChildRate'),
};

export const rateCreatingReducer = createReducer(
  initialRateState,
  (builder => {
    builder
      .addCase(rateCreatingActions.resetRateState, (state) => ({
        ...initialRateState,
        childRate: state.childRate,
      }))
      .addCase(rateCreatingActions.setRateFormFields, (state, { payload }) => {
        state.form = {
          ...state.form,
          ...payload,
        };
      })
      .addCase(rateCreatingActions.setRate, (state, { payload }) => {
        state.rate = payload;
      })
      .addCase(rateCreatingActions.setRateFormValue, (state, { payload: { path, value } }) => {
        set(state, ['form', ...path], value);
      })
      .addCase(rateCreatingActions.setChildRate, (state, { payload }) => {
        state.childRate = payload;
      })
      .addCase(rateCreatingActions.setRatePostChanges, (state, { payload }) => {
        state.postChanges = payload;
      })
      .addCase(rateCreatingActions.resetChildRate, (state) => {
        state.childRate = undefined;
      });
  }),
);
