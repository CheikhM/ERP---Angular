import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {TasksService} from './tasks.service'
import { ConfirmBoxComponent } from '../shared/confirm-box/confirm-box.component';
import { MatDialog } from '@angular/material';
import { Task } from './models/task.model';

declare var $: any;

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {


  filteredTasks: any;

  metaDefinition = [
    {text: 'Title', attribute: 'title', type: 'PLString'},
    {text: 'Priority', attribute: 'priority', type: 'PLString'},
    {text: 'Status', attribute: 'status', type: 'string'},
    {text: 'Created at', attribute: 'createdAt', type: 'date'},
  ];

  tasks: Task [];
  manageAction = 'Add Task';
  taskTobeManaged: Task;
  private toBeDeletedId: any;

  constructor(private taskService: TasksService,
              private toastrService: ToastrService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe(
      resp => {
        this.tasks = resp;
        this.filteredTasks = resp;
      });
  }

// search project by name
  private searchTask(text: string) {
    if (this.tasks) {
      this.filteredTasks = this.tasks.filter(task => task.title.toLowerCase().includes(text));
    }
  }

  editTask(taskID: number) {
    this.manageAction = 'Edit Task';
    this.taskTobeManaged = this.tasks.find(item => item.id === taskID);

    $('#newTask').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  deleteTask(taskID: number):void {
    this.toBeDeletedId = taskID;
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      width: '250px'
    });


    //$('#deleteTaskModal').modal('show');
  }

  confirmTaskDelete(action: boolean) {
    if (action && this.toBeDeletedId) {
      this.taskService.deleteTask(this.toBeDeletedId).subscribe(result => {
        if (result && result.status === '200_OK') {
          this.toastrService.success('', 'Successfully deleted');
          this.tasks = this.tasks.filter(task => task.id !== this.toBeDeletedId);
          this.filteredTasks = this.tasks;
        } else {
          this.toastrService.error('', 'An Error was occurred');
        }
      }, error => {
        this.toastrService.error('', 'An Error was occurred');
      }, () => {
      });

      $('#deleteTaskModal').modal('hide');
    }
  }

  initManageData() {
    this.manageAction = 'Add Task';
    this.taskTobeManaged = {
      id: null,
      title: null,
      description: null,
      priority: null,
      status: null,
      user: null,
      createdAt: null,
      comments: null
    }
  }
}
