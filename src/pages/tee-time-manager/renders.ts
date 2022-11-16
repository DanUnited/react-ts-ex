import { renderText } from 'components/table/renders';

export const renderPlayersCount = (value: number) =>
  renderText(value <= 1 ? String(value) : `1 - ${value}`);
