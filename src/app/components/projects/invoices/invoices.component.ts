import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  currentProjectID: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {

    // get the current project id
    this.currentProjectID = parseInt(this.route.snapshot.paramMap.get('id'), 10);
  }

  triggerProjectAction() {

    $('#newInvoice').modal('show');
  }
}
