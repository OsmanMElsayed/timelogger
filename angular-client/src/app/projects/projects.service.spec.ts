import { TestBed, inject, async } from '@angular/core/testing';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [ProjectsService]
    }));

    describe('getProjects()', () => {

        it('should return 4 projects', async(inject([ProjectsService], (projectsService: ProjectsService) => {
            // act
            projectsService.getProjects().subscribe(p => {
                // assert
                expect(p.length).toBe(4);
            });
        })));
      
    });

    describe('getProject()', () => {

        it('should return the expected project', async(inject([ProjectsService], (projectsService: ProjectsService) => {
            // act
            projectsService.getProject(1).subscribe(p => {
                // assert
                expect(p.id).toBe(1);
            });
        })));
      
    });
});
