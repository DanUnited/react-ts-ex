import React from 'react';
import CountUp from 'react-countup';

import { useAppSelector } from 'utils/hooks';
import { Skeleton } from 'components/skeleton';
import { WeatherWidget } from './weather-widget';
import { RenderSubItems } from './render-sub-items';
import { Breadcrumbs } from 'components/breadcrumbs';
import { Header2, Header3 } from 'components/layout/headers';
import { getCurrentCourseId } from 'models/profile/selectors';
import { CircleProgressBar } from 'components/circleProgressBar';
import { useDashboard } from 'modules/api-requests/dashboard/queries';
import { PageHeaderContainer } from 'components/layout/headers/header-container';

import {
  Text,
  Title,
  Container,
  NumberBlock3,
  TodayWrapper,
  InfoContainer,
  NumbersBlock,
  CalendarText,
  CalendarTitle,
  StatsContainer,
  CalendarContainer,
  UtilizationWrapper,
  CircleParentContainer,
} from './elements';

export const DashboardPage = () => {
  const currentCourseId = useAppSelector(getCurrentCourseId);
  const { data, isFetching: isLoading } = useDashboard(currentCourseId);

  return (
    <>
      <PageHeaderContainer>
        <Header2>Dashboard</Header2>
        <Breadcrumbs />
      </PageHeaderContainer>

      <Container>
        <WeatherWidget />

        <StatsContainer>
          <Header3>Utilization</Header3>
          <InfoContainer extraMargin="16px">
            <CircleParentContainer>
              <CircleProgressBar
                value={isLoading
                  ? 0
                  : (data?.utilization.current.amount || 0) / (data?.utilization.current.totalAmount || 1) * 100
                }
                size="large"
              />
              <div>
                <TodayWrapper>
                  {isLoading
                    ? <Header3>Today</Header3>
                    : <Header3>{data?.utilization.current.name}</Header3>}
                </TodayWrapper>
                {!isLoading && data?.utilization?.current.noData
                  ? <CalendarContainer>
                    <span>No data</span>
                  </CalendarContainer>
                  : <CalendarText>
                      <span>
                      {isLoading
                        ? <Skeleton width={20} height={24} />
                        : <span>{data?.utilization.current.amount}</span>}
                      <span>of</span>
                      {isLoading
                        ? <Skeleton width={20} height={24} />
                        : <span>{data?.utilization.current.totalAmount}</span>}
                      </span>

                      <span>tee times sold</span>
                    </CalendarText>
                }
              </div>
            </CircleParentContainer>

            <div style={{ marginTop: 24 }}>
              {isLoading
                ? <UtilizationWrapper extraMargin="0px">
                  <CircleProgressBar value={100} size="small" />
                  <CalendarContainer>
                    <div>
                      <Skeleton width={80} height={16} />
                    </div>

                    <Skeleton width={120} height={18} />
                  </CalendarContainer>
                </UtilizationWrapper>
                : data?.utilization.items.map((item, index) => (
                  <UtilizationWrapper extraMargin={`${index === 0 ? 0 : 20}px`} key={item.name}>
                    <CircleProgressBar value={(item.amount || 0) / (item.totalAmount || 1) * 100} size="small" />
                    <CalendarContainer>
                      <CalendarTitle>{item.name}</CalendarTitle>
                      {item.noData
                        ? <CalendarText style={{ alignItems: 'start' }}>No data</CalendarText>
                        : <CalendarText>{item.amount} of {item.totalAmount} tee times sold</CalendarText>
                      }
                    </CalendarContainer>
                  </UtilizationWrapper>
                ))
              }
            </div>
          </InfoContainer>
        </StatsContainer>

        <StatsContainer style={{ height: 'auto' }}>
          <Header3>Revenue</Header3>
          <InfoContainer>
            <div>
              <NumbersBlock extraMargin="8px">
                {isLoading
                  ? <Skeleton width={80} height={32} style={{ marginTop: 16 }} />
                  : <CountUp
                    prefix="$"
                    start={0}
                    end={data?.revenue?.current?.amount || 0}
                    duration={1}
                    separator=","
                  />
                }

                {isLoading
                  ? <Skeleton width={80} height={24} style={{ marginTop: 16 }} />
                  : <Title>{data?.revenue?.current?.name}</Title>
                }
              </NumbersBlock>

              {isLoading
                ? null
                : data?.revenue.current?.subitems?.map(item => (
                  <NumberBlock3 extraMargin="4px" key={item.name}>
                    <CountUp prefix="$" start={0} end={item.amount} duration={1} separator="," />
                    <Text>{item.name}</Text>
                  </NumberBlock3>
                ))
              }
            </div>

            <RenderSubItems prefix="$" isLoading={isLoading} items={data?.revenue?.items} />
          </InfoContainer>
        </StatsContainer>

        <StatsContainer style={{ height: 'auto' }}>
          <Header3>Visitors</Header3>
          <InfoContainer>
            <div>
              <NumbersBlock>
                {isLoading
                  ? <Skeleton width={80} height={32} style={{ marginTop: 16 }} />
                  :
                  <CountUp start={0} end={data?.visitors?.current?.amount || 0} duration={1} separator="," />
                }

                {isLoading
                  ? <Skeleton width={80} height={24} />
                  : <Title>{data?.visitors?.current?.name}</Title>
                }
              </NumbersBlock>

              {data?.visitors?.current?.subitems?.map(item => (
                <NumberBlock3 extraMargin="4px" key={item.name}>
                  <CountUp start={0} end={item.amount} duration={1} separator="," />
                  <Text>{item.name}</Text>
                </NumberBlock3>
              ))}
            </div>

            <RenderSubItems isLoading={isLoading} items={data?.visitors?.items} />
          </InfoContainer>
        </StatsContainer>
      </Container>
    </>
  );
};
