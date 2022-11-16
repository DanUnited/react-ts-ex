import React from 'react';
import Table from 'antd/es/table';
import Text from 'antd/es/typography/Text';

interface ITableSummaryRecords {
  total?: number;
  startIndex?: number;
}

export const TableSummaryRecords = ({ total = 0, startIndex = 0 }: ITableSummaryRecords) => {
  return (
    <Table.Summary.Row>
      {Array(startIndex).fill(null).map((item, index) =>
        <Table.Summary.Cell key={index} index={index} children={null} />
      )}

      <Table.Summary.Cell index={startIndex}>
        <Text strong>Total:</Text>
      </Table.Summary.Cell>

      <Table.Summary.Cell index={startIndex + 1}>
        <Text strong>{total} records</Text>
      </Table.Summary.Cell>
    </Table.Summary.Row>
  )
}
