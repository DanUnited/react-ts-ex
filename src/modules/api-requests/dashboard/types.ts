export interface IDashboardSubItem {
  name: string;
  amount: number;
}

export interface IDashboardItem extends IDashboardSubItem {
  subitems?: IDashboardSubItem[];
}

export interface IDashboardUtilization extends IDashboardSubItem {
  totalAmount: number;
  noData: boolean;
}

export interface IDashboardResponse {
  revenue: {
    current: IDashboardItem;
    items: IDashboardItem[];
  },
  utilization: {
    current: IDashboardUtilization;
    items: IDashboardUtilization[];
  };
  visitors: {
    current: IDashboardItem;
    items: IDashboardItem[];
  }
}
