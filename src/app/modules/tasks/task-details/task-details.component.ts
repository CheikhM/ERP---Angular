import {Component, OnInit} from '@angular/core';
import {Task} from '../../../models/task.model';
import {ActivatedRoute} from '@angular/router';
import {SharedService} from '../../../services/shared.service';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {TasksService} from '../../../services/tasks.service';
import { AuthService } from 'src/app/services/auth.service';
import {User} from '../../../models/user.model';

declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})

export class TaskDetailsComponent implements OnInit {

  readonly currentTaskId: number;
  owner: string;
  task = Task.getEmptyTask();

  constructor(private route: ActivatedRoute,
              private sharedService: SharedService,
              private taskService: TasksService,
              private authService: AuthService) {
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
        () => {
          this.getTaskOwner(this.task.owner);
        }
      );

      return true;
    }
  }

  getTaskOwner(id: number): void {
    this.authService.getUserByID(id).subscribe(result => {
      if (result && result.status === '200_OK') {
        const user = new User(result['data']);
        this.owner = user.name;
      }
    })

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