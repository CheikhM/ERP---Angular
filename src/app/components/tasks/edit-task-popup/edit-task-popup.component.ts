import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgModel} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {SalesService} from '../../../services/sales.service';
import {ToastrService} from 'ngx-toastr';
import {SharedService} from '../../../services/shared.service';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {Task} from '../../../models/task.model';
import {TasksService} from '../../../services/tasks.service';
import {DateHelper} from '../../../helpers/date.helper';
import { User } from 'src/app/models/user.model';
import { NotificationService } from 'src/app/services/notification.service';


declare var $: any;

@AutoUnsubscribe()

@Component({
  selector: 'app-edit-task-popup',
  templateUrl: './edit-task-popup.component.html',
  styleUrls: ['./edit-task-popup.component.css']
})

export class EditTaskPopupComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  title: string;

  @Input()
  task: any = Task.getEmptyTask();

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
    this.taskCopy = Task.getEmptyTask();
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
    const copyToSend = {
      ...this.taskCopy,
      created_at: createdAt,
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
            this.notifyUser(result['data'].tid, this.taskCopy.owner);
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
  notifyUser(taskID: number, userID: number) {
    const owner = this.users.find(item => item.id == userID);

    const ownerEmail = owner ? owner.email : 'saud@dardelta.com.sa';
    const data = {
      code: 1216,
      id: taskID,
      email: ownerEmail,
    }



    this.notificationService.notifyUser(data).subscribe(result => {
      console.log(result);

    });
  }


}
