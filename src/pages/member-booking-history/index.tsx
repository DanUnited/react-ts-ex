import React from 'react';
import Table from 'antd/es/table';

import { DefaultButton } from 'components/layout/button';
import { PageLayout } from 'components/layout/page-layout';
import { PathCreator, RoutePaths } from 'routing/constants';
import { Phone, Envelope } from 'components/icons';
import { renderColumns } from 'components/table/columns';
import { historyColumns } from './columns';
import { memberHistoryFixture } from './constants';
import {
  Title,
  IconWrapper,
  Container,
  MainBlock,
  MemberInfo,
  ButtonMargin,
  Avatar,
  Name,
  PersonalWrapper,
  InfoName,
  InfoWrapper,
  UserInfo
} from './elements';

const historyBackURL = PathCreator[RoutePaths.COURSE_MANAGEMENT].getUrl();

const MemberBookingHistory = (): React.ReactElement => {
  return (
    <PageLayout
      bodiless
      title="Member profile"
      returnSrc={historyBackURL}
    >
      <Container>
        <MemberInfo>
          <PersonalWrapper>
            <Avatar />
            <Name>Name LastName</Name>
          </PersonalWrapper>

          <div>
            <InfoWrapper>
              <IconWrapper>
                <Envelope />
              </IconWrapper>
              <InfoName>E-Mail</InfoName>
            </InfoWrapper>
            <UserInfo>kaiyrgeldy.omarov@kandasoft.comajshdgasjhd</UserInfo>
          </div>

          <div>
            <InfoWrapper>
              <IconWrapper>
                <Phone />
              </IconWrapper>
              <InfoName>Phone number</InfoName>
            </InfoWrapper>
            <UserInfo>+1 (989) 489-94-18</UserInfo>
          </div>

          <ButtonMargin>
            <DefaultButton block danger>Block user</DefaultButton>
          </ButtonMargin>
          <DefaultButton block danger>Delete user</DefaultButton>
        </MemberInfo>

        <MainBlock>
          <Title>Booking history</Title>
          <Table
            sticky
            rowKey="number"
            tableLayout="fixed"
            dataSource={memberHistoryFixture}
          >
            {renderColumns(historyColumns)}
          </Table>
        </MainBlock>
      </Container>
    </PageLayout>
  )
};

export default MemberBookingHistory;
