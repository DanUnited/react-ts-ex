import React from 'react';
import Form from 'antd/es/form';
import { TableSeasonPrices } from './table-season-prices';

import type { FormInstance } from 'antd/es/form/Form';

interface IFullPricesProps {
  visible?: boolean;
  form: FormInstance;
}

export const FullPrices = ({ visible, form }: IFullPricesProps) => {
  if (!visible) return null;

  return (
    <Form.List name="seasons">
      {(seasonFields) => (
        <>
          {seasonFields.map(seasonField => (
            <Form.Item {...seasonField} hidden={!visible}>
              <TableSeasonPrices fieldKey={seasonField.key} form={form} />
            </Form.Item>
          ))}
        </>
      )}
    </Form.List>
  )
};
