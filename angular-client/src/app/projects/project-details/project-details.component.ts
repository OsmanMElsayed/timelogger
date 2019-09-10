import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../project.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html'
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
    
    private activatedRouteDataSubscription: Subscription;

    project: Project = null;

    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.activatedRouteDataSubscription = this.activatedRoute.data.subscribe((data: {project: Project}) => {
            this.project = data.project;
        });
    }

    ngOnDestroy(): void {
        this.activatedRouteDataSubscription.unsubscribe();
    }
}
