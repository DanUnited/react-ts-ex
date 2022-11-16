import { renderPresetsInput, renderRangedInput, renderText } from 'components/table/renders';

export const temperatureColumns = [
  {
    id: '1',
    title: 'Degrees',
    dataIndex: 'degrees',
    key: '_degrees',
    sorter: false,
    width: 170,
    render: renderRangedInput,
  },
  {
    id: '2',
    title: 'Percent',
    dataIndex: 'percent',
    key: '_percent',
    sorter: false,
    width: 154,
    render: renderPresetsInput,
  }
];

export const humidityColumns = [
  {
    id: '3',
    title: 'Percent',
    dataIndex: 'percent',
    key: 'percent',
    sorter: false,
    width: 170,
    render: renderRangedInput,
  },
  {
    id: '4',
    title: 'Percent',
    dataIndex: 'value',
    key: 'value',
    sorter: false,
    width: 154,
    render: renderPresetsInput,
  }
];

export const weatherColumns = [
  {
    id: '5',
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    sorter: false,
    width: 170,
    render: renderText,
  },
  {
    id: '6',
    title: 'Percent',
    dataIndex: 'percent',
    key: 'percent',
    sorter: false,
    width: 154,
    render: renderPresetsInput,
  }
];
