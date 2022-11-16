import React from 'react';
import Row from 'antd/es/row';
import Col from 'antd/es/col';

import { Skeleton } from 'components/skeleton';
import { RoundRow } from '../course-form/elements';
import { Title, SkeletonWrapper } from './elements';
import { Header4 } from 'components/layout/headers';

export const MainInfoSkeleton = (): React.ReactElement => (
  <Row gutter={[16, 16]}>
    <Col span={12}>
      <SkeletonWrapper>
        <Title>Course name</Title>
        <Skeleton height={40} />
      </SkeletonWrapper>

      <SkeletonWrapper>
        <Title>City</Title>
        <Skeleton height={40} />
      </SkeletonWrapper>

      <SkeletonWrapper>
        <Title>ZIP</Title>
        <Skeleton height={40} />
      </SkeletonWrapper>

      <SkeletonWrapper>
        <Title>Confirmation emails</Title>
        <Skeleton height={40} />
      </SkeletonWrapper>

      <SkeletonWrapper>
        <Title>Time zone</Title>
        <Skeleton height={40} />
      </SkeletonWrapper>
    </Col>
    <Col span={12}>
      <SkeletonWrapper>
        <Title>Address</Title>
        <Skeleton height={40} />
      </SkeletonWrapper>

      <SkeletonWrapper>
        <Title>State</Title>
        <Skeleton height={40} />
      </SkeletonWrapper>

      <SkeletonWrapper>
        <Title>Phone</Title>
        <Skeleton height={40} />
      </SkeletonWrapper>

      <SkeletonWrapper>
        <Title>Website URL</Title>
        <Skeleton height={40} />
      </SkeletonWrapper>

      <SkeletonWrapper>
        <Title>Sub-domain name</Title>
        <Skeleton height={40} />
      </SkeletonWrapper>
    </Col>
  </Row>
);

export const MonetizationModelSkeleton = (): React.ReactElement => (
  <>
    <RoundRow><Col><Header4>Regular rounds</Header4></Col><Col /></RoundRow>

    <Row gutter={[16, 16]}>
      <Col span={12}>
        <SkeletonWrapper>
          <Title>Transaction fee</Title>
          <Skeleton height={40} />
        </SkeletonWrapper>
      </Col>
      <Col span={12}>
        <SkeletonWrapper>
          <Title>Transaction fee type</Title>
          <Skeleton height={40} />
        </SkeletonWrapper>
      </Col>
    </Row>

    <RoundRow><Col><Header4>Trade rounds</Header4></Col><Col /></RoundRow>
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <SkeletonWrapper>
          <Title>Transaction fee</Title>
          <Skeleton height={40} />
        </SkeletonWrapper>
      </Col>
      <Col span={12}>
        <SkeletonWrapper>
          <Title>Transaction fee type</Title>
          <Skeleton height={40} />
        </SkeletonWrapper>
      </Col>
    </Row>
  </>
);

export const HolesSettingsSkeleton = (): React.ReactElement => (
  <Row gutter={[16, 16]}>
    <Col span={24}>
      <SkeletonWrapper>
        <Title>Number of holes</Title>
        <Skeleton height={40} />
      </SkeletonWrapper>
    </Col>
    <Col span={24}>
      <SkeletonWrapper>
        <Title>9 holes round duration</Title>
        <Skeleton height={40} />
      </SkeletonWrapper>
    </Col>
  </Row>
);

export const AssignToUserSkeleton = (): React.ReactElement => (
  <SkeletonWrapper>
    <Title>User e-mail</Title>
    <Skeleton height={40} />
  </SkeletonWrapper>
);
