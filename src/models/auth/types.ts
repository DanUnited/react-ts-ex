import type { Key } from 'react';

export interface IAuthState {
  username: string;
  requiredAttributes?: string[];
}

export interface ISetFieldsAction extends Record<string, Key | Key[]> {
}
