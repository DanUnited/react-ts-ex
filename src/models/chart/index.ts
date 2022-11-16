export type IChartSerieType = 'column';

export type YAxisType = 0 | 1;

export interface IChartSerieOption {
  type: IChartSerieType;
  name: string;
  tooltip?: {
    valueSuffix: string;
  };
  yAxis: YAxisType;
  data: number[];
}
