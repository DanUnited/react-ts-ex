import moment from 'moment';

interface ITimePeriod {
  courseId?: string;
  periodName?: string;
  startTime: string;
  endTime: string;
  seasonId: string;
}

export const sortTimePeriods = (a: ITimePeriod, b: ITimePeriod) => {
  const startFirst = moment(`01/01/1970 ${a.startTime}`);
  const startSecond = moment(`01/01/1970 ${b.startTime}`);
  const endFirst = moment(`01/01/1970 ${a.endTime}`);
  const endSecond = moment(`01/01/1970 ${b.endTime}`);

  return startFirst.diff(startSecond) > 0 ? 1 : 
    startFirst.diff(startSecond) < 0 ? -1 :
      endFirst.diff(endSecond) > 0 ? 1 :
        endFirst.diff(endSecond) < 0 ? -1 : 0
}
