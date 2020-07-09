import { computed, observable, autorun, action, ObservableSet, IObservableArray } from 'mobx';

import RootStore from '@/state/RootStore';
import { CourseInstance } from '@/state/CourseStore';

import _ from 'lodash';

export interface ISchedulable {
  block: number;
  semester: string;
}

export type RequestedCourse = {
  department: string;
  courseName: string;
  preferredTeacher: string;
  teacherRequired: boolean;
  preferredBlock: number;
}

export type RequestedFreeBlock = {
  block: number;
  priority: number;
  semester: string;
}

export type Schedule = {
  courseInstances: CourseInstance[];
  score: number;
  impossible: boolean;
}

export default class ScheduleStore {
  rootStore: RootStore;

  PREFERRED_TEACHER_WEIGHT = 1;
  PREFERRED_BLOCK_WEIGHT = 1;

  requestedCourses: IObservableArray<RequestedCourse> = observable([]);
  requestedFreeBlocks: IObservableArray<RequestedFreeBlock> = observable([]);

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    if (typeof localStorage != 'undefined') {
      const lastVersion = localStorage.getItem('appVersion');
      if (lastVersion == this.rootStore.APP_VERSION) {
        this.requestedCourses.replace(JSON.parse(localStorage.getItem('requestedCourses') || '[]'));
        this.requestedFreeBlocks.replace(JSON.parse(localStorage.getItem('requestedFreeBlocks') || '[]'));
      }
      localStorage.setItem('appVersion', this.rootStore.APP_VERSION);

      autorun(() => {
        localStorage.setItem('requestedCourses', JSON.stringify(this.requestedCourses));
        localStorage.setItem('requestedFreeBlocks', JSON.stringify(this.requestedFreeBlocks));
      });
    }
  }

  @computed
  get validRequestedCourses(): RequestedCourse[] {
    return this.requestedCourses.filter(requestedCourse =>
      requestedCourse.department != '' && requestedCourse.courseName != '');
  }

  @computed
  get validRequestedFreeBlocks(): RequestedFreeBlock[] {
    return this.requestedFreeBlocks.filter(requestedFreeBlock =>
      requestedFreeBlock.block != 0 && requestedFreeBlock.semester != '');
  }

  @computed
  get isScheduleEmpty(): boolean {
    return this.requestedCourses.length + this.requestedFreeBlocks.length == 0;
  }

  @computed
  get isScheduleFull(): boolean {
    return this.requestedCourses.length + this.requestedFreeBlocks.length >= 16;
  }

  @computed
  get generatedSchedules(): Schedule[] {
    if (this.validRequestedCourses.length == 0) return [];
    const schedules: Schedule[] = [];
    this.findSchedulesRecursively({
      courseInstances: [],
      score: 0,
      impossible: false
    }, schedules);
    return schedules.sort((a, b) => b.score - a.score);
  }

  findSchedulesRecursively(
    currentSchedule: Schedule,
    allSchedules: Schedule[]
  ) {
    // Look at the next requested course
    const currentRequestedCourse = this.validRequestedCourses[currentSchedule.courseInstances.length];
    // Locate all matching offers
    const possibleCourseInstances = Object.values(
      this.rootStore.courseStore.announcer
      [currentRequestedCourse.department]
      [currentRequestedCourse.courseName]
    ).reduce((acc, cur) => acc.concat(cur));

    for (let possibleCourseInstance of possibleCourseInstances) {
      // Discard course instances that overlap with ones already in the schedule
      if (ScheduleStore.checkScheduleIntersect(currentSchedule, possibleCourseInstance)) {
        continue;
      }
      // Some courses may require you to keep the same teacher across semesters
      // Not applicable for 2020 - 2021 because yearlong classes are already blocked out
      if (
        currentRequestedCourse.teacherRequired &&
        currentRequestedCourse.preferredTeacher != '' &&
        possibleCourseInstance.teacher != currentRequestedCourse.preferredTeacher
      ) {
        continue;
      }

      const newSchedule = _.cloneDeep(currentSchedule);
      newSchedule.courseInstances.push(possibleCourseInstance);
      newSchedule.impossible = newSchedule.impossible || possibleCourseInstance.seats <= 0;
      
      const courseLength = possibleCourseInstance.semester == 'Both' ? 2 : 1;

      if (possibleCourseInstance.teacher == currentRequestedCourse.preferredTeacher) {
        newSchedule.score += this.PREFERRED_TEACHER_WEIGHT * courseLength;
      }
      if (possibleCourseInstance.block == currentRequestedCourse.preferredBlock) {
        newSchedule.score += this.PREFERRED_BLOCK_WEIGHT * courseLength;
      }

      if (newSchedule.courseInstances.length == this.validRequestedCourses.length) {
        for (let requestedFreeBlock of this.validRequestedFreeBlocks) {
          if (!ScheduleStore.checkScheduleIntersect(newSchedule, requestedFreeBlock)) {
            newSchedule.score += requestedFreeBlock.priority;
          }
        }
        allSchedules.push(newSchedule);
      } else {
        this.findSchedulesRecursively(newSchedule, allSchedules);
      }
    }
  }

  // Checks if a schedulable would be a valid addition to a schedule
  static checkScheduleIntersect(schedule: Schedule, schedulable: ISchedulable) {
    const courseInstanceBlocks = this.deriveBlocks(schedulable);
    for (let scheduleCourseInstance of schedule.courseInstances) {
      if (this.deriveBlocks(scheduleCourseInstance).some(block => courseInstanceBlocks.includes(block))) {
        return true;
      }
    }
    return false;
  }

  // Derives the blocks a schedulable occupies in semester / block format
  // e.g. Fall Block 1 = '11'
  // e.g. Spring Block 4 = '24'
  static deriveBlocks(schedulable: ISchedulable): string[] {
    const occupiedBlocks = [];
    if (schedulable.semester == 'Both') {
      occupiedBlocks.push('1' + schedulable.block);
      occupiedBlocks.push('2' + schedulable.block);
    } else {
      occupiedBlocks.push(schedulable.semester + schedulable.block);
    }
    return occupiedBlocks;
  }

  @action.bound
  addCourse(): RequestedCourse {
    const requestedCourse = {
      department: '',
      courseName: '',
      preferredTeacher: '',
      teacherRequired: false,
      preferredBlock: 0
    };
    this.requestedCourses.push(requestedCourse);
    return requestedCourse;
  }

  @action.bound
  addFreeBlock(): RequestedFreeBlock {
    const requestedFreeBlock = {
      block: 0,
      priority: 1,
      semester: ''
    };
    this.requestedFreeBlocks.push(requestedFreeBlock);
    return requestedFreeBlock;
  }

  @action.bound
  removeCourse(course: RequestedCourse) {
    this.requestedCourses.splice(this.requestedCourses.indexOf(course), 1);
  }

  @action.bound
  removeFreeBlock(freeBlock: RequestedFreeBlock) {
    this.requestedFreeBlocks.splice(this.requestedFreeBlocks.indexOf(freeBlock), 1);
  }

  @action.bound
  clearSchedule() {
    this.requestedCourses.clear();
    this.requestedFreeBlocks.clear();
  }
}
