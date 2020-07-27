import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Project} from '../../../models/project.model';
import {ProjectService} from '../../../services/project.service';
import {ToastrService} from 'ngx-toastr';
import {SharedService} from '../../../services/shared.service';
import {NgModel} from '@angular/forms';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../services/auth.service';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import { NotificationService } from 'src/app/services/notification.service';

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
              private authService: AuthService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.projectCopy = Project.getEmptyProject();
    this.getUsers("PM");
  }

  getUsers(role: string) {
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
            this.notifyUser(result['data'].pid, this.projectCopy.manager);
            this.sharedService.setNewUpdate(true);
            this.toastrService.success('', 'Successfully added');
          } else {
            this.toastrService.error('', 'An error was occurred');
          }
        },
        error => this.toastrService.error('', 'An error was occurred'),
        () => {
          this.onExitModal.emit(true);
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
            if (this.projectCopy.manager !== this.project.manager) {
              this.notifyUser(result['data'].pid, this.projectCopy.manager, this.project.manager);
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
  notifyUser(projectID: number, managerID: number, oldUserID = null) {
    const manager = this.managers.find(item => item.id == managerID);

    const managerEmail = manager ? manager.email : 'saud@dardelta.com.sa';
    const data = {
      code: 1215,
      id: projectID,
      email: managerEmail,
    }

    this.notificationService.notifyUser(data).subscribe();

    // Notify that task is unassigned
    if (oldUserID) {
      const oldUser = this.managers.find(item => item.id == oldUserID);
      const oldUserEmail = oldUser ? oldUser.email : 'saud@dardelta.com.sa';
      data.code = 1214;
      data.email = oldUserEmail;
      this.notificationService.notifyUser(data).subscribe();
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
