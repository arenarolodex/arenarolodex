import { action, observable } from 'mobx';

import RootStore from '@/state/RootStore';

type JSONAnnouncer = {
  [department: string]: {
    [course: string]: {
      [teacher: string]: [string, string, string][]
    }
  }
}

export type CourseInstance = {
  block: number
  semester: '1' | '2' | 'Both'
  seats: number
  teacher: string
}

export type Announcer = {
  [department: string]: {
    [course: string]: CourseInstance[]
  }
}

interface ICourseStoreTransportLayer {
  fetchAnnouncer: () => Promise<JSONAnnouncer>
}

export class CourseStoreHTTPTransport implements ICourseStoreTransportLayer {
  announcer_url = process.env.GATSBY_COURSES_API || '/announcer.json';

  fetchAnnouncer(): Promise<JSONAnnouncer> {
    return fetch(this.announcer_url)
      .then(resp => resp.json());
  }
}

export enum Status {
  PENDING,
  SUCCESS,
  ERROR
}

export default class CourseStore {
  rootStore: RootStore;
  transportLayer: ICourseStoreTransportLayer;

  @observable status: Status = Status.PENDING
  @observable announcer: Announcer = {};

  constructor(rootStore: RootStore, transportLayer: ICourseStoreTransportLayer) {
    this.rootStore = rootStore;
    this.transportLayer = transportLayer;

    this.transportLayer.fetchAnnouncer()
      .then(action('fetchAnnouncerSuccess', jsonAnnouncer => {
        this.status = Status.SUCCESS;
        this.announcer = this.transformAnnouncer(jsonAnnouncer);
      }))
      .catch(action('fetchAnnouncerError', err => {
        this.status = Status.ERROR;
      }));
  }

  transformAnnouncer(jsonAnnouncer: JSONAnnouncer): Announcer {
    const announcer: Announcer = {};
    for (let department of Object.keys(jsonAnnouncer)) {
      announcer[department] = {};
      for (let course of Object.keys(jsonAnnouncer[department])) {
        announcer[department][course] = [];
        for (let teacher of Object.keys(jsonAnnouncer[department][course])) {
          for (let jsonCourseInstance of jsonAnnouncer[department][course][teacher]) {
            announcer[department][course].push({
              block: parseInt(jsonCourseInstance[0]),
              semester: jsonCourseInstance[1] as ('1' | '2' | 'Both'),
              seats: parseInt(jsonCourseInstance[2]),
              teacher
            });
          }
        }
      }
    }
    return announcer;
  }
}
