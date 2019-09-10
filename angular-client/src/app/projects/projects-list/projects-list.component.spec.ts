import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import * as moment from 'moment';
import { ProjectsListComponent } from './projects-list.component';
import { ProjectsService } from '../projects.service';
import { Project } from '../project.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectListItemComponent } from '../project-list-item/project-list-item.component';

describe('ProjectsListComponent', () => {
    let component: ProjectsListComponent;
    let fixture: ComponentFixture<ProjectsListComponent>;

    let projectsServiceSpy: jasmine.SpyObj<ProjectsService>;

    const expectedProjects: Project[] = [
        {
            id: 1,
            title: 'project-1',
            customer: 'customer-1',
            dueDate: moment()
        },
        {
            id: 2,
            title: 'project-2',
            customer: 'customer-2',
            dueDate: moment()
        }
    ];

    beforeEach(async(() => {
        projectsServiceSpy = jasmine.createSpyObj('ProjectsService', ['getProjects']);
        projectsServiceSpy.getProjects.and.returnValue(of(expectedProjects));

        TestBed.configureTestingModule({
          declarations: [ ProjectsListComponent, ProjectListItemComponent ],
          imports: [SharedModule, RouterTestingModule.withRoutes([])],
          providers: [
              { provide: ProjectsService, useValue: projectsServiceSpy }
          ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectsListComponent);
        component = fixture.componentInstance;
    });

    describe('ngOnInit()', () => {

        it('should set the projects property to the value obtained from the ProjectsService', () => {
            // act
            component.ngOnInit();

            // assert
            expect(component.projects).toBe(expectedProjects);
        });

    });
});
