import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import * as moment from 'moment';
import { TimeEntry } from '../time-entry.model';
import { TimeEntriesListComponent } from './time-entries-list.component';
import { TimeEntriesService } from '../time-entries.service';

describe('TimeEntriesListComponent', () => {
    let component: TimeEntriesListComponent;
    let fixture: ComponentFixture<TimeEntriesListComponent>;

    let timeEntriesServiceSpy: jasmine.SpyObj<TimeEntriesService>;

    const expectedTimeEntries: TimeEntry[] = [
        {
            id: 1,
            projectId: 11,
            duration: moment.duration({ days: 1, hours: 21, minutes: 2 }),
            memo: 'Memo'
        },
        {
            id: 2,
            projectId: 22,
            duration: moment.duration({ days: 0, hours: 2, minutes: 2 })
        },
    ];

    beforeEach(async(() => {
        timeEntriesServiceSpy = jasmine.createSpyObj('TimeEntriesService', ['getByProjectId']);
        timeEntriesServiceSpy.getByProjectId.and.returnValue(of(expectedTimeEntries));

        TestBed.configureTestingModule({
          declarations: [ TimeEntriesListComponent ],
          providers: [
              { provide: TimeEntriesService, useValue: timeEntriesServiceSpy }
          ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimeEntriesListComponent);
        component = fixture.componentInstance;
    });

    describe('ngOnInit()', () => {

        beforeEach(() => {
            // act
            component.ngOnInit();
        });

        it('should set the timeEntries property to the value obtained from the TimeEntriesService', () => {
            // assert
            expect(component.timeEntries).toBe(expectedTimeEntries);
        });

        it('should calculate the total duration and set the totalDuration property value', () => {
            // arrange
            const expectedDuration = moment.duration({ days: 1, hours: 23, minutes: 4 })
                .toJSON();

            // assert
            expect(component.totalDuration.toJSON()).toEqual(expectedDuration);
        });

    });
});
