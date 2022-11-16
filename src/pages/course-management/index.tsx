import React, { useCallback } from 'react';
import { push } from 'connected-react-router';

import { useAppDispatch } from 'utils/hooks';
import { Loading } from 'components/loading';
import { CourseBlock } from './course-block';
import { Plus } from 'components/icons/system/plus';
import { Header3 } from 'components/layout/headers';
import { PrimaryButton } from 'components/layout/button';
import { PageLayout } from 'components/layout/page-layout';
import { PathCreator, RoutePaths } from 'routing/constants';
import { CourseListContainer, EmptyBlock } from './elements';
import { useCourseList } from 'modules/api-requests/courses/queries';

export const CourseManagementPage = () => {
  const dispatch = useAppDispatch();
  const { data, isFetching } = useCourseList();

  const onAddCourse = useCallback(() => {
    dispatch(push(PathCreator[RoutePaths.COURSE_MANAGEMENT_CREATION].getUrl()));
  }, [dispatch]);

  return (
    <PageLayout
      title="Course Management"
      actions={(
        <PrimaryButton icon={<Plus />} onClick={onAddCourse}>Add course</PrimaryButton>
      )}
      fullHeight
    >
      <Header3>List of courses</Header3>

      {isFetching
        ? <Loading />
        : (
          <CourseListContainer>
            {data?.map(item => (
              <CourseBlock key={item.id} {...item} />
            ))}
            <EmptyBlock />
            <EmptyBlock />
            <EmptyBlock />
          </CourseListContainer>)
      }
    </PageLayout>
  );
}

export default CourseManagementPage;
