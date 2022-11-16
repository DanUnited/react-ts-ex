import React, { useEffect, useState } from 'react';

import Space from 'antd/es/space';
import Button from 'antd/es/button';
import { PaginationSelect } from './elements';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import type { SizeType } from 'antd/es/config-provider/SizeContext';

interface ICursorPaginationData {
  token?: string | null;
  pageSize?: number;
}

interface ICursorPagination {
  size?: SizeType;
  search?: string;
  paginationData: ICursorPaginationData;
  onChange: (data: ICursorPaginationData) => void;
}

export const CursorPagination = ({ paginationData, onChange, size, search }: ICursorPagination) => {
  const [prevEvaluatedKeys, setPrevEvaluatedKeys] = useState<Array<string | null>>([]);
  const [currentEvaluatedKey, setCurrentEvaluatedKey] = useState<string | null>(null);
  const [buttonStyle, setButtonStyle] = useState({});
  const { token, pageSize } = paginationData;

  const popEvaluatedKey = () => {
    const prevEvaluatedKey = prevEvaluatedKeys.pop();
    setCurrentEvaluatedKey(prevEvaluatedKey || null);
    return prevEvaluatedKey;
  };

  const pushEvaluatedKey = (evaluatedKey: string | undefined | null) => {
    setPrevEvaluatedKeys([...prevEvaluatedKeys, currentEvaluatedKey]);
    setCurrentEvaluatedKey(evaluatedKey || null);

    return evaluatedKey;
  };

  useEffect(() => {
    switch (size) {
      case 'small':
        setButtonStyle({ padding: '0 4px', height: '24px' });
        break;
      default:
        setButtonStyle({ padding: '0 7px', height: '28px' });
        break;
    }
  }, [size]);

  useEffect(() => {
    setPrevEvaluatedKeys([]);
  }, [search]);

  return (
    <Space direction="horizontal">
      <Button
        tabIndex={-1}
        size={size}
        disabled={!prevEvaluatedKeys.length && prevEvaluatedKeys.length <= 1}
        style={buttonStyle}
        onClick={() => onChange({
          token: popEvaluatedKey(),
        })}
      >
        <LeftOutlined />
      </Button>

      <Button
        tabIndex={-1}
        size={size}
        disabled={!token}
        style={buttonStyle}
        onClick={() => onChange({
          token: pushEvaluatedKey(token),
          pageSize,
        })}
      >
        <RightOutlined />
      </Button>

      <PaginationSelect
        value={pageSize}
        onChange={(value) => {
          onChange({
            token: token,
            pageSize: value as number,
          });
        }}>
        <PaginationSelect.Option value={10}>10</PaginationSelect.Option>
        <PaginationSelect.Option value={15}>15</PaginationSelect.Option>
        <PaginationSelect.Option value={30}>30</PaginationSelect.Option>
        <PaginationSelect.Option value={60}>60</PaginationSelect.Option>
      </PaginationSelect>
    </Space>
  );
};
