import type { RootState } from 'modules/store/types';

export const getAuthState = (state: RootState) => state.auth;
