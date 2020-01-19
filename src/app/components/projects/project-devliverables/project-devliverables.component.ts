import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import {ActivatedRoute} from '@angular/router';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';

@AutoUnsubscribe()
@Component({
  selector: 'app-project-devliverables',
  templateUrl: './project-devliverables.component.html',
  styleUrls: ['./project-devliverables.component.css']
})
export class ProjectDevliverablesComponent implements OnInit {
  private currentProjectID: number;

  constructor(private  sharedService: SharedService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sharedService.setCurrentWorkflowPath('/projects/project/');

    this.currentProjectID = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.sharedService.setworkflowID(this.currentProjectID);
  }

}
