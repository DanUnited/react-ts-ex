import { defaultAvailableDays } from 'models/rates';
import { DEFAULT_OVERRIDE_DAYS } from 'modules/api-requests/rates/constants';

import type {
  ITradeModel,
  ITradeRound,
  ITradeRoundForm,
  TradeFormModelType
} from 'modules/api-requests/trade-rounds/types';

import type { OverrideDaysType } from 'modules/api-requests/rates/types';

export const defaultTradeRound = {
  isActive: true,
  availableDays: DEFAULT_OVERRIDE_DAYS,
} as unknown as ITradeRound;

export const defaultTradeFormRound: ITradeRoundForm = {
  isActive: true,
  availableDays: defaultAvailableDays,
  startTime: '12:00',
  endTime: '12:00',
  tradeModel: 'both',
  isSpare: false,
  tradeRoundDiscountType: 'Percent',
  popupDiscountType: 'Percent',
  minimalPrices: {} as OverrideDaysType,
  popupDiscounts: {} as OverrideDaysType,
  tradeRoundDiscounts: {} as OverrideDaysType,
  exceptions: [],
  popupMessage: '<p><span class="modal-text">Reap the benefit of savings an EXTRA [DISCOUNT] per person by paying online now!</span></p><p><span class="secondary-text">New price for [RATE] rate</span></p><p><span class="discount-price">[PRICE]</span></p>',
}

export const getTradeModel = (tradeRound?: ITradeModel): TradeFormModelType => {
  if (tradeRound?.tradeRounds) return 'tradeRounds';
  if (tradeRound?.popUp) return 'popUp';

  return 'both';
}

export const convertToTradeModel = (tradeFormModel: TradeFormModelType): ITradeModel => ({
  both: tradeFormModel === 'both',
  popUp: tradeFormModel === 'popUp',
  tradeRounds: tradeFormModel === 'tradeRounds',
});

