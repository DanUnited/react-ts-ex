import styled from 'styled-components';
import React, { useRef } from 'react';
import AntdTooltip from 'antd/es/tooltip';
import { useCombinedRefs } from 'utils/hooks/use-combined-refs';

import type { FC } from 'react';
import type { TooltipProps } from 'antd/es/tooltip';

interface IContainerProps extends React.HTMLAttributes<Omit<HTMLDivElement, 'ref'>> {
  ref: React.Ref<HTMLDivElement | null | undefined>;
}

const TooltipContainer: FC<IContainerProps> = styled.div`
`;

export const Tooltip = React.forwardRef(({ className, ...props }: TooltipProps, ref: React.Ref<HTMLDivElement>) => {
  const divRef = useRef<HTMLDivElement>();
  const combinedRef = useCombinedRefs(ref, divRef);
  const getTooltipContainer = () => divRef.current as HTMLDivElement;

  return (
    <TooltipContainer className={className} ref={combinedRef}>
      <AntdTooltip {...props} getPopupContainer={getTooltipContainer} />
    </TooltipContainer>
  )
});
