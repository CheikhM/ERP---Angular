import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import {ActivatedRoute} from '@angular/router';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {Purchase} from '../../../models/purchase.model';
import {OrderService} from '../../../services/order.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-project-devliverables',
  templateUrl: './project-devliverables.component.html',
  styleUrls: ['./project-devliverables.component.css']
})
export class ProjectDevliverablesComponent implements OnInit {
  private currentProjectID: number;
  deliverables: Purchase [] = [];

  constructor(private  sharedService: SharedService,
              private route: ActivatedRoute,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.sharedService.setCurrentWorkflowPath('/projects/project/');

    this.currentProjectID = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.sharedService.setworkflowID(this.currentProjectID);

    this.getAllDelivered(this.currentProjectID);
  }

  private getAllDelivered(id: number) {
    this.orderService.getAllItems(0, 0, id).subscribe(items => {
      if (items && items.length > 0) {
        this.deliverables = items;
      }
    });
  }
}
