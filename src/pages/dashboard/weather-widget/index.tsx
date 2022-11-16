import React from 'react';
import moment from 'moment';

import { getConditionIcon } from './utils';
import { Loading } from 'components/loading';
import { StatsContainer } from '../elements';
import { useAppSelector } from 'utils/hooks';
import { Header3 } from 'components/layout/headers';
import { getProfileCourse } from 'models/profile/selectors';
import { useWeatherQuery } from 'modules/api-requests/weather/queries';
import { CurrentDay, HeadBlock, TemperatureBlock, WeatherBlock } from './elements';

export const WeatherWidget = () => {
  const currentDate = moment();
  const currentCourse = useAppSelector(getProfileCourse);
  const { data, isFetching } = useWeatherQuery(currentCourse?.id);

  return (
    <StatsContainer>
      <div>
        <HeadBlock>
          <Header3>Today</Header3>
        </HeadBlock>

        {isFetching
          ? <Loading />
          : data ? (
            <>
              <CurrentDay>{currentDate.format('D')}</CurrentDay>
              <WeatherBlock>{currentDate.format('MMMM')}</WeatherBlock>
              <TemperatureBlock>
                <img src={getConditionIcon(data?.weather?.[0]?.icon)} alt="Cond" />
                <WeatherBlock>
                  {data?.temp ? parseInt(String(data.temp.day), 10).toFixed(0) : '??? '}°F
                </WeatherBlock>
              </TemperatureBlock>
              <WeatherBlock>{data?.weather ? data.weather[0].main : 'No data'}</WeatherBlock>
            </>
          ) : null
        }
      </div>
    </StatsContainer>
  );
};
