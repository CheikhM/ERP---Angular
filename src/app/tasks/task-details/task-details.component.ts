import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TasksService} from '../tasks.service';
import {Task} from '../models/task.model';
import { SharedService } from 'src/app/shared/shared.service';


declare var $: any;

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
    this.owner = 'Ahmed salem';
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
