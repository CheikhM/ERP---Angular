import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgModel} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../../../services/order.service';
import {ToastrService} from 'ngx-toastr';
import {Track} from '../../../../models/track.model';
import {AutoUnsubscribe} from '../../../../decorators/autounsubscribe.decorator';

declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-edit-track',
  templateUrl: './edit-track.component.html',
  styleUrls: ['./edit-track.component.scss']
})

export class EditTrackComponent implements OnInit, OnDestroy {

  @Input()
  orderID: number;

  @Output() newTrackAdded: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  trackCopy: Track;


  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private toastService: ToastrService) {

  }

  ngOnInit() {
  }

  isEmpty(name: NgModel) {

  }

  isNotValid(startDate: NgModel) {

  }

  orderAction() {
    // add new track
    this.trackCopy.orderID = this.orderID;
    this.trackCopy = Track.revertCast(this.trackCopy);
    this.orderService.newTrack(this.trackCopy).subscribe(
      res => {
        if (res && res['status'] === '200_OK') {
          if (!this.trackCopy.id) {
            this.toastService.success('', 'Successfully added');
            this.trackCopy.id = res['data'].tid;
            this.newTrackAdded.emit({ok: true, track: Track.Cast(this.trackCopy), update: false});
          } else {
            this.toastService.success('', 'Successfully updated');
            this.newTrackAdded.emit({ok: true, track: Track.Cast(this.trackCopy), update: true});
          }
        } else {
          this.toastService.error('', 'Error occurred');
          this.newTrackAdded.emit({ok: false, track: null});
        }
      }, error => {
        this.toastService.error('', 'Error occurred');
        this.newTrackAdded.emit({ok: false, track: null});
      },
      () => {
        this.trackCopy = Track.revertCast(Track.getEmptyTrack());
      }
    );
  }

  ngOnDestroy(): void {
  }
}
