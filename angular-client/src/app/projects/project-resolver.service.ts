import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { Project } from './project.model';
import { ProjectsService } from './projects.service';

@Injectable()
export class ProjectResolverService implements Resolve<Project> {

    constructor(private router: Router, private projectsService: ProjectsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Project> | Observable<never> {
        const projectId: number = parseFloat(route.paramMap.get('id'));

        return this.projectsService.getProject(projectId).pipe(
            take(1),
            mergeMap(project => {
                if (project) {
                    return of(project);
                } else {
                    this.router.navigate(['/crisis-center']);
                    return;
                }
            })
        );
    }
}
