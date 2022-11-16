import { useQuery } from 'react-query';

import { getCourseByIdRequest, getCoursesRequest } from './index';
import { coursesActions } from 'models/courses';
import { profileActions } from 'models/profile';

import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { getProfileCourse, getProfileState } from 'models/profile/selectors';

import type { ICourse } from './types';
import type { UseQueryOptions } from 'react-query';

export function useCourseList(
  options?: UseQueryOptions<ICourse[], string, ICourse[]>,
) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(getProfileState);
  const currentCourse = useAppSelector(getProfileCourse);

  return useQuery({
    queryKey: 'getCourses',
    queryFn: () => getCoursesRequest(),
    initialData: [] as ICourse[],
    enabled: true,
    cacheTime: 5 * 1000,
    onSuccess: (data) => {
      dispatch(coursesActions.setCourses(data));

      if (data.length && currentUser.sub) {
        if (!currentCourse) {
          const firstFoundCourse = data.find(item => item.users?.map(user => user.id)?.includes(currentUser.sub as string));

          if (firstFoundCourse) {
            dispatch(profileActions.setCourse(firstFoundCourse));
          }
        } else {
          const foundCurrentCourse = data.find(item => item.id === currentCourse.id);
          if (foundCurrentCourse && foundCurrentCourse.users?.map(user => user.id)?.includes(currentUser.sub as string)) {
            dispatch(profileActions.setCourse(foundCurrentCourse));
          }
        }
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
    ...options,
  });
}

export function useCourse(
  courseId: string,
  options?: UseQueryOptions<ICourse, string, ICourse>,
) {
  return useQuery({
    queryKey: ['getCourse', courseId],
    enabled: Boolean(courseId),
    queryFn: () => getCourseByIdRequest(courseId),
    ...options,
  });
}
