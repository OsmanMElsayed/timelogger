import { TestBed, inject, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import * as moment from 'moment';
import { ProjectResolverService } from './project-resolver.service';
import { ProjectsService } from './projects.service';
import { Project } from './project.model';

describe('ProjectResolverService', () => {

    let routerSpy: jasmine.SpyObj<Router>;
    let projectsServiceSpy: jasmine.SpyObj<ProjectsService>;

    const expectedProject: Project = {
        id: 1,
        title: 'project',
        customer: 'customer',
        dueDate: moment()
    };

    beforeEach(() => {
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);
        projectsServiceSpy = jasmine.createSpyObj('ProjectsService', ['getProject']);

        TestBed.configureTestingModule({
            providers: [
                ProjectResolverService,
                { provide: ProjectsService, useValue: projectsServiceSpy },
                { provide: Router, useValue: routerSpy }
            ]
        });
    });

    describe('resolve()', () => {

        const activatedRouteSnapshot: any = {
            paramMap: jasmine.createSpyObj('ParamMap', ['get'])
        };

        activatedRouteSnapshot.paramMap.get.withArgs('id')
            .and.returnValue('1');

        describe('when a project is found', () => {
            it('should return the expected project', async(inject([ProjectResolverService],
                (projectResolverService: ProjectResolverService) => {
                // arrange
                projectsServiceSpy.getProject.withArgs(1)
                    .and.returnValue(of(expectedProject));

                // act
                projectResolverService.resolve(activatedRouteSnapshot, null).subscribe(p => {
                    // assert
                    expect(p).toBe(expectedProject);
                });
            })));
        });

        describe('when a project is not found', () => {
            it('should navigate to the projects list route', async(inject([ProjectResolverService],
                (projectResolverService: ProjectResolverService) => {
                // arrange
                projectsServiceSpy.getProject.withArgs(1)
                    .and.returnValue(of(null));

                // act
                projectResolverService.resolve(activatedRouteSnapshot, null).subscribe(p => {
                    // assert
                    expect(routerSpy.navigate.calls.first().args[0]).toEqual(['/projects']);
                });
            })));
        });
    });
});
