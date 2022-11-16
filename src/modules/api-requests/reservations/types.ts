import type { IListMeta } from 'models/types';

export interface ICourseReservation {
  id: string;
  complete: boolean;
  createdAt: string;
  status: "BOOKED";
  teeTimeId: string;
  updatedAt: string;
  userCreated: string;
  date: string;
  startTime: string;
  price: number;
  reference: string;
  paymentType: number;
  players?: Array<{ firstName: string, lastName: string, rateId: string }>;
}

export interface ICourseReservationFilter {
  search?: string;
}

export interface ICourseReservationRequest extends IListMeta {
  courseId: string;
}
