import React, { useEffect } from 'react';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import uniq from 'lodash/uniq';
import Form from 'antd/es/form';
import Radio from 'antd/es/radio';
import Input from 'antd/es/input';
import isEmpty from 'lodash/isEmpty';
import Divider from 'antd/es/divider';
import Checkbox from 'antd/es/checkbox';
import { useParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';

import { SeasonItem } from './season-item';
import { sortTimePeriods } from 'utils/sort';
import { RateOptions } from './rate-options';
import { Calendar } from 'components/calendar';
import { rateCreatingActions } from 'models/rates';
import { Header3 } from 'components/layout/headers';
import { TimePeriodBlock } from './time-period-block';
import { MainInfoSkeleton } from './main-info-skeleton';
import { RateTableAdaptor } from '../rate-table-adaptor';
import { useCollection } from 'utils/hooks/use-collection';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { getCurrentCourseId } from 'models/profile/selectors';
import { useRateList } from 'modules/api-requests/rates/queries';
import { HeaderContainer, StyledHeader, DividerContainer } from './elements';
import { RATE_NAME_MAX_LENGTH, RATE_DESCRIPTION_MAX_LENGTH } from './constants';
import { childRateSelector, rateEntitySelector } from 'models/rates/selectors';
import { FormCol, FormPlate, RateFormContainer, AvailableDaysTitle, FormBigCol } from '../elements';
import { getRateNameValidators, SeasonsValidatorRules, TimePeriodsValidatorRules } from './validators';

import type { FormInstance } from 'antd/es/form';
import type { ISeasonForm } from 'modules/api-requests/rates/types';
import type { ISeasonResponse } from 'modules/api-requests/seasons/types';
import type { IServerTimePeriod } from 'modules/api-requests/time-period/types';

interface IRateFormStepOne {
  form: FormInstance;
  visible?: boolean;
  seasons?: ISeasonResponse[],
  timePeriods?: IServerTimePeriod[],
  isLoading?: boolean;
}

export const RateFormStepOne = ({ visible, form, timePeriods, seasons, isLoading }: IRateFormStepOne) => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const childRate = useAppSelector(childRateSelector);
  const currentRate = useAppSelector(rateEntitySelector);
  const currentCourseId = useAppSelector(getCurrentCourseId);
  const [activeSeasons, setActiveSeasons, setActiveSeasonsCollection] = useCollection();

  const { data: rateList, isLoading: isRateListLoading } = useRateList(currentCourseId);

  const onSeasonClick = (id: string) => {
    setActiveSeasons(id);
  };

  const onTimePeriodChange = (seasonId: number) =>
    (periods: IServerTimePeriod[]) => {
      dispatch(rateCreatingActions.setRateFormValue({
        path: ['seasons', seasonId, 'timePeriods'],
        value: periods.sort(sortTimePeriods),
      }));
    };

  useEffect(() => {
    if (currentRate) {
      const currentSeasons = uniq(currentRate.prices.map(item => item.seasonId));

      if (currentRate?.id && !isEmpty(currentSeasons) && isEmpty(form.getFieldValue('seasons'))) {
        setActiveSeasonsCollection(currentSeasons);
      }
    }
  }, [currentRate, setActiveSeasonsCollection, form]);

  useEffect(() => {
    const formSeasons = form.getFieldValue('seasons') as ISeasonForm[];

    if (currentRate && seasons && timePeriods) {
      const convertedRate = RateTableAdaptor.toRateTableForm(currentRate, seasons, timePeriods, childRate);

      dispatch(rateCreatingActions.setRateFormFields({
        seasons: seasons
          ?.filter(season => activeSeasons.includes(season.id))
          ?.map(season => {
            const existSeason = convertedRate && convertedRate.seasons?.find(s => s.id === season.id);
            const formSeason = formSeasons && formSeasons.find(s => s.id === season.id);

            return formSeason || existSeason as ISeasonForm || {
              ...season,
              seasonName: season.name,
              seasonDate: [season.startDate, season.endDate],
              timePeriods: [],
            };
          }),
      }));
    } else {
      dispatch(rateCreatingActions.setRateFormFields({
        seasons: seasons
          ?.filter(season => activeSeasons.includes(season.id))
          ?.map(season => {
            const formSeason = formSeasons && formSeasons.find(s => s.id === season.id);

            return formSeason
              ? formSeason
              : {
                ...season,
                seasonName: season.name,
                seasonDate: [season.startDate, season.endDate],
                timePeriods: [],
              };
          }),
      }));
    }
  }, [activeSeasons, form, seasons, currentRate, timePeriods, dispatch, childRate]);

  if (!visible) return null;

  return (
    <RateFormContainer>
      <Row gutter={[32, 32]}>
        <FormCol>
          <FormPlate>
            <Header3>Main information</Header3>

            {(isLoading || isRateListLoading)
              ? <MainInfoSkeleton />
              : (
                <>
                  <Form.Item noStyle name="timePeriods"><Input type="hidden" /></Form.Item>

                  <Form.Item name="name" rules={getRateNameValidators(rateList, Boolean(id))}>
                    <Input placeholder="Rate name" maxLength={RATE_NAME_MAX_LENGTH} size="large" />
                  </Form.Item>

                  <Form.Item name="description" rules={[
                    { required: true, message: 'Enter rate description' },
                  ]}>
                    <TextArea
                      autoSize={{ minRows: 6, maxRows: 6 }}
                      maxLength={RATE_DESCRIPTION_MAX_LENGTH}
                      placeholder="Rate description"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item name="useTransactionFee" valuePropName="checked">
                    <Checkbox>Transaction fee</Checkbox>
                  </Form.Item>

                  <AvailableDaysTitle>Rate options</AvailableDaysTitle>

                  <Form.Item name="options">
                    <RateOptions />
                  </Form.Item>

                  <Form.Item name="holes">
                    <Radio.Group>
                      <Radio value={18}>18 holes walking</Radio>
                      <Radio value={9}>9 holes walking</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <AvailableDaysTitle>Available days</AvailableDaysTitle>

                  <Form.Item name="availableDays" shouldUpdate>
                    <Calendar />
                  </Form.Item>
                </>
              )}
          </FormPlate>
        </FormCol>

        <FormBigCol>
          <FormPlate>
            <Header3>Seasons and time periods</Header3>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <HeaderContainer>
                  <StyledHeader>Select seasons for rate</StyledHeader>
                </HeaderContainer>

                <DividerContainer>
                  <Divider orientation="left">List of seasons</Divider>
                </DividerContainer>

                {seasons?.map(season => (
                  <SeasonItem
                    value={season}
                    key={season.id}
                    onClick={onSeasonClick}
                    active={activeSeasons.includes(season.id)}
                  />
                ))}

                <Form.List
                  name="seasons"
                  rules={SeasonsValidatorRules}
                >
                  {(fields, operations, { errors }) => (
                    <>
                      <Form.ErrorList errors={errors} />
                    </>
                  )}
                </Form.List>
              </Col>

              <Col span={12}>
                <HeaderContainer>
                  <StyledHeader>Select time periods for seasons</StyledHeader>
                </HeaderContainer>

                <Form.List name="seasons">
                  {(_seasons) => (
                    <>
                      {_seasons.map((seasonField) => (
                        <Form.Item {...seasonField}>
                          <Form.Item
                            name={[seasonField.key]}
                            rules={TimePeriodsValidatorRules}
                          >
                            <TimePeriodBlock
                              seasonList={seasons}
                              timePeriodsList={timePeriods}
                              onTimePeriodsChange={onTimePeriodChange(seasonField.key)}
                            />
                          </Form.Item>
                        </Form.Item>
                      ))}
                    </>
                  )}
                </Form.List>
              </Col>
            </Row>
          </FormPlate>
        </FormBigCol>
      </Row>
    </RateFormContainer>
  );
};
