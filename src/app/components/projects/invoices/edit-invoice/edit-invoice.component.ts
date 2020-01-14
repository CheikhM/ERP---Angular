import {Component, Input, OnInit} from '@angular/core';
import {NgModel} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../../../services/project.service';

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
    project_id: null,
    bill_num: null,
    amount: null,
    date: null
  };

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService) {

  }

  ngOnInit() {
  }

  isEmpty(name: NgModel) {

  }

  isNotValid(startDate: NgModel) {

  }

  projectAction() {
    this.noteCopy.project_id = this.projectID;

    this.projectService.newInvoice(this.noteCopy).subscribe(result => console.log(result));
  }
}
