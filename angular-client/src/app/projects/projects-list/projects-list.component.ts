import { Component, OnInit } from '@angular/core';
import { Project } from '../project.model';
import { ProjectsService } from '../projects.service';

@Component({
    selector: 'app-projects-list',
    templateUrl: './projects-list.component.html'
})
export class ProjectsListComponent implements OnInit {

    projects: Project[] = [];

    constructor(private projectsService: ProjectsService) {
    }

    ngOnInit(): void {
        this.projectsService.getProjects().subscribe(p => {
            this.projects = p
        });
    }

}
