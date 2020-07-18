import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../../services/order.service';
import {Track} from '../../../models/track.model';
import {ToastrService} from 'ngx-toastr';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {SharedService} from '../../../services/shared.service';
import { Order } from 'src/app/models/order.model';

declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-payment-tracks',
  templateUrl: './payment-tracks.component.html',
  styleUrls: ['./payment-tracks.component.css']
})
export class PaymentTracksComponent implements OnInit, OnDestroy {
  currentOrderID: number;
  private tracks: Track[];
  public tracksCopy: Track[];
  p = 1;
  private toBeDeletedId: number;
  trackTobeEdited = Track.revertCast(Track.getEmptyTrack());
  remaining: any;
  POValue: any;
  items: any;
  order: any;
  sumItemsValue: any;
  orderVat: any;
  total: any;
  orderDiscount: any;
  sumRemaining: any;

  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private toastrService: ToastrService,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.sharedService.setCurrentWorkflowPath('/orders/order/');

    // get the current order id
    this.currentOrderID = parseInt(this.route.snapshot.paramMap.get('id'), 10);


    this.sharedService.setworkflowID(this.currentOrderID);

    // get the order value


    this.getAllTracks(this.currentOrderID);
    this.getAllItems();
      // check for new update
      this.sharedService.getNewUpdate().subscribe(update => {
        if (update) {
          this.getAllTracks(this.currentOrderID);
          this.getAllItems();
        }
      });
  }

  getCurrentOrder(id: number) {
    if (!id) {
      return;
    }
    this.orderService.getOrderByID(this.currentOrderID).subscribe(result => {

      if (result && result.status === '200_OK') {
        this.order = new Order(result.data);
      } else {
        return;
      }
    }, error => {
    }, () => {
      this.orderDiscount = parseFloat(this.order.discount);
      this.getOrderStatistics(this.currentOrderID);

    });

  }

  triggerTrackAction(track: Track = null) {
    if (track) {
      this.trackTobeEdited = {...track};
    } else {
      this.trackTobeEdited = Track.revertCast(Track.getEmptyTrack());
    }

    $('#newTrack').modal('show');
  }

  private getAllTracks(tid: number) {
    this.orderService.getAllTracks(tid).subscribe(res => {
      this.tracks = res;
      this.tracksCopy = this.tracks.map(item => Object.assign({}, item));
    }, error => {
    }, () => setTimeout(() => this.getRemaining()));
  }

  addNewTrack(action: any) {

    if (action.ok && !action.update) {
      this.tracks.push(action.track);
      this.getRemaining();
    } else if (action.update) {
      this.tracks[this.tracks.findIndex(el => el.id === action.track.id)] = action.track;
    }

    this.tracksCopy = this.tracks.map(item => Object.assign({}, item));

    $('#newTrack').modal('hide');
  }

  confirmTrackDelete(action: boolean) {
    if (!action || !this.toBeDeletedId) {
      return;
    }

    this.orderService.deleteTrack(this.toBeDeletedId).subscribe(
      item => {

        if (item.status === '200_OK' && item['data'].id) {
          this.tracks = this.tracks.filter(itemTrack => itemTrack.id !== item['data'].id);
          this.tracksCopy = this.tracks.map(itemTrack => Object.assign({}, itemTrack));
          this.getRemaining();
          this.toastrService.success('', 'Successfully deleted');
        } else {
          this.toastrService.success('', 'Note has been deleted by someone else');
        }
      }
      , error => {
        this.toastrService.success('', 'Note has been deleted by someone else');
      }, () => {
      }
    );

    $('#deleteTrackModal').modal('hide');

  }

  deleteTrack(id: number) {
    this.toBeDeletedId = id;

    $('#deleteTrackModal').modal('show');

  }

  ngOnDestroy(): void {
  }

  private getRemaining() {
      this.sumRemaining = this.tracksCopy.map(item => item.amount).reduce((prev, next) => prev + next);
  }


  private getAllItems() {
    this.orderService.getAllItems(this.currentOrderID).subscribe(
      result => {
        this.items = result;
      },
      error => {
      },
      () => {
        this.getCurrentOrder(this.currentOrderID);
      }
    );
  }

  private getOrderStatistics(currentOrderID: number) {
    this.sumItemsValue = this.items.map(item => (item.rate * item.quantity)).reduce((prev, next) => prev + next, 0);
    this.orderVat = this.order.vatValue ? (this.sumItemsValue * this.order.vatValue) / 100 : 0;
    this.total = this.sumItemsValue - this.orderVat - this.orderDiscount;
  }


}
