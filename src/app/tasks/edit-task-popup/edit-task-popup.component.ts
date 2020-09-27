import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgModel} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { User } from 'src/app/auth/models/user.model';
import { DateHelper } from 'src/app/core/helpers/date.helper';
import { NotificationService } from 'src/app/notification/notification.service';
import { SharedService } from 'src/app/shared/shared.service';
import { AuthService } from '../../auth/auth.service';
import { Task } from '../models/task.model';
import { TasksService } from '../tasks.service';


declare var $: any;

@Component({
  selector: 'app-edit-task-popup',
  templateUrl: './edit-task-popup.component.html',
  styleUrls: ['./edit-task-popup.component.scss']
})

export class EditTaskPopupComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  title: string;

  @Input()
  task: Task;

  @Output() onExitModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  taskCopy: Task;

  users: User [];


  constructor(private taskService: TasksService,
              private toastrService: ToastrService,
              private sharedService: SharedService,
              private authService: AuthService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.getAllUsers();
  }

  // Retrieve all users
  getAllUsers() {
    this.authService.getAllUsers().subscribe(users => this.users = users);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.task) {
      this.taskCopy = {...this.task};
    }
  }

  restoreModal() {
    this.onExitModal.emit(true);
  }

  isEmpty(model: NgModel) {
    return this.isNotValid(model) && model.errors.required;
  }

  isNotValid(model: NgModel) {
    return model.invalid && (model.dirty || model.touched);
  }

  ngOnDestroy(): void {
  }

  saveTask() {
    const createdAt = !this.taskCopy.createdAt ? DateHelper.getDateTime(new Date()) : this.taskCopy.createdAt;
    const copyToSend: Task = {
      ...this.taskCopy,
      createdAt,
    };
    // delete unused object
    delete copyToSend.createdAt;

    // adding new project
    if (this.title === 'Add Task') {

      this.taskService.newTask(copyToSend).subscribe(
        result => {
          if (result['status'] === '200_OK' && result['data'].tid) {
            // tell the project about new data update
            $('#newTask').modal('hide');
            this.sharedService.setNewUpdate(true);
            this.toastrService.success('', 'Successfully added');
            this.notifyUser(result['data'].tid, this.taskCopy.user.id);
          } else {
            this.toastrService.error('', 'An error was occurred');
          }
        },
        error => this.toastrService.error('', 'An error was occurred'),
        () => {
          this.onExitModal.emit(true);
        }
      );
    } else if (this.title === 'Edit Task') {

      this.taskService.updateTask(copyToSend).subscribe(
        result => {
          if (result['status'] === '200_OK' && result['data'].tid) {
            $('#newTask').modal('hide');
            // tell the project about new data update
            this.sharedService.setNewUpdate(true);
            this.toastrService.success('', 'Successfully updated');

            if (copyToSend.user.id !== this.task.user.id) {
              this.notifyUser(result['data'].tid, copyToSend.user.id, this.task.user.id);
            }

          } else {
            this.toastrService.error('', 'An error was occurred');
          }
        },
        error => this.toastrService.error('', 'An error was occurred'),
        () => {
          this.onExitModal.emit(true);
        }
      );
    }
  }


  // Send notifcation to user when creating project
  notifyUser(taskID: number, userID: number, oldUserID = null) {
    const user = this.users.find(item => item.id == userID);

    const data = {
      code: 1216,
      id: taskID,
    }
    this.notificationService.notifyUser(data).subscribe();

    // Notify that task is unassigned
    if (oldUserID) {
      const oldUser = this.users.find(item => item.id == oldUserID);
      const oldUserEmail = oldUser ? oldUser.email : 'saud@dardelta.com.sa';
      data.code = 1217;
      this.notificationService.notifyUser(data).subscribe();
    }
  }


}
