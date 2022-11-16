import React from 'react';

import { Skeleton } from 'components/skeleton';
import { AvailableDaysTitle } from '../elements';
import { Header5 } from 'components/layout/headers';
import { SkeletonWrapper } from 'pages/course-management/course-form-skeleton/elements';

export const MainInfoSkeleton = () => (
  <>
    <SkeletonWrapper>
      <Skeleton height={40} />
    </SkeletonWrapper>

    <SkeletonWrapper>
      <Skeleton height={156} />
    </SkeletonWrapper>

    <Header5>Rate options</Header5>

    <SkeletonWrapper><Skeleton height={40} /></SkeletonWrapper>
    <SkeletonWrapper><Skeleton height={40} /></SkeletonWrapper>
    <SkeletonWrapper><Skeleton height={40} /></SkeletonWrapper>
    <SkeletonWrapper><Skeleton height={40} /></SkeletonWrapper>

    <AvailableDaysTitle>Available days</AvailableDaysTitle>
  </>
);
