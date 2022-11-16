import type { IFee, ITax } from 'modules/api-requests/taxes/types';

export const defaultTaxesList: ITax[] = [
  { id: '1', name: 'State Tax', amount: undefined, editable: false },
  { id: '2', name: 'City Tax', amount: undefined, editable: false },
  { id: '3', name: 'optional1', amount: undefined, editable: true },
  { id: '4', name: 'optional2', amount: undefined, editable: true },
];

export const defaultFeeList: IFee[] = [
  { id: '5', name: 'Cart fee', taxes: [], amount: undefined, editable: false, amountType: 'Dollar' },
  { id: '6', name: 'Green fee', taxes: [], amount: undefined, editable: false, amountType: 'Dollar' },
  { id: '7', name: 'optional1', taxes: [], amount: undefined, editable: true, amountType: 'Dollar' },
  { id: '8', name: 'optional2', taxes: [], amount: undefined, editable: true, amountType: 'Dollar' },
];
