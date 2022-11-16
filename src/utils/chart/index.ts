import Highcharts from 'highcharts';
import type { IChartSerieOption } from 'models/chart';

export interface ChartOptionsConfig {
  title?: string;
  subTitle?: string;
  seriesOptions: IChartSerieOption[];
  xAxisOptions: string[];
  yAxisNamePrimary?: string;
  yAxisNameSecondary?: string;
  tooltipEnabled?: boolean;
  seriesMarkerEnabled?: boolean;
  dataLabelsEnabled?: boolean;
  yAxisPrimaryLabelSuffix?: string;
  yAxisSecondaryLabelSuffix?: string;
  xAxisName?: string;
  xAxisLabelSuffix?: string;
  xAxisTickInterval?: number;
  credits?: string;
}

const getChartOptions = (config: ChartOptionsConfig): Highcharts.Options => {
  const {
    title = '',
    subTitle = '',
    seriesOptions,
    xAxisOptions,
    yAxisNamePrimary = '',
    yAxisNameSecondary = '',
    tooltipEnabled = true,
    seriesMarkerEnabled = false,
    dataLabelsEnabled = false,
    yAxisPrimaryLabelSuffix = '',
    yAxisSecondaryLabelSuffix = '',
    xAxisName = '',
    xAxisLabelSuffix = '',
    xAxisTickInterval = 1,
    credits = '',
  } = config;

  return {
    chart: {
      zoomType: 'xy',
    },
    title: {
      text: title,
      align: 'left',
    },
    subtitle: {
      text: subTitle,
      align: 'left',
    },
    legend: {
      enabled: true,
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
      maxHeight: 52,
      itemDistance: 10,
      margin: 4,
      padding: 8,
      itemStyle: {
        color: '#333333',
        cursor: 'pointer',
        fontSize: '10px',
        fontWeight: 'normal',
        textOverflow: 'ellipsis',
      },
    },
    tooltip: {
      enabled: tooltipEnabled,
      shared: true,
      useHTML: true,
      formatter: function () {
        return (
          this.points &&
          this.points.reduce(function (s, point) {
            return s + '<br/>' + point.series.name + ': ' + point.y;
          }, '<b>' + this.x + '</b>')
        );
      },
    },
    credits: {
      enabled: true,
      position: {
        align: 'left',
        y: -5,
      },
      href: '',
      text: credits,
    },
    plotOptions: {
      series: {
        marker: {
          enabled: seriesMarkerEnabled,
        },
      },
      column: {
        dataLabels: {
          enabled: dataLabelsEnabled,
        },
      },
    },
    xAxis: {
      title: {
        text: xAxisName,
      },
      labels: {
        overflow: 'justify',
        style: {
          color: '#666666',
          cursor: 'default',
          fontSize: '10px',
        },
        formatter: function () {
          const dateUpdated = this.value as string;
          return `${dateUpdated}${xAxisLabelSuffix}`;
        },
      },
      categories: xAxisOptions.length > 0 ? xAxisOptions : [],
      crosshair: true,
      showLastLabel: true,
      tickInterval: xAxisTickInterval,
    },
    yAxis: [
      {
        title: {
          text: yAxisNamePrimary,
        },
        labels: {
          overflow: 'justify',
          format: `{value}${yAxisPrimaryLabelSuffix}`,
        },
        opposite: false,
        allowDecimals: false,
      },
      {
        title: {
          text: yAxisNameSecondary,
        },
        labels: {
          overflow: 'justify',
          format: `{value}${yAxisSecondaryLabelSuffix}`,
        },
        opposite: true,
      },
    ],
    series: seriesOptions.length > 0 ? seriesOptions : [],
  };
};

export const ChartUtils = {
  getChartOptions,
};
