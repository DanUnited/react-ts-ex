import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducer } from 'models/auth';
import { usersReducer } from 'models/users';
import { yieldsReducer } from 'models/yields';
import { profileReducer } from 'models/profile';
import { coursesReducer } from 'models/courses';
import { rateCreatingReducer } from 'models/rates';
import { tableMetaReducer } from 'models/table-meta';
import { courseCouponsReducer } from 'models/coupons';
import { tradeRoundsReducer } from 'models/trade-rounds';
import { taxReducer, taxMiddleware } from 'models/taxes';
import { courseReservationsReducer } from 'models/reservations';
import { routingMiddleware, routerReducer } from 'models/router';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['profile', 'auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  taxes: taxReducer,
  router: routerReducer,
  yields: yieldsReducer,
  profile: profileReducer,
  tradeRounds: tradeRoundsReducer,
  tableMeta: tableMetaReducer,
  courses: coursesReducer,
  rateCreating: rateCreatingReducer,
  users: usersReducer,
  reservations: courseReservationsReducer,
  coupons: courseCouponsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat([routingMiddleware, taxMiddleware]),
});

setupListeners(store.dispatch);
