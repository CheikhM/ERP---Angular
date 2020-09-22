import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SharedService} from '../../../services/shared.service';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {TasksService} from '../tasks.service';
import {Task} from '../models/task.model';
import * as actions from '../task.actions';
import * as fromTask from '../task.reducer';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})

export class TaskDetailsComponent implements OnInit {

  readonly currentTaskId: number = parseInt(this.route.snapshot.paramMap.get('id'), 10);
  owner: string;
  task: Task;

  constructor(private route: ActivatedRoute,
              private sharedService: SharedService,
              private taskService: TasksService) {
  }

  ngOnInit() {
    this.sharedService.setCurrentWorkflowPath('/tasks/task/');
    this.sharedService.setworkflowID(this.currentTaskId);

    this.getCurrentTask();
    // check for new update
    this.sharedService.getNewUpdate().subscribe(update => {
      if (update) {
        this.getCurrentTask();
      }
    });



  }

  private getCurrentTask(): void {
      this.taskService.getTaskByID(this.currentTaskId).subscribe(
        task => {
          if(task && task.id) {
            this.task = task;
          }
        });
  }

  getTaskOwner(id: number): void {
    this.owner = 'Ahmed salem'
    /*
    this.authService.getUserByID(id).subscribe(result => {
      if (result && result.status === '200_OK') {
        const user = new User(result['data']);
        this.owner = user.name;
      }
    })
  */
  }


  confirmTaskDelete($event: any) {

  }

  triggerTaskEdit() {
    $('#newTask').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  confirmUserDelete($event: any) {

  }
}
