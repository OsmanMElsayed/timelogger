import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import * as moment from 'moment';
import { ProjectDetailsComponent } from './project-details.component';
import { Project } from '../project.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimeEntriesModule } from 'src/app/time-entries/time-entries.module';

describe('ProjectDetailsComponent', () => {
    let component: ProjectDetailsComponent;
    let fixture: ComponentFixture<ProjectDetailsComponent>;

    const expectedProject: Project = {
        id: 1,
        title: 'project',
        customer: 'customer',
        dueDate: moment()
    };

    const activatedRouteStub = {
        data: of({ project: expectedProject })
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ProjectDetailsComponent ],
            imports: [RouterTestingModule.withRoutes([]), SharedModule, TimeEntriesModule],
            providers: [
                { provide: ActivatedRoute, useValue: activatedRouteStub }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('ngOnInit()', () => {

        it('should set the project property to the expected project value', () => {
            // act
            component.ngOnInit();

            // assert
            expect(component.project).toBe(expectedProject);
        });

    });
});
