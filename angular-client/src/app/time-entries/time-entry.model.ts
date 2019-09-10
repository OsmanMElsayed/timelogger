import * as moment from 'moment';

export class TimeEntry {
    id: number;
    projectId: number;
    duration: moment.Duration;
    memo?: string;
}