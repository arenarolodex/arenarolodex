import CourseStore, { CourseInstance } from '@/state/CourseStore';

import * as _ from 'lodash';

export interface ISchedulable {
    block: number;
    semester: string;
}

type RequestedCourse = {
    department: string;
    courseName: string;
    preferredTeacher?: string;
    teacherRequired: boolean;
    preferredBlock?: number;
}

type RequestedFreeBlock = {
    block: number;
    priority: number;
    semester: string;
}

type Schedule = {
    courseInstances: CourseInstance[];
    score: number;
    impossible: boolean;
}

class ScheduleMaker {
    PREFERRED_TEACHER_WEIGHT = 1;
    PREFERRED_BLOCK_WEIGHT = 1;

    courseStore: CourseStore;

    constructor(courseStore: CourseStore) {
        this.courseStore = courseStore;
    }

    generateSchedules(
        requestedCourses: RequestedCourse[],
        requestedFreeBlocks: RequestedFreeBlock[]
    ): Schedule[] {
        const schedules: Schedule[] = [];

        return schedules;
    }

    findSchedulesRecursively(
        requestedCourses: RequestedCourse[],
        requestedFreeBlocks: RequestedFreeBlock[],
        currentSchedule: Schedule,
        allSchedules: Schedule[]
    ) {
        const currentRequestedCourse = requestedCourses[currentSchedule.courseInstances.length];
        const possibleCourseInstances = this.courseStore.announcer
            [currentRequestedCourse.department]
            [currentRequestedCourse.courseName];

        for (let possibleCourseInstance of possibleCourseInstances) {
            if (ScheduleMaker.checkScheduleIntersect(currentSchedule, possibleCourseInstance)) {
                continue;
            }
            // Some courses may require you to keep the same teacher across semesters
            // Not applicable for 2020 - 2021 because yearlong classes are already blocked out
            if (
                currentRequestedCourse.preferredTeacher != '' &&
                possibleCourseInstance.teacher != currentRequestedCourse.preferredTeacher
            ) {
                continue;
            }

            const newSchedule = _.cloneDeep(currentSchedule);
            newSchedule.courseInstances.push(possibleCourseInstance);
            newSchedule.impossible = newSchedule.impossible || possibleCourseInstance.seats <= 0;

            if (possibleCourseInstance.teacher == currentRequestedCourse.preferredTeacher) {
                newSchedule.score += this.PREFERRED_TEACHER_WEIGHT;
            }
            if (possibleCourseInstance.block == currentRequestedCourse.preferredBlock) {
                newSchedule.score += this.PREFERRED_BLOCK_WEIGHT;
            }

            if (newSchedule.courseInstances.length == requestedCourses.length) {
                for (let requestedFreeBlock of requestedFreeBlocks) {
                    if (!ScheduleMaker.checkScheduleIntersect(newSchedule, requestedFreeBlock)) {
                        newSchedule.score += requestedFreeBlock.priority;
                    }
                }
                allSchedules.push(newSchedule);
            } else {
                this.findSchedulesRecursively(requestedCourses, requestedFreeBlocks, newSchedule, allSchedules);
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
}
