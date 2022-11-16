import { createSelector } from 'reselect';

import type { RootState } from 'modules/store/types';

export const rateStateSelector = (state: RootState) => state.rateCreating;

export const rateFormSelector = createSelector(rateStateSelector, state => state.form);

export const childRateSelector = createSelector(rateStateSelector, state => state.childRate);

export const rateEntitySelector = createSelector(rateStateSelector, state => state.rate);

export const ratePostChangesSelector = createSelector(rateStateSelector, state => state.postChanges);
