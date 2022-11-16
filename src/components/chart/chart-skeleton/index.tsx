import React from 'react';
import Skeleton from 'antd/es/skeleton';

const ChartSkeleton = (): JSX.Element => {
  return (
    <div>
      <Skeleton active={true} />
    </div>
  );
};

export default ChartSkeleton;
