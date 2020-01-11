import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Project} from '../../../models/project.model';

@Component({
  selector: 'app-edit-project-popup',
  templateUrl: './edit-project-popup.component.html',
  styleUrls: ['./edit-project-popup.component.css']
})

export class EditProjectPopupComponent implements OnInit, OnChanges {
  @Input()
  project: Project = Project.getEmptyProject();
  @Input()
  title: string;
  projectCopy: Project;

  @Output() onExitModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
    this.projectCopy = Project.getEmptyProject();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.project) {
      console.log('changed ');
      this.projectCopy = { ...this.project };
    }
  }

  saveProject() {
    console.log('p & pc: ');
    console.log('p: ', this.project);
    console.log('pc: ',  this.projectCopy);
  }

  restoreModal() {
    this.onExitModal.emit(true);
  }
}
