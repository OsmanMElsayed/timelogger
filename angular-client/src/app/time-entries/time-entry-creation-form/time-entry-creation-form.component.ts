import * as moment from 'moment';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeEntriesService } from '../time-entries.service';
import { TimeEntry } from '../time-entry.model';
import { Project } from 'src/app/projects/project.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-time-entry-creation-form',
    templateUrl: './time-entry-creation-form.component.html'
})
export class TimeEntryCreationFormComponent implements OnInit, OnDestroy {

    private activatedRouteDataSubscription: Subscription = null;

    timeEntryCreationForm: FormGroup = null;
    project: Project = null;

    constructor(private formBuilder: FormBuilder,
                private timeEntriesService: TimeEntriesService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {

        this.timeEntryCreationForm = this.formBuilder.group({
            numberOfDays: [0, [Validators.required, Validators.min(0)]],
            numberOfHours: [0, [Validators.required, Validators.min(0), Validators.max(23)]],
            numberOfMinutes: [0, [Validators.required, Validators.min(0), Validators.max(59)]],
            memo: [null]
        });
    }

    ngOnInit(): void {
        this.activatedRouteDataSubscription = this.activatedRoute.data.subscribe((data: {project: Project}) => {
            this.project = data.project;
        });
    }

    ngOnDestroy(): void {
        this.activatedRouteDataSubscription.unsubscribe();
    }

    create(): void {

        if (!this.timeEntryCreationForm.valid) {
            return;
        }

        const timeEntry: TimeEntry = {
            id: 0,
            projectId: this.project.id,
            duration: moment.duration({
                days: this.timeEntryCreationForm.value.numberOfDays,
                hours: this.timeEntryCreationForm.value.numberOfHours,
                minutes: this.timeEntryCreationForm.value.numberOfMinutes,
            }),
            memo: this.timeEntryCreationForm.value.memo
        };

        this.timeEntriesService.create(timeEntry).subscribe(() => {
            this.router.navigate(['/projects', this.project.id]);
        });
    }

}
