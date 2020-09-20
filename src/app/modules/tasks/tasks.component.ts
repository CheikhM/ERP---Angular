import {Component, OnInit} from '@angular/core';
import {AutoUnsubscribe} from '../../decorators/autounsubscribe.decorator';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Task } from 'src/app/models/task.model';

@AutoUnsubscribe()
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  todo: Task [];
  done: Task [];
  inProgress: Task [];

  constructor() {
  }

  ngOnInit() {}

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
