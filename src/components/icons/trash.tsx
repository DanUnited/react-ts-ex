import React from 'react';

import type { ISVGElement } from './types';

export const Trash = (props: ISVGElement): React.ReactElement => (
  <svg width="16" height="16" viewBox="0 0 16 16" {...props} >
    <g>
      <path d="M13.9999 2.66667H11.9333C11.7785 1.91428 11.3691 1.23823 10.7741 0.752479C10.179 0.266727 9.43472 0.000969683 8.66658 0L7.33325 0C6.56511 0.000969683 5.8208 0.266727 5.22575 0.752479C4.63071 1.23823 4.22132 1.91428 4.06659 2.66667H1.99992C1.82311 2.66667 1.65354 2.7369 1.52851 2.86193C1.40349 2.98695 1.33325 3.15652 1.33325 3.33333C1.33325 3.51014 1.40349 3.67971 1.52851 3.80474C1.65354 3.92976 1.82311 4 1.99992 4H2.66659V12.6667C2.66764 13.5504 3.01917 14.3976 3.64407 15.0225C4.26896 15.6474 5.11619 15.9989 5.99992 16H9.99992C10.8836 15.9989 11.7309 15.6474 12.3558 15.0225C12.9807 14.3976 13.3322 13.5504 13.3333 12.6667V4H13.9999C14.1767 4 14.3463 3.92976 14.4713 3.80474C14.5963 3.67971 14.6666 3.51014 14.6666 3.33333C14.6666 3.15652 14.5963 2.98695 14.4713 2.86193C14.3463 2.7369 14.1767 2.66667 13.9999 2.66667ZM7.33325 1.33333H8.66658C9.0801 1.33384 9.48334 1.46225 9.82099 1.70096C10.1587 1.93967 10.4142 2.27699 10.5526 2.66667H5.44725C5.58564 2.27699 5.84119 1.93967 6.17884 1.70096C6.5165 1.46225 6.91974 1.33384 7.33325 1.33333ZM11.9999 12.6667C11.9999 13.1971 11.7892 13.7058 11.4141 14.0809C11.0391 14.456 10.5304 14.6667 9.99992 14.6667H5.99992C5.46949 14.6667 4.96078 14.456 4.58571 14.0809C4.21063 13.7058 3.99992 13.1971 3.99992 12.6667V4H11.9999V12.6667Z" />
      <path d="M6.66667 11.9993C6.84348 11.9993 7.01304 11.9291 7.13807 11.8041C7.26309 11.6791 7.33333 11.5095 7.33333 11.3327V7.33268C7.33333 7.15587 7.26309 6.9863 7.13807 6.86128C7.01304 6.73625 6.84348 6.66602 6.66667 6.66602C6.48985 6.66602 6.32029 6.73625 6.19526 6.86128C6.07024 6.9863 6 7.15587 6 7.33268V11.3327C6 11.5095 6.07024 11.6791 6.19526 11.8041C6.32029 11.9291 6.48985 11.9993 6.66667 11.9993Z" />
      <path d="M9.33317 11.9993C9.50999 11.9993 9.67956 11.9291 9.80458 11.8041C9.92961 11.6791 9.99985 11.5095 9.99985 11.3327V7.33268C9.99985 7.15587 9.92961 6.9863 9.80458 6.86128C9.67956 6.73625 9.50999 6.66602 9.33317 6.66602C9.15636 6.66602 8.98679 6.73625 8.86177 6.86128C8.73674 6.9863 8.6665 7.15587 8.6665 7.33268V11.3327C8.6665 11.5095 8.73674 11.6791 8.86177 11.8041C8.98679 11.9291 9.15636 11.9993 9.33317 11.9993Z" />
    </g>
    <defs>
      <clipPath>
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);