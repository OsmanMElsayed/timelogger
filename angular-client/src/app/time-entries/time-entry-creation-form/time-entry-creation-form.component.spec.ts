import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import * as moment from 'moment';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimeEntry } from '../time-entry.model';
import { TimeEntriesService } from '../time-entries.service';
import { TimeEntryCreationFormComponent } from './time-entry-creation-form.component';
import { Project } from 'src/app/projects/project.model';

describe('TimeEntryCreationFormComponent', () => {
    let component: TimeEntryCreationFormComponent;
    let fixture: ComponentFixture<TimeEntryCreationFormComponent>;

    const expectedProject: Project = {
        id: 1,
        title: 'project',
        customer: 'customer',
        dueDate: moment()
    };

    const activatedRouteStub = {
        data: of({ project: expectedProject })
    };

    let timeEntriesServiceSpy: jasmine.SpyObj<TimeEntriesService>;

    beforeEach(async(() => {
        timeEntriesServiceSpy = jasmine.createSpyObj('TimeEntriesService', ['create']);
        timeEntriesServiceSpy.create.and.returnValue(of(true));

        TestBed.configureTestingModule({
            declarations: [ TimeEntryCreationFormComponent ],
            imports: [
                SharedModule,
                RouterTestingModule.withRoutes([]),
                ReactiveFormsModule
            ],
            providers: [
                { provide: TimeEntriesService, useValue: timeEntriesServiceSpy },
                { provide: ActivatedRoute, useValue: activatedRouteStub }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimeEntryCreationFormComponent);
        component = fixture.componentInstance;
    });

    describe('constructor()', () => {

        it('should populate the timeEntryCreationForm proprty with the numberOfDays field', () => {
            // assert
            expect(component.timeEntryCreationForm.controls.numberOfDays.value).toBe(0);
        });

        it('should populate the timeEntryCreationForm proprty with the numberOfHours field', () => {
            // assert
            expect(component.timeEntryCreationForm.controls.numberOfHours.value).toBe(0);
        });

        it('should populate the timeEntryCreationForm proprty with the numberOfMinutes field', () => {
            // assert
            expect(component.timeEntryCreationForm.controls.numberOfMinutes.value).toBe(0);
        });

        it('should populate the timeEntryCreationForm proprty with the memo field', () => {
            // assert
            expect(component.timeEntryCreationForm.controls.memo.value).toBe(null);
        });

    });

    describe('ngOnInit()', () => {

        it('should set the project property to the expected project value', () => {
            // act
            component.ngOnInit();

            // assert
            expect(component.project).toBe(expectedProject);
        });

    });

    describe('create()', () => {

        describe('when the numberOfDays is invalid', () => {

            it('should not create a new time entry', () => {
                // arrange
                component.timeEntryCreationForm.controls.numberOfDays
                    .setValue(-1);

                // act
                component.create();

                // assert
                expect(timeEntriesServiceSpy.create.calls.count()).toBe(0);
            });

        });

        describe('when the numberOfHours is invalid', () => {

            it('should not create a new time entry', () => {
                // arrange
                component.timeEntryCreationForm.controls.numberOfHours
                    .setValue(25);

                // act
                component.create();

                // assert
                expect(timeEntriesServiceSpy.create.calls.count()).toBe(0);
            });

        });

        describe('when the numberOfMinutes is invalid', () => {

            it('should not create a new time entry', () => {
                // arrange
                component.timeEntryCreationForm.controls.numberOfMinutes
                    .setValue(61);

                // act
                component.create();

                // assert
                expect(timeEntriesServiceSpy.create.calls.count()).toBe(0);
            });

        });

        describe('when the form is valid', () => {

            beforeEach(() => {
                component.ngOnInit();
            });

            it('should create a new time entry', () => {
                // arrange
                component.timeEntryCreationForm.controls.numberOfDays
                    .setValue(2);
                component.timeEntryCreationForm.controls.numberOfHours
                    .setValue(5);
                component.timeEntryCreationForm.controls.numberOfMinutes
                    .setValue(13);
                component.timeEntryCreationForm.controls.memo
                    .setValue('memo');

                // act
                component.create();

                const timeEntry: TimeEntry = timeEntriesServiceSpy.create.calls.first().args[0];

                // assert
                expect(timeEntry).toEqual({
                    id: 0,
                    projectId: expectedProject.id,
                    duration: moment.duration({ days: 2, hours: 5, minutes: 13 }),
                    memo: 'memo'
                });
            });

            it('should navigate to the project details route', inject([Router], (router: Router) => {
                // arrange
                const routerNavigateSpy: jasmine.Spy = spyOn(router, 'navigate');

                // act
                component.create();

                // assert
                expect(routerNavigateSpy.calls.first().args[0])
                    .toEqual(['/projects', expectedProject.id]);
            }));

        });

    });
});
