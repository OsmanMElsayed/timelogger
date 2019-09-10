import * as moment from 'moment';

export class Project {
    id: number;
    title: string;
    dueDate: moment.Moment;
    customer: string;
}