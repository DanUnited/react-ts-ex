import styled from 'styled-components';
import React, { useRef } from 'react';
import AntdDropdown from 'antd/es/dropdown';

import type { FC, ReactNode } from 'react';
import type { DropDownProps } from 'antd/es/dropdown';

interface IContainerProps extends React.HTMLAttributes<Omit<HTMLDivElement, 'ref'>> {
  ref: React.Ref<HTMLDivElement | null | undefined>;
}

const DropdownContainer: FC<IContainerProps> = styled.div`
`;

export const Dropdown = ({ className, ...props }: DropDownProps & { children: ReactNode }) => {
  const divRef = useRef<HTMLDivElement>();
  const getTooltipContainer = () => divRef.current as HTMLDivElement;

  return (
    <DropdownContainer className={className} ref={divRef}>
      <AntdDropdown {...props} getPopupContainer={getTooltipContainer} />
    </DropdownContainer>
  )
}
