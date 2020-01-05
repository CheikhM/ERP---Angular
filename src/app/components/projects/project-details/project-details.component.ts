import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../../services/project.service';
import {Project} from '../../../models/project.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  currentProjectID: number;
  currentProjectSub = new Subscription();
  project: Project;


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
  }


  private getCurrentProject(remote = null) {
    // if no current project was found
    if (remote) {
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
  }

  deleteElement(id: number) {
    // console.log(id);
  }
}
