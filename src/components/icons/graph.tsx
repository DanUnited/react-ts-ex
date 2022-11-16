import React from 'react';

import type { ISVGElement } from './types';

export const Graph = (props: ISVGElement): React.ReactElement => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="#38A5FF" {...props} >
    <path d="M14.4028 0.798838C13.5214 0.795713 12.8056 1.51148 12.8025 2.3929C12.8025 2.80861 12.9619 3.20868 13.2526 3.50562L10.3301 9.35363C10.2676 9.34426 10.202 9.33488 10.1364 9.33488C9.93006 9.33488 9.72377 9.37551 9.53311 9.45365L7.26392 6.90003C7.39519 6.66561 7.46708 6.40306 7.47021 6.13113C7.47021 5.24658 6.75444 4.53082 5.8699 4.53082C4.98535 4.53082 4.26958 5.24658 4.26958 6.13113C4.27271 6.51245 4.41024 6.88128 4.66341 7.16883L1.88474 12.0292C1.79097 12.0104 1.69408 12.001 1.60031 12.001C0.715765 12.001 0 12.7168 0 13.6013C0 14.4859 0.715765 15.2016 1.60031 15.2016C2.48486 15.2016 3.20063 14.4859 3.20063 13.6013C3.1975 13.22 3.05997 12.8512 2.8068 12.5636L5.58234 7.70331C5.87927 7.7627 6.18871 7.73144 6.46689 7.61267L8.73608 10.1663C8.60481 10.4007 8.53604 10.6664 8.53292 10.9352C8.52979 11.8197 9.24556 12.5386 10.127 12.5418C11.0115 12.5449 11.7304 11.8291 11.7335 10.9477C11.7335 10.532 11.5741 10.1288 11.2835 9.82873L14.2059 3.98071C14.2684 3.99009 14.3341 3.99946 14.3997 3.99946C15.2842 3.99946 16 3.2837 16 2.39915C16 1.5146 15.2874 0.798838 14.4028 0.798838Z" />
  </svg>
);