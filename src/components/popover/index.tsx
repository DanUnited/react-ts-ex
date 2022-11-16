import styled from 'styled-components';
import React, { useRef } from 'react';
import AntdPopover from 'antd/es/popover';

import type { FC } from 'react';
import type { PopoverProps } from 'antd/es/popover';

interface IContainerProps extends React.HTMLAttributes<Omit<HTMLDivElement, 'ref'>> {
  ref: React.Ref<HTMLDivElement | null | undefined>;
}

const PopoverContainer: FC<IContainerProps> = styled.div`
`;

export const Popover = ({ className, ...props }: PopoverProps) => {
  const divRef = useRef<HTMLDivElement>();
  const getTooltipContainer = () => divRef.current as HTMLDivElement;

  return (
    <PopoverContainer className={className} ref={divRef}>
      <AntdPopover {...props} getPopupContainer={getTooltipContainer} />
    </PopoverContainer>
  )
}
