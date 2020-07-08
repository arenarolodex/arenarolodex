import { createContext, useContext } from 'react';

import CourseStore, { CourseStoreHTTPTransport } from '@/state/CourseStore';
import ScheduleStore from '@/state/ScheduleStore';

export const ApplicationContext = createContext({} as RootStore); 
export function useApplicationContext() {
    return useContext(ApplicationContext);
}

export default class RootStore {
    courseStore: CourseStore;
    scheduleStore: ScheduleStore;

    constructor() {
        this.courseStore = new CourseStore(this, new CourseStoreHTTPTransport());
        this.scheduleStore = new ScheduleStore(this);
    }
}
