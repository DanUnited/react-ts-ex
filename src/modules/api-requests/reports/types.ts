export interface ICourseReportItem {
  'id': string,
  'price': number,
  'state': 'arrived' | 'noshow' | 'reserved',
  'created_at': string,
  'updated_at': string,
  'cancelled_at': string | null,
  'paid': boolean,
  'isTournament': boolean,
  'green_fee': number | null,
  'cart_fee': number | null,
  'extra_fee': number | null,
  'kit_fee': number | null,
  'subtotal': number | null,
  'date': string, // 2021-08-02
  'startTime': string; // "08:00"
}

export interface IReportTab {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
}

export interface IReport {
  url: string;
  parameters: {
    courseId: string;
    from?: string;
    to?: string;
  };
}

export interface IReportSettings {
  goalFBRevenue: number;
  goalGreenFeeRevenue: number;
  goalMerchandiseRevenue: number;
  goalRangeRevenue: number;
  goalTournamentRevenue: number;
  goalTradeRoundRevenue: number;
}

export interface IReportParams {
  fromDate: string;
  toDate: string;
}
