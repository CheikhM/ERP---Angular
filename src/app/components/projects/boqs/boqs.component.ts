import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import {ActivatedRoute} from '@angular/router';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {ProjectService} from '../../../services/project.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-boqs',
  templateUrl: './boqs.component.html',
  styleUrls: ['./boqs.component.css']
})
export class BoqsComponent implements OnInit {
  private currentProjectID: number;

  items: any [];
  groups: any;
  currentGroupItems: any [];
  currentGroupID: number;

  constructor(private  sharedService: SharedService,
              private  projectService: ProjectService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentProjectID = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.sharedService.setworkflowID(this.currentProjectID);

    this.getAllBOQs();
  }

  private getAllBOQs() {
    this.projectService.getAllBoqs(this.currentProjectID).subscribe(
      result => {
        if (result.data) {
          this.items = result.data.items;
          this.groups = result.data.groups;
        }
      },
      error => {
      },
      () => {
        this.currentGroupID = this.groups[0].id;
        this.currentGroupItems = this.items.filter(bid => {
          return bid.group_id === this.currentGroupID;
        });
      }
    );
  }

  changeCurrentGroup(value: string) {
    const groupID = parseInt(value, 10);
    this.currentGroupItems = this.items.filter(bid => {
      return bid.group_id === groupID;
    });
  }
}
