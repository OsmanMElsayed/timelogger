import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { TimeEntryCreationFormComponent } from './time-entries/time-entry-creation-form/time-entry-creation-form.component';
import { ProjectResolverService } from './projects/project-resolver.service';

const routes: Routes = [
    {
        path: 'projects',
        component: ProjectsListComponent
    },
    {
        path: 'projects/:id',
        component: ProjectDetailsComponent,
        resolve: {
            project: ProjectResolverService
        }
    },
    {
        path: 'projects/:id/timeentries/new',
        component: TimeEntryCreationFormComponent,
        resolve: {
            project: ProjectResolverService
        }
    },
    { path: '', redirectTo: '/projects', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
