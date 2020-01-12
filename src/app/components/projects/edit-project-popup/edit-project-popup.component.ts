import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Project} from '../../../models/project.model';
import {ProjectService} from '../../../services/project.service';
import {ToastrService} from 'ngx-toastr';
import {SharedService} from '../../../services/shared.service';

declare var $: any;

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

  constructor(private projectService: ProjectService,
              private toastrService: ToastrService,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.projectCopy = Project.getEmptyProject();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.project) {
      this.projectCopy = {...this.project};
    }
  }

  saveProject() {
    // adding new project
    if (this.title === 'Add Project') {
      this.projectService.newProject(this.projectCopy).subscribe(
        result => {
          if (result['status'] === '200_OK' && result['data'].pid) {
            // tell the project about new data update
            $('#newProject').modal('hide');
            this.sharedService.setNewUpdate(true);
            this.toastrService.success('', 'Successfully added');
          } else {
            this.toastrService.error('', 'An error was occurred');
          }
        },
        error => this.toastrService.error('', 'An error was occurred'),
        () => {
        }
      );
    } else if (this.title === 'Edit Project') {
      this.projectService.updateProject(this.projectCopy).subscribe(
        result => {
          if (result['status'] === '200_OK' && result['data'].pid) {
            $('#newProject').modal('hide');
            // tell the project about new data update
            this.sharedService.setNewUpdate(true);
            this.toastrService.success('', 'Successfully updated');
          } else {
            this.toastrService.error('', 'An error was occurred');
          }
        },
        error => this.toastrService.error('', 'An error was occurred'),
        () => {
        }
      );
    }
  }

  restoreModal() {
    this.onExitModal.emit(true);
  }
}
