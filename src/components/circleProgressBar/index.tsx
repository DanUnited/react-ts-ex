import React, { useEffect, useMemo, useRef } from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { formatNumber } from 'utils/numbers';
import { ValueBlock, Wrapper } from './elements';
import { ProgressBar } from 'components/icons/progressBar';

interface ICircleProgressBar {
  value?: number;
  size: 'large' | 'small';
}

export const CircleProgressBar = ({ value = 0, size }: ICircleProgressBar): React.ReactElement => {
  const valueRef = useRef(null);
  const svgRef = useRef(null);
  const breakpoints = useBreakpoint();

  const pxSize = useMemo(() => {
    if (breakpoints.xxl) return size === 'large' ? 168 : 64;

    return size === 'large' ? 124 : 48;
  }, [breakpoints, size]);

  useEffect(() => {
    if (valueRef.current) {
      (valueRef.current as HTMLElement).setAttribute('data-pct', formatNumber(value, 0));
    }

    if (svgRef.current) {
      const circle = (svgRef.current as HTMLElement).getElementsByTagName('circle');
      const radius = circle[0]?.getAttribute('r');
      const newRadiusValue = Math.PI*(Number(radius)*2);
      const progress = ((100 - value) / 100) * newRadiusValue;

      circle[0].setAttribute('stroke-dashoffset', `-${Math.round(progress)}`);
      circle[1].setAttribute('stroke-dashoffset', `-${Math.round(progress)}`);
    }
  }, [value, svgRef, valueRef]);

  return (
    <Wrapper>
      <ValueBlock size={size} id="value" ref={valueRef} $width={pxSize} />
      <div id="circle">
        <ProgressBar width={pxSize} height={pxSize} _ref={svgRef} />
      </div>
    </Wrapper>
  )
};
