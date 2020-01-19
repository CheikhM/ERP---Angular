import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import {ActivatedRoute} from '@angular/router';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {ProjectService} from '../../../services/project.service';
import {ToastrService} from 'ngx-toastr';

declare var $: any;

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
  actionTitle: string = null;
  boqToBeEdited: any = null;
  public groupID: number;
  public totalExCost = 0;
  public totalSell = 0;

  constructor(private  sharedService: SharedService,
              private  projectService: ProjectService,
              private route: ActivatedRoute,
              private toastService: ToastrService) {
  }

  ngOnInit() {
    this.sharedService.setCurrentWorkflowPath('/projects/project/');

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
          this.groupID = this.groups[0].id;
        }
      },
      error => {
      },
      () => {
        this.currentGroupID = this.groups[0].id;
        this.currentGroupItems = this.items.filter(bid => {
          return bid.group_id === this.currentGroupID;
        });

        this.getTotSellCost();
        this.getTotExCost();
      }
    );
  }

  changeCurrentGroup(value: string) {
    this.groupID = parseInt(value, 10);
    this.currentGroupItems = this.items.filter(bid => {
      return bid.group_id === this.groupID;
    });
  }

  triggerBoqAction(boq: any = null) {
    if (boq) {
      this.actionTitle = 'Edit BOQ';
      this.boqToBeEdited = boq;
    } else {
      this.actionTitle = null;
      this.boqToBeEdited = {
        id: null,
        Item: null,
        quantity: null,
        cost: null,
        price: null,
        delivery_date: null,
        po_no: null,
        progress: null,
      };
    }

    $('#newBoq').modal('show');
  }

  addNewBoq(boq: any) {
    this.projectService.newBoq(boq).subscribe(result => {
        if (result['status'] === '200_OK' && result['data'].boqid) {
          this.toastService.success('', 'Successfully added');
          this.getAllBOQs();
        } else {
          this.toastService.error('', 'An error was occurred');
        }
      },
      error => this.toastService.error('', 'An error was occurred'),
      () => {
        $('#newBoq').modal('hide');
      }
    );
  }

  getTotalCostForGroup(id: any) {
    return this.items.filter(el => el.group_id === id).map(item => item.cost * item.quantity).reduce((a, b) => a + b);
  }

  getTotalPriceForGroup(id: any) {
    return this.items.filter(el => el.group_id === id).map(item => item.price * item.quantity).reduce((a, b) => a + b);
  }

  getTotExCost() {
    this.totalExCost = this.items.map(item => item.cost * item.quantity).reduce((a, b) => a + b);
  }

  getTotSellCost() {
    this.totalSell = this.items.map(item => item.price * item.quantity).reduce((a, b) => a + b);
  }
}
