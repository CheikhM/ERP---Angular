import {Component, OnInit} from '@angular/core';
import {Task} from '../../../models/task.model';
import {ActivatedRoute} from '@angular/router';
import {SharedService} from '../../../services/shared.service';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {TasksService} from '../../../services/tasks.service';

declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})

export class TaskDetailsComponent implements OnInit {

  readonly currentTaskId: number;

  task = Task.getEmptyTask();

  constructor(private route: ActivatedRoute,
              private sharedService: SharedService,
              private taskService: TasksService) {
    // get the current visit id
    this.currentTaskId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.sharedService.setworkflowID(this.currentTaskId);

  }

  ngOnInit() {
    this.sharedService.setCurrentWorkflowPath('/tasks/task/');

    this.getCurrentTask();
    // check for new update
    this.sharedService.getNewUpdate().subscribe(update => {
      if (update) {
        this.getCurrentTask(true);
      }
    });
  }

  private getCurrentTask(remote = null) {
    // if no current task was found
    // todo replace true with "remote"
    if (true) {
      this.taskService.getTaskByID(this.currentTaskId).subscribe(
        result => {
          if (result && result.status === '200_OK') {
            this.task = new Task(result.data);
          }
        },
        error => {},
        () => {}
      );

      return true;
    }
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
