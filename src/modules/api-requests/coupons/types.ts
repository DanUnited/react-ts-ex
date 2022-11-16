import type { IListMeta } from 'models/types';
import type { IAvailableDays } from "modules/api-requests/rates/types";
import type { DiscountType } from "modules/api-requests/time-slot/types";

export interface ICoupon {
  id: string;
  code?: string;
  isActive: boolean;
  discountAmount: number;
  maxUsage?: number;
  discountType: DiscountType;
  availableDays: IAvailableDays;
  startTime?: string;
  endTime?: string;
  startDate?: string;
  endDate?: string;
  isPromo: boolean;
  perPlayer: boolean;
  allowMultipleUsage: boolean;
  allowTradeRound: boolean;
  notes?: string;
  usage?: number;
  numOfCoupons: number;
}

export interface IGetCouponsRequest extends IListMeta {
  courseId: string;
}

export interface ICreateCouponsRequest extends IGetCouponsRequest {
  data: Omit<ICoupon, 'id'>;
}

export interface ICourseCouponsFilter {
  search?: string;
}

export interface IDeleteCouponsRequest {
  courseId: string;
  data: {
    ids: string[];
  }
}

export interface IUpdateCouponActivityRequest {
  courseId: string;
  data: {
    ids: string[];
    data: { isActive: boolean };
  }
}
