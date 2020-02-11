import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../../services/order.service';
import {SharedService} from '../../../services/shared.service';
import {AuthService} from '../../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Order} from '../../../models/order.model';
import {BASE_PATH, siteUrl} from '../../../config';
import {Subscription} from 'rxjs';
import {Project} from '../../../models/project.model';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {User} from '../../../models/user.model';
import {ProjectService} from '../../../services/project.service';

declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  currentOrderID: number;

  // order: Order = Order.getEmptyOrder();
  order: Order;

  private toBeDeletedId: number = null;
  vendor: string;
  approvedBy: User = User.getEmptyUser();
  project: Project;
  orderPath: string = siteUrl + 'files/pdf/document.pdf?id=';

  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private sharedService: SharedService,
              private authService: AuthService,
              private toastrService: ToastrService,
              private projectService: ProjectService) {

    // get the current order id
    this.currentOrderID = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    // set the current order id
    this.sharedService.setworkflowID(this.currentOrderID);
  }

  ngOnInit() {
    this.sharedService.setCurrentWorkflowPath('/orders/order/');

    this.getCurrentOrder();

    // check for new update
    this.sharedService.getNewUpdate().subscribe(update => {
      if (update) {
        this.getCurrentOrder();
      }
    });
  }


  private getCurrentOrder(remote = null) {
    // if no current order was found
    // todo replace true with "remote"
    if (true) {
      this.orderService.getOrderByID(this.currentOrderID).subscribe(
        result => {
          if (result.status === '200_OK') {
            this.order = new Order(result.data);
            // this.getManagerName(this.order.manager);
          }
        },
        error => {
        },
        () => {
          this.getVendor(this.order.vendor);
          this.getApprover(this.order.approvedBy);
          this.getProjectCode(this.order.project);
        }
      );

      return true;
    }
    this.sharedService.getCurrentListingElement().subscribe(
      order => {
        this.order = order;
        if (!this.order) {
          this.getCurrentOrder(true);
        }
      }
    );
  }

  ngOnDestroy(): void {
  }

  triggerDeleteElement(id: number) {
    // console.log(id);
    this.toBeDeletedId = id;

    $('#deleteOrderModal').modal('show');
  }

  triggerOrderEdit() {
    $('#newOrder').modal('show');
  }

  /*
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

   */

  confirmOrderDelete(action: boolean) {
    if (action && this.toBeDeletedId) {

      this.orderService.deleteOrder(this.toBeDeletedId).subscribe(result => {
        if (result.status === '200_OK') {
          this.toastrService.success('', 'Successfully deleted');
        } else {
          this.toastrService.error('', 'An Error was occurred');
        }
      }, error => {
        this.toastrService.error('', 'An Error was occurred');
      }, () => {
        setTimeout(() => window.location.replace(BASE_PATH + 'orders/all'), 100);
      });

      $('#deleteOrderModal').modal('hide');
    }
  }

  private getVendor(vendor: number) {
    this.orderService.getSupplierByID(vendor).subscribe(item => {
      this.vendor = item.shortName;
    });

  }

  private getApprover(userID: number) {
    this.authService.getUserByID(userID).subscribe(res => {
      if (res && res['status'] === '200_OK') {
        this.approvedBy = new User(res['data']);
      }
    });
  }

  private getProjectCode(project: number) {


    // in case of local projects
    if (project === 0) {
      const _project = Project.getEmptyProject();
      _project.code = 'DARDELTA';

      this.project = _project;
      return;
    }
    this.projectService.getProjectByID(project).subscribe(result => {
      if (result && result['status'] === '200_OK') {
        this.project = new Project(result.data);
      }
    });
  }

  printItems() {
    $('#pdfViewer').modal('show');
  }
}
