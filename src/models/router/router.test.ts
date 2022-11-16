import { routerReducer, initialState } from './index'

test('RouterReducer should return the initial state', () => {
  expect(routerReducer(undefined, { type: '' })).toEqual(initialState);
});
