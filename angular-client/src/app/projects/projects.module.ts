import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectListItemComponent } from './project-list-item/project-list-item.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectsService } from './projects.service';
import { RouterModule } from '@angular/router';
import { ProjectResolverService } from './project-resolver.service';
import { TimeEntriesModule } from '../time-entries/time-entries.module';

@NgModule({
  declarations: [ProjectsListComponent, ProjectListItemComponent, ProjectDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    TimeEntriesModule
  ],
  providers: [ProjectsService, ProjectResolverService]
})
export class ProjectsModule { }
