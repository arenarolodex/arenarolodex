import CourseStore, { CourseStoreHTTPTransport } from '@/state/CourseStore';
import ScheduleStore from '@/state/ScheduleStore';


export default class RootStore {
    courseStore: CourseStore;
    scheduleStore: ScheduleStore;

    constructor() {
        this.courseStore = new CourseStore(this, new CourseStoreHTTPTransport());
        this.scheduleStore = new ScheduleStore(this);
    }
}
