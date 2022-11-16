interface IStatus {
  title: string;
  status: 'ok' | 'error';
}

export const statusList: IStatus[] = [
  {
    title: 'ChronoGolf',
    status: 'ok',
  },
  {
    title: 'Weather.com',
    status: 'ok',
  },
  {
    title: 'Visa Online',
    status: 'ok',
  },
  {
    title: 'Mastercard Online',
    status: 'ok',
  },
  {
    title: 'Authorize.net',
    status: 'ok',
  },
];
