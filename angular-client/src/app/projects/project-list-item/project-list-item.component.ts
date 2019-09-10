import * as moment from 'moment';
import { Component, Input } from '@angular/core';
import { Project } from '../project.model';

@Component({
    selector: 'app-project-list-item',
    templateUrl: './project-list-item.component.html'
})
export class ProjectListItemComponent {

    @Input()
    project: Project;

    get dueDateFromNow(): string {
        return this.project.dueDate.fromNow();
    }

}
