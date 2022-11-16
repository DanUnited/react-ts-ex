import React from 'react';

interface IIcon {
  width?: number;
  height?: number;
  _ref?: any;
}

export const ProgressBar = ({ _ref, width, height }: IIcon): React.ReactElement => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 168 168"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="ellipse"
      ref={_ref}
    >
      <circle r="74" cx="84" cy="84" fill="transparent" strokeDasharray="565.48" strokeDashoffset="100" />
      <circle r="74" cx="84" cy="84" fill="transparent" strokeDasharray="565.48" strokeDashoffset="100"
        stroke="#C0D4E3" strokeLinecap="round" strokeWidth="10" />
    </svg>
  )
};

