import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ToastrService} from 'ngx-toastr';
import {AutoUnsubscribe} from '../../decorators/autounsubscribe.decorator';
import {TasksService} from './tasks.service'
import { ConfirmBoxComponent } from '../shared/confirm-box/confirm-box.component';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as actions from './task.actions';
import * as fromTask from './task.reducer';
import { Task } from './models/task.model';

declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  myTestingTasks: Observable<any> = this.store.select(fromTask.selectAll);

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

  constructor(private sharedService: SharedService,
              private taskService: TasksService,
              private toastrService: ToastrService,
              private dialog: MatDialog,
              private store: Store<fromTask.State>) {
  }

  ngOnInit() {
    // check for new update
    this.sharedService.getNewUpdate().subscribe(update => {
      if (update) {
        this.getAllTasks();
      }
    });

    // search task
    this.sharedService.getSearchText().subscribe(item => {
      this.searchTask(item.toLocaleLowerCase());
    });
    this.getAllTasks();

    this.myTestingTasks.subscribe(res => console.log(res));

    setTimeout(() => this.addItemTesting() , 3000);
  }

  addItemTesting() {
    console.log('adding the second element');
    const task: Task = {
      id: 2,
      title: 'fsfs',
      description: 'sfs',
      priority: 'sfsf',
      status: 'efef',
      user: 'efef',
      createdAt: 'efef',
      comments: null
    };
    const task2: Task = {
      id: 3,
      title: 'afaf',
      description: 'af',
      priority: 'sffsf',
      status: 'ee',
      user: 'vv',
      createdAt: 'rr',
      comments: null
    };
    this.store.dispatch(new actions.Create(task));
    this.store.dispatch(new actions.Create(task2));

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
