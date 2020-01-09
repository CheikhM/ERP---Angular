import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from '../../../models/project.model';

@Component({
  selector: 'app-edit-project-popup',
  templateUrl: './edit-project-popup.component.html',
  styleUrls: ['./edit-project-popup.component.css']
})
export class EditProjectPopupComponent implements OnInit {
  project: any;
  title = 'New Project';

  constructor() {
  }

  ngOnInit() {
  }

  saveProject() {
    console.log('saved');
  }

}
