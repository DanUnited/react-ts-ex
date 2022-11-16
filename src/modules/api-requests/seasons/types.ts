export interface ISeason {
  name: string;
  startDate: string;
  endDate: string;
}

export interface ISeasonResponse extends ISeason {
  id: string;
}
