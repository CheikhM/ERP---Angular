import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../../services/project.service';
import {Invoice} from '../../../models/invoice.model';

declare var $: any;

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  currentProjectID: number;
  private invoices: Invoice[];
  private invoicesCopy: Invoice[];
  p = 1;
  private toBeDeletedId: number;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) {
  }

  ngOnInit() {

    // get the current project id
    this.currentProjectID = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.getAllInvoices(this.currentProjectID);
  }

  triggerProjectAction() {

    $('#newInvoice').modal('show');
  }

  private getAllInvoices(pid: number) {
    this.projectService.getAllInvoices(pid).subscribe(res => {
      this.invoices = res;
      this.invoicesCopy = this.invoices.map(item => Object.assign({}, item));
    });
  }

  addNewInvoice(action: any) {
    if (action.ok) {
      this.invoices.push(action.invoice);
      this.invoicesCopy = this.invoices.map(item => Object.assign({}, item));
    }

    $('#newInvoice').modal('hide');
  }

  confirmInvoiceDelete(action: boolean) {
    if (!action || !this.toBeDeletedId) {
      return;
    }

    console.log(this.toBeDeletedId);
  }

  deleteInvoice(id: number) {
    this.toBeDeletedId = id;

    $('#deleteInvoiceModal').modal('show');

  }
}
