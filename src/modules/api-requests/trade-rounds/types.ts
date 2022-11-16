import type { IAvailableDays, OverrideDaysType } from 'modules/api-requests/rates/types';

export type TradeRoundDiscountType = 'Dollar' | 'Percent';

export interface ITradeModel {
  tradeRounds: boolean;
  popUp: boolean;
  both: boolean;
}

export interface ITradeRound {
  id?: string;
  rateId?: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
  isSpare: boolean;
  tradeRoundDiscountType: TradeRoundDiscountType;
  popupDiscountType: TradeRoundDiscountType;

  minimalPrices: OverrideDaysType;
  tradeRoundDiscounts: OverrideDaysType;
  popupDiscounts: OverrideDaysType;
  popupMessage?: string;

  availableDays: IAvailableDays;
  tradeModel: ITradeModel;
  isDeleted?: boolean;

  exceptions: ITradeRoundExceptionTimeSlot[];
}

export interface ITradeRoundExceptionTimeSlot {
  id: string;
  trade: boolean;
  price?: number;
  startTime: string;
  endTime: string;
  tradeRoundId: string;
}

export interface ITradeRoundException {
  id: string;
  amountPlayers: number;
  price: number;
  basePrice: number;
  startTime: string;
  trade: boolean;
  tradeModel: ITradeModel;
  tradeRoundId: string;
  yield: boolean;
}

export interface ITradeRoundsExceptionChange {
  id?: string;
  courseId: string;
  date: string;
  trade: boolean;
  price?: number;
}

export type TradeFormModelType = 'tradeRounds' | 'popUp' | 'both';

export interface ICourseTradeSettings {
  tradeDayLimit?: number;
  tradeWeekLimit?: number;
  tradeMonthLimit?: number;
}

export interface ITradeRoundForm extends Omit<ITradeRound, 'tradeModel'> {
  tradeModel: TradeFormModelType;
}
