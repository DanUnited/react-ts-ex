import React, { Key, useEffect, useState } from 'react';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import take from 'lodash/take';
import Modal from 'antd/es/modal';
import Table from 'antd/es/table';
import Button from 'antd/es/button';
import takeRight from 'lodash/takeRight';

import { getColumnsWidth } from 'utils/table';
import { selectedTeeTimeColumns } from './columns';
import { Header3 } from 'components/layout/headers';
import { renderColumns } from 'components/table/columns';
import { CalendarModalIcon } from './calendar-modal-icon';
import { FormAdjustmentsBlock } from './form-anjustment-block';
import { HeaderContainer } from 'components/layout/headers/header-container';
import { ButtonsContainer, MainCol, PickerCol, SelectListLabel } from './elements';

import type { FormInstance } from 'antd/es/form/Form';
import type { IServerRate } from 'modules/api-requests/rates/types';
import type { ITableTeeTime } from 'modules/api-requests/tee-time/types';

interface IMassUpdateModal {
  teeTimes?: ITableTeeTime[];
  visible?: boolean;
  rateList?: IServerRate[];
  form: FormInstance;
  onOk?: () => void;
  onCancel?: () => void;
  onVisibleChange: (visible: boolean) => void;
}

const scroll = {
  scrollToFirstRowOnChange: false,
  x: selectedTeeTimeColumns.reduce(getColumnsWidth, 0),
};

export enum MassUpdateEnum {
  Increase = 'Increase',
  Decrease = 'Decrease',
  SetPrice = 'Set price',
}

export const MassUpdateModal = (
  {
    teeTimes,
    visible,
    onVisibleChange,
    onOk,
    onCancel,
    rateList = [],
    form,
  }: IMassUpdateModal) => {
  const [, setSelectedKeys] = useState<Key[]>([]);
  const handleClose = () => onVisibleChange(false);

  const middleOfArray = rateList?.length === 1 ? 1 : Number(rateList?.length / 2);
  const leftColumnRates = take(rateList, middleOfArray);
  const rightColumnRates = takeRight(rateList, rateList?.length - middleOfArray);

  const getDefaultRatePrice = (rateId: string) => teeTimes?.length
    ? teeTimes.find(item => item.rates[rateId]?.basePrice !== undefined)?.rates[rateId].basePrice
    : undefined;

  useEffect(() => {
    if (teeTimes && teeTimes.length) {
      setSelectedKeys(teeTimes.map(item => item.id));
    }
  }, [teeTimes]);

  const handleOk = () => {
    onOk && onOk();
    handleClose();
  };

  const handleCancel = () => {
    onCancel && onCancel();
    handleClose();
  };

  return (
    <>
      <Modal
        title={null}
        footer={null}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save changes"
        destroyOnClose
        width={1400}
        maskTransitionName="none"
      >
        <Row wrap={false}>
          <PickerCol>
            <Row wrap={false}>
              <Col flex="1 0 32px">
                <CalendarModalIcon />
              </Col>
              <Col style={{ margin: '0 16px' }}>
                <Header3>Mass update</Header3>

                <SelectListLabel>
                  Select tee times from list
                </SelectListLabel>

                <Table
                  sticky
                  rowKey="startTime"
                  tableLayout="fixed"
                  dataSource={teeTimes}
                  scroll={teeTimes?.length ? scroll : undefined}
                >
                  {renderColumns(selectedTeeTimeColumns)}
                </Table>
              </Col>
            </Row>
          </PickerCol>

          <MainCol span={16}>
            <HeaderContainer>
              <span>You can increase or decrease each category by entering a dollar amount above and choosing to increase or decrease the value.</span>
            </HeaderContainer>

            <Row gutter={[16, 0]}>
              <Col span={12}>
                {leftColumnRates.map(item => {
                  return (
                    <FormAdjustmentsBlock
                      key={item.id}
                      form={form}
                      visible={visible}
                      rateId={item.id}
                      title={`${item.name} rate adjustments`}
                      defaultValue={getDefaultRatePrice(item.id)}
                    />
                  );
                })}
              </Col>
              <Col span={12}>
                {rightColumnRates.map(item => {
                  return (
                    <FormAdjustmentsBlock
                      form={form}
                      key={item.id}
                      visible={visible}
                      rateId={item.id}
                      title={`${item.name} rate adjustments`}
                      defaultValue={getDefaultRatePrice(item.id)}
                    />
                  );
                })}
              </Col>
            </Row>

            <ButtonsContainer>
              <Button onClick={handleCancel} size="large">Cancel</Button>
              <Button onClick={handleOk} type="primary" size="large">Set prices</Button>
            </ButtonsContainer>
          </MainCol>
        </Row>
      </Modal>
    </>
  );
};
