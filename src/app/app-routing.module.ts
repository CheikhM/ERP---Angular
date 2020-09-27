import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFound } from './shared/404-not-found/404-not-found.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';


// todo lazy loading
const routes: Routes = [
  { path: 'tasks', loadChildren: () => import('./tasks/task.module').then(m => m.TaskModule) },
  { path: '', component: DashboardComponent },
  { path: '**', component: PageNotFound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: []
})
export class AppRoutingModule { }
