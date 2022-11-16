import type { IResponse } from '../types';
import type { DiscountType } from '../time-slot/types';

export interface ICourse {
  [key: string]: any;

  id: string;
  name: string;
  address: string;
  isActive: boolean;
  city: string;
  confirmationEmails?: string;
  subdomain?: string;
  zip?: string;
  timeZone?: string;
  state?: string;
  contactPhone?: string;
  website?: string;
  logoUrl?: string;
  imageUrl?: string;
  users?: Array<{ id: string }>;
  yieldActive: boolean;
  weatherActive: boolean;
  roundPrices?: boolean;
  lastRoundDiscountType?: DiscountType;
  lastRoundDiscount?: number;
  bestPriceActive?: boolean;
  policy: string | null;
  publicInfo: string | null;
  isPublicInfoEnabled: boolean;

  subtractFromPrice?: number;
  transactionFee?: number;
  transactionFeePerPlayer: boolean;
  transactionFeeTrade?: number;
  transactionFeeTradePerPlayer: boolean;

  holes: number;
  nineHolesDuration: number;
}

export interface ICourseResponse extends IResponse<ICourse> {
}

