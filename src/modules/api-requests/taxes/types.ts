import type { DiscountType } from '../time-slot/types';

export interface IServerTax {
  id: string;
  name: string;
  amount: number | null;
  readonly editable: boolean;
}

export interface ITax extends Omit<IServerTax, 'amount'> {
  amount?: number;
}

export interface IServerFee {
  id: string;
  name: string;
  amountType: DiscountType;
  taxes: Array<{ id: string }>;
  amount: number | null;
  readonly editable: boolean;
}

export interface IFee extends Omit<IServerFee, 'amount' | 'id'> {
  id?: string;
  amount?: number;
}
