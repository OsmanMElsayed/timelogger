import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { TimeEntry } from './time-entry.model';
import { Observable, of } from 'rxjs';

@Injectable()
export class TimeEntriesService {

    private timeEntries: TimeEntry[] = [
        {
            id: 1,
            projectId:1,
            duration: moment.duration({ days: 2, hours: 3 }),
            memo: 'Logo design'
        }
    ];

    create(timeEntry: TimeEntry): Observable<boolean> {
        this.timeEntries.push(timeEntry);

        return of(true);
    }

    getByProjectId(projectId: number): Observable<TimeEntry[]> {
        const projectTimeEntries = this.timeEntries.filter(t => t.projectId === projectId);

        return of(projectTimeEntries);
    }

}
