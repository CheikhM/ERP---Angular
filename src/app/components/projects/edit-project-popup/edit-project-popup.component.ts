import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Project} from '../../../models/project.model';
import {ProjectService} from '../../../services/project.service';
import {ToastrService} from 'ngx-toastr';
import {SharedService} from '../../../services/shared.service';
import {NgModel} from '@angular/forms';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../services/auth.service';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';

declare var $: any;
@AutoUnsubscribe()
@Component({
  selector: 'app-edit-project-popup',
  templateUrl: './edit-project-popup.component.html',
  styleUrls: ['./edit-project-popup.component.css']
})

export class EditProjectPopupComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  project: Project = Project.getEmptyProject();
  @Input()
  title: string;
  projectCopy: Project;

  @Output() onExitModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  managers: User [];

  constructor(private projectService: ProjectService,
              private toastrService: ToastrService,
              private sharedService: SharedService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.projectCopy = Project.getEmptyProject();
    this.getUsers(2);
  }

  getUsers(role: number) {
    this.authService.getAllUsers(role).subscribe(result => this.managers = result);
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

  isEmpty(model: NgModel) {
    return this.isNotValid(model) && model.errors.required;
  }

  isNotValid(model: NgModel) {
    return model.invalid && (model.dirty || model.touched);
  }

  ngOnDestroy(): void {
  }
}
