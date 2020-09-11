import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../../services/project.service';
import {Project} from '../../../models/project.model';
import {AuthService} from '../../../services/auth.service';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {ToastrService} from 'ngx-toastr';
import {BASE_PATH} from '../../../config';

declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  currentProjectID: number;
  currentProjectSub = new Subscription();

  project: Project = Project.getEmptyProject();
  newUpdateSub: Subscription;

  managerName = '';
  private toBeDeletedId: number = null;

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private sharedService: SharedService,
              private authService: AuthService,
              private toastrService: ToastrService) {

    // get the current project id
    this.currentProjectID = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    // set the current project id
    this.sharedService.setworkflowID(this.currentProjectID);
  }

  ngOnInit() {
    this.sharedService.setCurrentWorkflowPath('/projects/project/');

    this.getCurrentProject();

    // check for new update
    this.sharedService.getNewUpdate().subscribe(update => {
      if (update) {
        this.getCurrentProject(true);
      }
    });
  }


  private getCurrentProject(remote = null) {
    // if no current project was found
    // todo replace true with "remote"
    if (true) {
      this.projectService.getProjectByID(this.currentProjectID).subscribe(
        result => {
          if (result.status === '200_OK') {
            this.project = new Project(result.data);
            this.getManagerName(this.project.manager);
          }
        }
      );

      return true;
    }
    this.currentProjectSub = this.sharedService.getCurrentListingElement().subscribe(
      project => {
        this.project = project;
        if (!this.project) {
          this.getCurrentProject(true);
        }
      }
    );
  }

  ngOnDestroy(): void {
  }

  triggerDeleteElement(id: number) {
    // console.log(id);
    this.toBeDeletedId = id;

    $('#deleteProjectModal').modal('show');
  }

  triggerProjectEdit() {
    $('#newProject').modal('show');
  }

  getManagerName(managerID: number) {
    if (managerID) {
      const sub = this.authService.getUserByID(managerID).subscribe(
        res => {
          if (res && res.data) {
            this.managerName = res.data.name;
          }
        }, error => sub.unsubscribe(), () => sub.unsubscribe());
    }
  }

  confirmProjectDelete(action: boolean) {
    if (action && this.toBeDeletedId) {

      this.projectService.deleteProject(this.toBeDeletedId).subscribe(result => {
        if (result.status === '200_OK') {
          this.toastrService.success('', 'Successfully deleted');
        } else {
          this.toastrService.error('', 'An Error was occurred');
        }
      }, error => {
        this.toastrService.error('', 'An Error was occurred');
      }, () => {
        setTimeout(() => window.location.replace(BASE_PATH + 'projects/all'), 100);
      });

      $('#deleteProjectModal').modal('hide');
    }
  }

}
