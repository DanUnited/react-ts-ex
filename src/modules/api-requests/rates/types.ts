import type { DiscountType } from '../time-slot/types';

export type OverrideDaysType = Record<WeekDayType, number | undefined>;

export interface IAvailableDays {
  Sunday: boolean;
  Monday: boolean;
  Tuesday: boolean,
  Wednesday: boolean,
  Thursday: boolean,
  Friday: boolean,
  Saturday: boolean,
  Holiday: boolean,
}

export type WeekDayType = keyof IAvailableDays;

export interface IRateOption {
  id?: string;
  name: string;
  description: string;
}

export interface IRatePrice {
  rateId: string;
  seasonId: string;
  timePeriodId: string;
  pricesWeekDay: OverrideDaysType;
}

export interface IRatePriceOverwrites {
}

export interface IRate {
  id?: string;
  name: string;
  isActive: boolean;
  description: string;
  options: IRateOption[];
  availableDays: IAvailableDays;
  prices: IRatePrice[];
  useTransactionFee: boolean;
  holes: number;
}

export interface IServerRate extends IRate {
  id: string;
}

export interface IPeriodForm {
  id?: string;
  seasonId: string;
  timePeriodName: string;
  startTime: string;
  endTime: string;
  overrideDays: OverrideDaysType;
}

export interface ISeasonForm {
  id?: string;
  seasonName: string;
  seasonDate: [string, string];
  timePeriods: IPeriodForm[];
}

export interface IRateTableForm {
  id?: string;
  name: string;
  holes: number;
  description: string;
  isActive?: boolean;
  useTransactionFee?: boolean;
  options: Array<IRateOption & { value?: boolean }>;
  availableDays: IAvailableDays;
  seasons?: ISeasonForm[];
  tempOverrideDays?: OverrideDaysType[];
}

export interface IRemoveRates {
  ids: string[];
}

export interface IChildRate {
  rateId: string;
  name: string;
  description: string;
  discountType: DiscountType;
  discount: number;
}
