import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  currentProjectID: number;
  currentProjectSub = new Subscription();
  project: any;


  constructor(private route: ActivatedRoute, private sharedService: SharedService) {
    // get the current project id
    this.currentProjectID = parseInt(this.route.snapshot.paramMap.get('id'), 10);
  }

  ngOnInit() {
    this.getCurrentProject();
    console.log(this.project);
  }


  private getCurrentProject() {
    this.currentProjectSub = this.sharedService.getCurrentListingElement().subscribe(project => this.project = project);
  }

  ngOnDestroy(): void {
    this.currentProjectSub.unsubscribe();
  }
}
