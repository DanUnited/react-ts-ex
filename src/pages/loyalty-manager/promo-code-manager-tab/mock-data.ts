import moment from 'moment';
import { ServerDateFormat } from 'utils/date';

import type { IPromoCode } from 'models/loyalties/types';

const generateCoupon = () => {
  const length = 8;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];

  return result.substr(0, 4) + '-' + result.substr(4);
}

export const mockedPromoCodes: IPromoCode[] = [
  ...(new Array(15))
    .fill(null)
    .map((_, index) => {
      return {
        code: generateCoupon(),
        expire: moment(new Date()).add(index, 'days').format(ServerDateFormat),
        discount: 5.00,
        discountType: 'Dollar' as const,
        isActive: true,
        maxUsage: 100,
        used: 25 + index,
      }
    })
];
