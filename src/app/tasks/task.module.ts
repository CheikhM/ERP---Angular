import { NgModule } from '@angular/core';
import { TasksComponent } from './tasks.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { EditTaskPopupComponent } from './edit-task-popup/edit-task-popup.component';
import { TaskRoutingModule } from './task-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from './task.reducer';

@NgModule({
  declarations: [
    TasksComponent,
    TaskDetailsComponent,
    EditTaskPopupComponent,
  ],
  imports: [
    TaskRoutingModule,
    SharedModule,
    DragDropModule,
    StoreModule.forFeature('task', taskReducer)
  ]
})
export class TaskModule { }
