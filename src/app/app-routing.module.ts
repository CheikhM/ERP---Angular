import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFound } from './components/404-not-found/404-not-found.component';

// todo lazy loading
const routes: Routes = [
  { path: 'tasks', loadChildren: './modules/tasks/task.module#TaskModule' },
  { path: '', component: DashboardComponent },
  { path: '**', component: PageNotFound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: []
})
export class AppRoutingModule { }
