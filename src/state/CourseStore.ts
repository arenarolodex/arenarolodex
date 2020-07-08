import { action, observable } from 'mobx';

import * as _ from 'lodash';

type JSONAnnouncer = {
    [department: string]: {
        [course: string]: {
            [teacher: string]: [string, string, string][]
        }
    }
}

type Announcer = {
    [department: string]: {
        [course: string]: {
            [teacher: string]: {
                block: number
                room: string
                seats: number
            }[]
        }
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

enum Status {
    PENDING,
    SUCCESS,
    ERROR
}

export default class CourseStore {
    @observable status: Status = Status.PENDING
    @observable announcer: Announcer;

    transportLayer: ICourseStoreTransportLayer;

    constructor(transportLayer: ICourseStoreTransportLayer) {
        this.transportLayer = transportLayer;

        this.transportLayer.fetchAnnouncer()
            .then(action('fetchAnnouncerSuccess', jsonAnnouncer => {
                this.status = Status.SUCCESS;
                this.announcer = this.transformAnnouncer(jsonAnnouncer);
            }))
            .catch(action('fetchAnnouncerError', err => {
                console.error(err);
                this.status = Status.ERROR;
            }));
    }

    transformAnnouncer(jsonAnnouncer: JSONAnnouncer): Announcer {
        const announcer: Announcer = {};
        for (let department of Object.keys(jsonAnnouncer)) {
            announcer[department] = {};
            for (let course of Object.keys(jsonAnnouncer[department])) {
                announcer[department][course] = {};
                for (let teacher of Object.keys(jsonAnnouncer[department][course])) {
                    announcer[department][course][teacher] = [];
                    for (let i in jsonAnnouncer[department][course][teacher]) {
                        const jsonCourseInstance = jsonAnnouncer[department][course][teacher][i];
                        announcer[department][course][teacher][i] = {
                            block: parseInt(jsonCourseInstance[0]),
                            room: jsonCourseInstance[1],
                            seats: parseInt(jsonCourseInstance[2])
                        };
                    }
                }
            }
        }
        return announcer;
    }
}
