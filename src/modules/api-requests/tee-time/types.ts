import { EventTypesEnum } from 'pages/course-settings/constants';

import type { IMetaResponse } from '../types';

export interface ITeeTime {
  id: string;
  startTime: string; // 06:00
  date: string; // "2022-02-02"
  freeSlots: number;
  hole: number;
  tradeRoundActive: boolean;
  rates: ITeeTimeRate[];
  individual?: ITeeTimeIndividual;
}

export interface ITeeTimeRate {
  id: string;
  basePrice: number;
  price?: number;
  seasonId: string;
  timePeriodId: string;
}

export interface ITeeTimeIndividual {
  id: string;
  courseId: string;
  date: string;
  startTime: string;
  displayed: boolean;
  yieldActive: boolean;
  ratePrices: Array<{ rateId: string; price?: number; teeTimeId: string; }>;
}

export interface IUpdateTeeTime extends Omit<ITeeTime, 'rates'> {
  yieldActive?: boolean;
  displayed?: boolean;
  ratePrices: Array<{ rateId: string; price?: number; }>
}

export interface ITableTeeTime extends Omit<ITeeTime, 'rates'> {
  rates: Record<string, ITeeTimeRate>;
  draft?: boolean;
}
