import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ToastrService} from 'ngx-toastr';
import {AutoUnsubscribe} from '../../decorators/autounsubscribe.decorator';
import {Task} from '../../models/task.model';
import {TasksService} from '../../services/tasks.service';
import {User} from '../../models/user.model';


declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {


  filteredTasks: any;

  metaDefinition = [
    {text: 'Name', attribute: 'name', type: 'PLString'},
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
              private toastrService: ToastrService) {
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
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe(
      resp => {
        //console.log(resp);
        this.tasks = resp;
        this.filteredTasks = resp;
      },
      error => {
      },
      () => {
        //console.log(this.tasks);
      }
    );
  }

// search project by name
  private searchTask(text: string) {
    if (this.tasks) {
      this.filteredTasks = this.tasks.filter(task => task.name.toLowerCase().includes(text));
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

  deleteTask(taskID: number) {
    this.toBeDeletedId = taskID;

    $('#deleteTaskModal').modal('show');
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
    this.taskTobeManaged = Task.getEmptyTask();
  }
}
