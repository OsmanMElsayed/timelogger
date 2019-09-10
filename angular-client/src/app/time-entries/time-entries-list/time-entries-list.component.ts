import * as moment from 'moment';
import { Component, OnInit, Input } from '@angular/core';
import { TimeEntry } from '../time-entry.model';
import { TimeEntriesService } from '../time-entries.service';

@Component({
    selector: 'app-time-entries-list',
    templateUrl: './time-entries-list.component.html'
})
export class TimeEntriesListComponent implements OnInit {

    timeEntries: TimeEntry[] = [];

    totalDuration: moment.Duration = null;

    @Input()
    projectId: number = null;

    constructor(private timeEntriesService: TimeEntriesService) {
    }

    ngOnInit(): void {
        this.timeEntriesService.getByProjectId(this.projectId)
            .subscribe(timeEntries => {
                this.timeEntries = timeEntries
                this.totalDuration = timeEntries.reduce((previousValue: moment.Duration, currentValue: TimeEntry) => {
                    return previousValue.add(currentValue.duration);
                }, moment.duration(0));
            });
    }

    formatTimeEntryDuration(duration: moment.Duration): string {
        return `${duration.days()} days, ${duration.hours()} hours and ${duration.minutes()} minutes`;
    }

}
