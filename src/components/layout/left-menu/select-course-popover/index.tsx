import React, { useCallback, useMemo, useState } from 'react';
import List from 'antd/es/list';
import Input from 'antd/es/input';
import groupBy from 'lodash/groupBy';
import Divider from 'antd/es/divider';
import Avatar from 'antd/es/avatar/avatar';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { RightArrow } from 'components/icons';
import { profileActions } from 'models/profile';
import { getCourses } from 'models/courses/selectors';
import { defaultCourseUrl } from 'models/courses/constants';
import { Header3, Header4 } from 'components/layout/headers';
import { useAppDispatch, useAppSelector } from 'utils/hooks';
import { SearchIcon } from 'components/icons/inputs/search-icon';
import { ActiveBadge } from 'pages/course-management/course-block/elements';
import { getProfileCourse, getProfileState } from 'models/profile/selectors';
import { CoursePopover, ListContainer, ListItemMeta, Arrow, CourseAvatar } from './elements';

import type { ChangeEvent } from 'react';
import type { ICourse } from 'modules/api-requests/courses/types';

const defaultCourseLogo = '/images/testLogo.png';

const courseSortFn = (a: ICourse, b: ICourse) => a.name.toLowerCase().localeCompare(b.name.toLowerCase());

export const SelectCoursePopover = () => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(getCourses);
  const currentUser = useAppSelector(getProfileState);
  const activeCourse = useAppSelector(getProfileCourse);
  const [filterValue, setFilterValue] = useState('');
  const [showPopover, setShowPopover] = useState(false);

  const coursesData = useMemo(() =>
    Object
      .values(courses)
      .filter(item => item.users?.map(user => user.id).includes(String(currentUser?.sub)))
      .sort(courseSortFn),
    [courses, currentUser?.sub]
  );

  const coursesGroupByLetter = useMemo(() => groupBy(
    coursesData
      .filter(course => course.name.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0),
    item => item.name.toUpperCase().charAt(0),
  ), [filterValue, coursesData]);

  const onFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  const onCourseClick = useCallback((course: ICourse) => () => {
    dispatch(profileActions.setCourse(course));
    setShowPopover(false);
  }, [dispatch]);

  return (
    <CoursePopover
      placement="rightTop"
      trigger="click"
      arrowPointAtCenter={false}
      visible={showPopover}
      onVisibleChange={setShowPopover}
      content={(
        <>
          <Header3>List of courses</Header3>
          <Input
            prefix={<SearchIcon />}
            placeholder="Search course"
            size="large"
            onChange={onFilter}
          />

          <ListContainer>
            <Scrollbars autoHide height="100%">
              {Object
                .keys(coursesGroupByLetter)
                .map(letter => (
                  <List
                    key={letter}
                    dataSource={coursesGroupByLetter[letter]}
                    header={<Divider orientation="left"><Header4>{letter}</Header4></Divider>}
                    renderItem={item => (
                      <List.Item key={item.id}>
                        <ListItemMeta
                          avatar={
                            <ActiveBadge $active={item.isActive} dot>
                              <Avatar src={item.logoUrl || defaultCourseUrl} shape="square" />
                            </ActiveBadge>
                          }
                          title={<div onClick={onCourseClick(item)}>{item.name}</div>}
                          $active={item.id === activeCourse?.id}
                        />
                      </List.Item>
                    )}
                  />
                ))}
            </Scrollbars>
          </ListContainer>
        </>
      )}
    >
      <CourseAvatar>
        <img src={activeCourse?.logoUrl || defaultCourseLogo} alt="course logo" />
        <Arrow>
          <RightArrow />
        </Arrow>
      </CourseAvatar>
    </CoursePopover>
  );
};
