import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

const routes: Routes = [
  { path: 'all', component: TasksComponent},
  { path: 'task/' + ':id', component: TaskDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class TaskRoutingModule {}
