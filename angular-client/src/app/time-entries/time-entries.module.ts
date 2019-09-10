import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { TimeEntryCreationFormComponent } from './time-entry-creation-form/time-entry-creation-form.component';
import { SharedModule } from '../shared/shared.module';
import { TimeEntriesService } from './time-entries.service';
import { TimeEntriesListComponent } from './time-entries-list/time-entries-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [TimeEntryCreationFormComponent, TimeEntriesListComponent],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule
    ],
    providers: [TimeEntriesService],
    exports: [TimeEntriesListComponent]
})
export class TimeEntriesModule { }
