import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../../../services/shared.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-bid-details',
  templateUrl: './bid-details.component.html',
  styleUrls: ['./bid-details.component.css']
})
export class BidDetailsComponent implements OnInit {
  private currentProjectID: number;

  constructor(private sharedService: SharedService, private route: ActivatedRoute) {
    // get the current project id
    this.currentProjectID = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    // set the current project id
    this.sharedService.setworkflowID(this.currentProjectID);
  }

  ngOnInit() {
    this.sharedService.setCurrentWorkflowPath('/sales/bid/');

  }

}
