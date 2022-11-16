import { connectRouter, LOCATION_CHANGE, routerMiddleware } from 'connected-react-router';
import { createReducer } from '@reduxjs/toolkit'
import { createBrowserHistory } from 'history';

import type { Location } from 'history';
import type { RouterState } from 'connected-react-router';

export const history = createBrowserHistory();

export interface IRouterState extends RouterState {
  prevLocation: Location;
}

const emptyLocation = {
  pathname: '/',
  search: '',
  hash: '',
  key: '',
  state: {},
  query: {},
};

export const initialState: IRouterState = {
  action: 'PUSH',
  location: emptyLocation,
  prevLocation: emptyLocation,
};

export const routerReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(LOCATION_CHANGE, (state, action) => {
        const updatedState = connectRouter(history)(state, action);

        return {
          ...updatedState,
          prevLocation: state.location,
        };
      })
  }
)

export const routingMiddleware = routerMiddleware(history);

export default routerReducer;
