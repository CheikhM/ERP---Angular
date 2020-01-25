import {Component, Input, OnInit, Output} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-listing-title',
  templateUrl: './listing-title.component.html',
  styleUrls: ['./listing-title.component.css']
})
export class ListingTitleComponent implements OnInit {

  @Input()
  data: any;

  constructor() {
  }

  ngOnInit() {
  }

  AddElement() {
    if (this.data.sTitle === 'Project') {
      $('#newProject').modal({
        backdrop: 'static',
        keyboard: false
      });
    } else if (this.data.sTitle === 'Bid') {
      $('#newBid').modal({
        backdrop: 'static',
        keyboard: false
      });
    } else if (this.data.sTitle === 'Deal') {
      $('#newDeal').modal({
        backdrop: 'static',
        keyboard: false
      });
    } else if (this.data.sTitle === 'Visit') {
      $('#newVisit').modal({
        backdrop: 'static',
        keyboard: false
      });
    }  else if (this.data.sTitle === 'User') {
      $('#newUser').modal({
        backdrop: 'static',
        keyboard: false
      });
    }
    setTimeout(() => {
      $('.autofocus').focus();
    }, 500);
  }
}
