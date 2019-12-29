import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HeaderComponent} from './components/shared/header/header.component';
import {ProjectsListComponent} from './components/projects/projects-list/projects-list.component';


const routes: Routes = [
  { path: 'projects/all', component: ProjectsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
