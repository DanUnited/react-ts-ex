import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Table from 'antd/es/table';
import { Resizable } from 'react-resizable';
import { useHistory } from "react-router-dom";
import { getColumnsWidth } from "utils/table";

import type { ResizeCallbackData } from 'react-resizable';
import type { ColumnType, TableProps } from 'antd/es/table';

interface IResizeableTitle extends React.HTMLProps<HTMLTableCaptionElement> {
  ref?: any;
  onResize: (e: React.SyntheticEvent, data: ResizeCallbackData) => any | undefined;
  minWidth?: number;
  width?: number;
}

export interface IColumnType extends ColumnType<any> {
  minWidth?: number;
}

const ResizeableTitle = (props: IResizeableTitle) => {
  const { onResize, width, minWidth, ...restProps } = props;

  if (!width || !minWidth) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize} minConstraints={[minWidth, 0]}>
      <th {...restProps} />
    </Resizable>
  );
};

const components = {
  header: {
    cell: ResizeableTitle,
  },
};

export const ResizeTable = (props: TableProps<any>) => {
  const { location } = useHistory();
  const [columnsData, setColumnsData] = useState<IColumnType[]>([]);

  const handleResize = useCallback((index: number) => (e: React.SyntheticEvent, { size }: ResizeCallbackData) => {
    setColumnsData((columns) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };

      localStorage.setItem('table-' + location.pathname, JSON.stringify(nextColumns.map(item => item.width)));
      return nextColumns;
    });
  }, [location]);

  useEffect(() => {
    if (props.columns) {
      setColumnsData(props.columns.map((column, index) => {
        const existData = JSON.parse(localStorage.getItem('table-' + location.pathname) || '{}');

        return {
        ...column,
          width: existData[index] ? existData[index] : column.width,
        }
      }));
    }
  }, [props.columns, location]);

  const columns = useMemo(() => {
    return columnsData.map((col, index) => ({
      ...col,
      onHeaderCell: (column: IColumnType) => ({
        width: column.width,
        minWidth: column.minWidth,
        onResize: handleResize(index),
      }),
    }))
  }, [columnsData, handleResize]);

  const scroll = {
    scrollToFirstRowOnChange: false,
    x: columns.reduce(getColumnsWidth, 0),
  };

  return <Table {...props} columns={columns} components={components} scroll={scroll} />;
}

export default ResizeTable;
