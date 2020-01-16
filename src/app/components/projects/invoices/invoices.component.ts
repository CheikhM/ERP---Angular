import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../../services/project.service';
import {Invoice} from '../../../models/invoice.model';
import {ToastrService} from 'ngx-toastr';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';

declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit, OnDestroy {
  currentProjectID: number;
  private invoices: Invoice[];
  private invoicesCopy: Invoice[];
  p = 1;
  private toBeDeletedId: number;
  invoiceTobeEdited = Invoice.revertCast(Invoice.getEmptyInvoice());

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private  toastrService: ToastrService) {
  }

  ngOnInit() {

    // get the current project id
    this.currentProjectID = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.getAllInvoices(this.currentProjectID);
  }

  triggerProjectAction(invoice: Invoice = null) {
    if (invoice) {
      this.invoiceTobeEdited = {...invoice};
    } else {
      this.invoiceTobeEdited = Invoice.revertCast(Invoice.getEmptyInvoice());
    }

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

    this.projectService.deleteInvoice(this.toBeDeletedId).subscribe(
      item => {

        if (item.status === '200_OK' && item['data'].id) {
          this.invoices = this.invoices.filter(itemInvoice => itemInvoice.id !== item['data'].id);
          this.invoicesCopy = this.invoices.map(itemInv => Object.assign({}, itemInv));
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

    $('#deleteInvoiceModal').modal('hide');

  }

  deleteInvoice(id: number) {
    this.toBeDeletedId = id;

    $('#deleteInvoiceModal').modal('show');

  }

  ngOnDestroy(): void {
  }
}
