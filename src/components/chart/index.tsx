import React from 'react';
import Empty from 'antd/es/empty';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more';
import HC_exporting from 'highcharts/modules/exporting';

type Props = {
  options?: Highcharts.Options | null;
  containerClassName?: string;
};

HC_more(Highcharts);
HC_exporting(Highcharts);

const Chart = (props: Props): JSX.Element => {
  const { options, containerClassName } = props;
  const data = options ? options.series : [];

  return (
    <div>
      {data && data.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      {data && data.length > 0 && (
        <HighchartsReact
          containerProps={{ className: containerClassName ?? null }}
          highcharts={Highcharts}
          constructorType="chart"
          allowChartUpdate={true}
          immutable={false}
          updateArgs={[true, true, true]}
          options={options}
        />
      )}
    </div>
  );
};

export default Chart;
