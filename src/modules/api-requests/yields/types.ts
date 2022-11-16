export interface IUtilization {
  Sunday?: number | null;
  Monday?: number | null;
  Tuesday?: number | null,
  Wednesday?: number | null,
  Thursday?: number | null,
  Friday?: number | null,
  Saturday?: number | null,
  Holiday?: number | null,
}

export interface IWeekDay {
  from: number;
  to: number;
  ratios: IUtilization;
}

export interface IDayOut {
  from: number;
  to: number;
  ratios: Record<number, number | null>;
}

export interface IYield {
  id?: string;
  courseId?: string;
  rateId: string;
  seasonId: string;
  timePeriodId: string;
  weekDays: IWeekDay[];
  daysOut: IDayOut[];
}

export interface IYieldsFilters {
  rate: string,
  season: string,
  timePeriod: string
}

export interface IGetYieldsRequest {
  rateId: string;
  seasonId: string;
  timePeriodId: string;
  courseId: string;
}
