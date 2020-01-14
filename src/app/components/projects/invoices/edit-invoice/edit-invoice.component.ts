import {Component, Input, OnInit} from '@angular/core';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent implements OnInit {

  @Input()
  projectID: number;

  noteCopy: any = {
    id: null,
    project_id: this.projectID,
    bill_num: null,
    amount: null,
    date: null
  };

  constructor() {
  }

  ngOnInit() {
  }

  isEmpty(name: NgModel) {

  }

  isNotValid(startDate: NgModel) {

  }

  projectAction() {
    console.log(this.noteCopy);
  }
}
