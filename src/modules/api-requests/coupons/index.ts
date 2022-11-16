import axios from 'modules/api-client/request';
import { handleAmazonMessage } from 'modules/api-client/response';

import type {
  ICoupon,
  IGetCouponsRequest,
  IDeleteCouponsRequest,
  ICreateCouponsRequest,
  IUpdateCouponActivityRequest,
} from './types';
import type { IMetaResponse } from '../types';
import type { IListMeta } from 'models/types';

export const getCourseCouponsRequest = ({ courseId, ...params }: IGetCouponsRequest) => {
  return axios
    .get<void, IMetaResponse<ICoupon[], IListMeta>>(`/admin/courses/${courseId}/coupon`, { params })
    .catch(handleAmazonMessage);
};

export const createCourseCouponsRequest = ({ courseId, data }: ICreateCouponsRequest) => {
  return axios
    .post<ICoupon, ICoupon>(`/admin/courses/${courseId}/coupon`, data)
    .catch(handleAmazonMessage);
};

export const updateCourseCouponsActivityRequest = ({ courseId, data }: IUpdateCouponActivityRequest) => {
  return axios
    .post<void, Omit<IUpdateCouponActivityRequest, 'courseId'>>(`/admin/courses/${courseId}/coupon/batch-update`, data)
    .catch(handleAmazonMessage);
};

export const deleteCourseCouponsRequest = ({ courseId, data }: IDeleteCouponsRequest) => {
  return axios
    .post<void, Omit<IDeleteCouponsRequest, 'courseId'>>(`/admin/courses/${courseId}/coupon/batch-delete`, data)
    .catch(handleAmazonMessage);
};
