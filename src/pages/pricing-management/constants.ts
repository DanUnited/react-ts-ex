import { ValueOf } from 'routing/constants';

export enum PriceManagementTabsEnum {
  RATE = 'rates',
  YIELD = 'yields',
  WEATHER = 'weather',
}

export type PriceManagementTabType = ValueOf<PriceManagementTabsEnum>
