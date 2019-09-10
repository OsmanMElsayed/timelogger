import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import * as moment from 'moment';
import { ProjectListItemComponent } from './project-list-item.component';
import { Project } from '../project.model';

describe('ProjectListItemComponent', () => {
    let component: ProjectListItemComponent;
    let fixture: ComponentFixture<ProjectListItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ProjectListItemComponent ],
            imports: [RouterTestingModule.withRoutes([])]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectListItemComponent);
        component = fixture.componentInstance;
    });

    describe('get dueDateFromNow()', () => {

        it('should return a valid momentJS from now value', () => {
            // arrange
            const project: Project = {
                id: 1,
                title: 'project',
                customer: 'customer',
                dueDate: moment()
            };
            component.project = project;
            
            // act
            const result: string = component.dueDateFromNow;

            // assert
            expect(result).toBe(project.dueDate.fromNow());
        });
        
    });
});
