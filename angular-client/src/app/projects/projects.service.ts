import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from './project.model';

@Injectable()
export class ProjectsService {

    private projects: Project[] = [
        { 
            id: 1,
            title: "Logo Design",
            customer: "Company A",
            dueDate: moment({ year: 2019, month: 8, day: 10, hour: 1, minutes: 44 })
        },
        { 
            id: 2,
            title: "Website",
            customer: "Company B",
            dueDate: moment({ year: 2019, month: 9, day: 10, hour: 4, minutes: 44 })
        },
        { 
            id: 3,
            title: "ERP",
            customer: "Company C",
            dueDate: moment({ year: 2022, month: 8, day: 10, hour: 4, minutes: 44 })
        },
        { 
            id: 4,
            title: "Consultancy",
            customer: "Company D",
            dueDate: moment({ year: 2019, month: 1, day: 10, hour: 4, minutes: 44 })
        },
    ];

    getProjects(): Observable<Project[]> {
        return of(this.projects)
    }

    getProject(id: number): Observable<Project> {
        const project: Project = this.projects.find(p => p.id === id);

        return of(project);
    }
}
