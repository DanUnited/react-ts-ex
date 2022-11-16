import React from 'react';

import { StyledSkeleton } from './elements';

interface ISkeleton extends React.HTMLAttributes<HTMLDivElement> {
  width?: number | string;
  height?: number | string;
}

export const Skeleton = ({ width = '100%', height = '100%', ...props }: ISkeleton): React.ReactElement => (
  <StyledSkeleton
    $width={Number.isInteger(width) ? `${width}px` : width}
    $height={Number.isInteger(height) ? `${height}px` : height}
    {...props}
  />
);
