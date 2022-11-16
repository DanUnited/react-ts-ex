import React from 'react';
import CountUp from 'react-countup';

import { Skeleton } from 'components/skeleton';
import { NumberBlock3, NumbersBlock2, RevenueItem, RevenueItemsContainer, Text, Title } from './elements';

import type { IDashboardItem } from 'modules/api-requests/dashboard/types';

interface IRenderSubItems {
  isLoading?: boolean;
  items?: IDashboardItem[];
  prefix?: string;
}

export const RenderSubItems = ({ isLoading, items, prefix='' }: IRenderSubItems) => (
  <RevenueItemsContainer>
    {isLoading
      ? <RevenueItem>
        <Skeleton width={80} height={24} style={{ marginTop: 16 }} />
        <NumbersBlock2 extraMargin="8px">
          <CountUp prefix={prefix} start={0} end={0} duration={1} separator="," />
        </NumbersBlock2>
      </RevenueItem>
      : items?.map(item => (
        <RevenueItem key={item.name}>
          <NumbersBlock2 extraMargin="8px">
            <CountUp prefix={prefix} start={0} end={item.amount} duration={1} separator="," />

            <Title isSmall>{item.name}</Title>
          </NumbersBlock2>

          {item?.subitems?.map(subItem => (
            <NumberBlock3 extraMargin="4px" key={subItem.name}>
              <CountUp prefix={prefix} start={0} end={subItem.amount} duration={1} separator="," />
              <Text> {subItem.name}</Text>
            </NumberBlock3>
          ))}
        </RevenueItem>
      ))
    }
  </RevenueItemsContainer>
);
