export interface ITimePeriod {
  name: string;
  courseId: string;
  startTime: string;
  endTime: string;
  seasonId: string;
}

export interface IServerTimePeriod extends ITimePeriod {
  id: string;
}

export interface ITimePeriodRequest extends Omit<ITimePeriod, 'courseId' | 'seasonId'> {
  seasonIds: string[];
}
