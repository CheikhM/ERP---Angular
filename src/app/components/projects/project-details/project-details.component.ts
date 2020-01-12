import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../../services/project.service';
import {Project} from '../../../models/project.model';

declare var $: any;

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  currentProjectID: number;
  currentProjectSub = new Subscription();

  project: Project = Project.getEmptyProject();
  newUpdateSub: Subscription;

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private sharedService: SharedService) {
    // get the current project id

    this.currentProjectID = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    // set the current project id
    this.sharedService.setworkflowID(this.currentProjectID);
  }

  ngOnInit() {
    this.getCurrentProject();

    // check for new update
    this.newUpdateSub = this.sharedService.getNewUpdate().subscribe(update => this.getCurrentProject(true));
  }


  private getCurrentProject(remote = null) {
    // if no current project was found
    // todo replace true with "remote"
    if (true) {
      this.projectService.getProjectByID(this.currentProjectID).subscribe(
        result => {
          if (result.status === '200_OK') {
            this.project = new Project(result.data);
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
    this.currentProjectSub.unsubscribe();
    this.newUpdateSub.unsubscribe();
  }

  deleteElement(id: number) {
    // console.log(id);
  }

  triggerProjectEdit() {
    $('#newProject').modal('show');
  }
}
