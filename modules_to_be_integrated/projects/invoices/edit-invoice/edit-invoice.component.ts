import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgModel} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../../../services/project.service';
import {ToastrService} from 'ngx-toastr';
import {Invoice} from '../../../../models/invoice.model';
import {AutoUnsubscribe} from '../../../../decorators/autounsubscribe.decorator';

declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit, OnDestroy {

  @Input()
  projectID: number;

  @Output() newInvoiceAdded: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  invoiceCopy: Invoice;


  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private toastService: ToastrService) {

  }

  ngOnInit() {
  }

  projectAction() {

    // to update an existing invoice
    if (this.invoiceCopy.id) {

    }
    // add new invoice
    this.invoiceCopy.projectID = this.projectID;
    this.invoiceCopy = Invoice.revertCast(this.invoiceCopy);
    this.projectService.newInvoice(this.invoiceCopy).subscribe(
      res => {
        if (res['status'] === '200_OK') {
          if (!this.invoiceCopy.id) {
            this.toastService.success('', 'Successfully added');
            this.invoiceCopy.id = res['data'].icid;
            this.newInvoiceAdded.emit({ok: true, invoice: Invoice.Cast(this.invoiceCopy), update: false});
          } else {
            this.toastService.success('', 'Successfully updated');
            this.newInvoiceAdded.emit({ok: true, invoice: Invoice.Cast(this.invoiceCopy), update: true});
          }
        } else {
          this.toastService.error('', 'Error occurred');
          this.newInvoiceAdded.emit({ok: false, invoice: null});
        }
      }, error => {
        this.toastService.error('', 'Error occurred');
        this.newInvoiceAdded.emit({ok: false, invoice: null});
      },
      () => {
        this.invoiceCopy = Invoice.revertCast(Invoice.getEmptyInvoice());
      }
    );
  }

  ngOnDestroy(): void {
  }
}
