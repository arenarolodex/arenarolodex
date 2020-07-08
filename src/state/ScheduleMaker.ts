import CourseStore from '@/state/CourseStore';

type RequestedCourseInstance = {
    department?: string;
    course?: string;
    preferredTeacher?: string;
    preferredBlock?: number;
}

class ScheduleMaker {
    courseStore: CourseStore;

    constructor(courseStore: CourseStore) {
        this.courseStore = courseStore;
    }

    makeSchedule() {

    }
}
