import React from 'react';
import { push } from 'connected-react-router';

import { Edit } from 'components/icons/edit';
import { useAppDispatch } from 'utils/hooks';
import { defaultCourseUrl } from 'models/courses/constants';
import { PathCreator, RoutePaths } from 'routing/constants';
import { ActiveBadge, BlockTitle, ContentBlock, ImageContainer, CourseBlockContainer, EditBlock } from './elements';

import type { ICourse } from 'modules/api-requests/courses/types';

export const CourseBlock = ({ isActive, name , id, logoUrl }: ICourse): React.ReactElement => {
  const dispatch = useAppDispatch();

  const updateCourse = (): void => {
    dispatch(push(`${PathCreator[RoutePaths.COURSE_MANAGEMENT_UPDATE].getUrl()}/${id}`))
  };

  return (
    <CourseBlockContainer>
      <ContentBlock>
        <ActiveBadge $active={isActive} dot>
          <ImageContainer>
            <img src={logoUrl || defaultCourseUrl} alt="course" />
          </ImageContainer>
        </ActiveBadge>

        <BlockTitle>{name}</BlockTitle>
      </ContentBlock>

      <EditBlock onClick={updateCourse}>
        <Edit />
      </EditBlock>
    </CourseBlockContainer>
  )
};
