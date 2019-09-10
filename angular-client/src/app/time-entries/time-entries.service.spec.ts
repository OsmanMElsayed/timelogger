import { TestBed, inject, async } from '@angular/core/testing';
import * as moment from 'moment';
import { TimeEntriesService } from './time-entries.service';
import { TimeEntry } from './time-entry.model';

describe('TimeEntriesService', () => {

    beforeEach(() => TestBed.configureTestingModule({
        providers: [TimeEntriesService]
    }));

    describe('create()', () => {

        it('should return an abservable that emits true', async(inject([TimeEntriesService], (timeEntriesService: TimeEntriesService) => {
            // arrange
            const timeEntry: TimeEntry = {
                id: 1,
                projectId: 2,
                duration: moment.duration({ days: 3 })
            };

            // act
            timeEntriesService.create(timeEntry).subscribe(result => {
                // assert
                expect(result).toBeTruthy();
            });
        })));
    });

    describe('getByProjectId()', () => {

        it('should return the expected time entries', async(inject([TimeEntriesService], (timeEntriesService: TimeEntriesService) => {
            // act
            timeEntriesService.getByProjectId(1).subscribe(t => {
                // assert
                expect(t.length).toBe(1);
                expect(t[0].id).toBe(1);
            });
        })));
    });
});
