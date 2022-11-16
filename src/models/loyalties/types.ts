import type { DiscountType } from 'modules/api-requests/time-slot/types';

export interface IPromoCode {
  code: string;
  discount: number;
  discountType: DiscountType;
  used: number;
  maxUsage: number;
  expire: string;
  isActive: boolean;
}
