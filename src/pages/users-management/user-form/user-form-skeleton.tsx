import React from 'react';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import { Skeleton } from 'components/skeleton';
import { ColumnTitle, Container } from './elements';
import { SkeletonWrapper, Title } from 'pages/course-management/course-form-skeleton/elements';

export const UserFormSkeleton = () => (
  <>
    <Container>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <ColumnTitle>Main info</ColumnTitle>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <SkeletonWrapper>
                <Title>First name</Title>
                <Skeleton height={40} />
              </SkeletonWrapper>

              <SkeletonWrapper>
                <Title>E-Mail</Title>
                <Skeleton height={40} />
              </SkeletonWrapper>

              <SkeletonWrapper>
                <Title>Role</Title>
                <Skeleton height={40} />
              </SkeletonWrapper>
            </Col>

            <Col span={12}>
              <SkeletonWrapper>
                <Title>Last name</Title>
                <Skeleton height={40} />
              </SkeletonWrapper>

              <SkeletonWrapper>
                <Title>Phone</Title>
                <Skeleton height={40} />
              </SkeletonWrapper>

              <SkeletonWrapper>
                <Title>Password</Title>
                <Skeleton height={40} />
              </SkeletonWrapper>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <ColumnTitle>Assign to courses</ColumnTitle>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <SkeletonWrapper>
                <Title>Choose course</Title>
                <Skeleton height={40} />
              </SkeletonWrapper>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </>
);
