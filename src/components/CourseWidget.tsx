import React, { useMemo } from 'react';

import { useApplicationContext } from '@/state/RootStore';
import { RequestedCourse } from '@/state/ScheduleStore';

import { action, computed } from 'mobx';
import { observer } from 'mobx-react';

import styles from './courses.module.css';

type CourseWidgetProps = {
  course: RequestedCourse
}

type RequestedCourseKeys = 'department'|'courseName'|'preferredTeacher'|'preferredBlock';

const filterScopes = ['department', 'courseName', 'preferredTeacher', 'preferredBlock'];

/**An individual Course where the user inputs their class, preferred teacher
and block, etc.*/
const CourseWidget: React.FunctionComponent<CourseWidgetProps> = observer(({ course }) => {
  const rootStore = useApplicationContext();
  const courseStore = rootStore.courseStore;
  const scheduleStore = rootStore.scheduleStore;

  const shouldBeInteractive = (key: RequestedCourseKeys) => {
    return filterScopes.slice(0, filterScopes.indexOf(key)).every(scope => !!course[scope as RequestedCourseKeys]);
  }

  const setValueAndResetLowerScopes = (key: RequestedCourseKeys) => (action((e: React.ChangeEvent<HTMLSelectElement>) => {
    if (key == 'preferredTeacher') console.log(e.target.value);
    course[key] = e.target.value as never;
    for (let i = filterScopes.indexOf(key) + 1; i < filterScopes.length; i++) {
      course[filterScopes[i] as RequestedCourseKeys] =
        (typeof course[filterScopes[i] as RequestedCourseKeys] == 'string' ? '' : 0) as never;
    }
  }));

  const validTeachers = useMemo(() => computed(() => {
    if (!shouldBeInteractive('preferredTeacher')) {
      return [];
    }
    return Array.from(
      new Set(courseStore.announcer[course.department][course.courseName].map(courseInstance => courseInstance.teacher))
    );
  }), [course.courseName]);

  return (
    <div className={styles.course}>
      <button
        className={styles.deleteBut}
        onClick={action(() => scheduleStore.removeCourse(course))}
      >
        Remove
      </button>
      <label>
        Department
        <select
          onChange={setValueAndResetLowerScopes('department')}
          value={course.department}
        >
          <option value="">Choose a department</option>
          {Object.keys(courseStore.announcer).map((department, idx) =>
            <option key={idx} value={department}>{department}</option>
          )}
        </select>
      </label>
      <label>
        Course
        <select
          onChange={setValueAndResetLowerScopes('courseName')}
          value={course.courseName}
        >
          <option value="">Choose a course</option>
          {
            shouldBeInteractive('courseName') ?
              Object.keys(courseStore.announcer[course.department]).map((courseName, idx) =>
                <option key={idx} value={courseName}>{courseName}</option>
              )
            : null
          }
        </select>
      </label>
      <label>
        Teacher
        <select
          onChange={setValueAndResetLowerScopes('preferredTeacher')}
          value={course.preferredTeacher}
        >
          <option value="">Choose a teacher</option>
          {
            validTeachers.get().map((teacher, idx) =>
              <option key={idx} value={teacher}>{teacher}</option>
            )
          }
        </select>
      </label>
      <label>
        Block
        <select
          onChange={setValueAndResetLowerScopes('preferredBlock')}
          value={course.preferredBlock}
        >
          <option value="">Choose a block</option>
          {
            shouldBeInteractive('preferredBlock') ?
              courseStore.announcer[course.department][course.courseName]
                .filter(courseInstance => courseInstance.teacher == course.preferredTeacher)
                .map((courseInstance, idx) =>
                  <option key={idx} value={courseInstance.block}>
                    Block {courseInstance.block}, {courseInstance.seats} seats left
                  </option>
                )
            : null
          }
        </select>
      </label>
    </div>
  );
});

export default CourseWidget;
