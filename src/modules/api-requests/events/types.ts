import { EventTypesEnum } from 'pages/course-settings/constants';

export interface ICalendarEvent {
  id?: string;
  courseId: string;
  date: string;
  type: EventTypesEnum;
  isClosed: boolean;
  description?: string;
  startTime?: string;
  endTime?: string;
}

export interface ICalendarEventResponse extends ICalendarEvent {
  id: string;
}
