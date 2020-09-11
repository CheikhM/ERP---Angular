import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FiltersComponent} from './modules/shared/filters/filters.component';
import {HeaderComponent} from './modules/shared/header/header.component';
import {PageTitleComponent} from './modules/shared/page-title/page-title.component';
import {SearchBarComponent} from './modules/shared/search-bar/search-bar.component';
import {SideBarComponent} from './modules/shared/side-bar/side-bar.component';
import {ListingComponent} from './modules/shared/listing/listing.component';
import {ConfirmBoxComponent} from './modules/shared/confirm-box/confirm-box.component';
import {ListingTitleComponent} from './modules/shared/listing-title/listing-title.component';
import {ProjectsListComponent} from './modules/projects/projects-list/projects-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProjectDetailsComponent} from './modules/projects/project-details/project-details.component';
import {FormsModule} from '@angular/forms';
import {WorkflowComponent} from './modules/shared/workflow/workflow.component';
import {ProjectNotesComponent} from './modules/projects/project-notes/project-notes.component';
import {ProjectDevliverablesComponent} from './modules/projects/project-devliverables/project-devliverables.component';
import {InvoicesComponent} from './modules/projects/invoices/invoices.component';
import {BoqsComponent} from './modules/projects/boqs/boqs.component';
import {DetailsTitleComponent} from './modules/projects/project-details/details-title/details-title.component';
import {BidsComponent} from './modules/sales/bids/bids.component';
import {DealsComponent} from './modules/sales/deals/deals.component';
import {EditProjectPopupComponent} from './modules/projects/edit-project-popup/edit-project-popup.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule} from '@angular/material';
import {LoginComponent} from './modules/auth/login/login.component';
import {AuthInterceptor} from './services/auth.interceptor';
import {JWT_OPTIONS, JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import { EditInvoiceComponent } from './modules/projects/invoices/edit-invoice/edit-invoice.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { EditBoqComponent } from './modules/projects/boqs/edit-boq/edit-boq.component';
import { BidDetailsComponent } from './modules/sales/bids/bid-details/bid-details.component';
import { BidNotesComponent } from './modules/sales/bids/bid-notes/bid-notes.component';
import { EditBidPopupComponent } from './modules/sales/bids/edit-bid-popup/edit-bid-popup.component';
import { VisitsComponent } from './modules/sales/visits/visits.component';
import {DealNotesComponent} from './modules/sales/deals/deal-notes/deal-notes.component';
import { DealDetailsComponent } from './modules/sales/deals/deal-details/deal-details.component';
import { EditDealPopupComponent } from './modules/sales/deals/edit-deal-popup/edit-deal-popup.component';
import { EditVisitPopupComponent } from './modules/sales/visits/edit-visit-popup/edit-visit-popup.component';
import { VisitDetailsComponent } from './modules/sales/visits/visit-details/visit-details.component';
import { VisitNotesComponent } from './modules/sales/visits/visit-notes/visit-notes.component';
import { UsersComponent } from './modules/users/users.component';
import { EditUserPopupComponent } from './modules/users/edit-user-popup/edit-user-popup.component';
import { UserDetailsComponent } from './modules/users/user-details/user-details.component';
import { OrdersComponent } from './modules/orders/orders.component';
import { SuppliersComponent } from './modules/orders/suppliers/suppliers.component';
import { SupplierDetailsComponent } from './modules/orders/suppliers/supplier-details/supplier-details.component';
import { EditSupplierPopupComponent } from './modules/orders/suppliers/edit-supplier-popup/edit-supplier-popup.component';
import { OrderDetailsComponent } from './modules/orders/order-details/order-details.component';
import { EditOrderPopupComponent } from './modules/orders/edit-order-popup/edit-order-popup.component';
import { PaymentTracksComponent } from './modules/orders/payment-tracks/payment-tracks.component';
import { EditTrackComponent } from './modules/orders/payment-tracks/edit-track/edit-track.component';
import { PurchaseEditPopupComponent } from './modules/orders/purchase-edit-popup/purchase-edit-popup.component';
import { PurchaseItemsComponent } from './modules/orders/purchase-items/purchase-items.component';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { WarehouseComponent } from './modules/warehouse/warehouse.component';
import { BackupComponent } from './modules/backup/backup.component';
import { VouchersComponent } from './modules/vouchers/vouchers.component';
import { BeneficiariesComponent } from './modules/beneficiaries/beneficiaries.component';
import { EditBeneficiaryPopupComponent } from './modules/beneficiaries/edit-beneficiary-popup/edit-beneficiary-popup.component';
import { EditVoucherPopupComponent } from './modules/vouchers/edit-voucher-popup/edit-voucher-popup.component';
import { VoucherDetailsComponent } from './modules/vouchers/voucher-details/voucher-details.component';
import { VoucherNotesComponent } from './modules/vouchers/voucher-notes/voucher-notes.component';
import { PdfViewerComponent } from './modules/shared/pdf-viewer/pdf-viewer.component';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ChartsModule } from 'ng2-charts';
import { TaskModule } from './modules/tasks/task.module';

@NgModule({
  declarations: [
    AppComponent,
    FiltersComponent,
    HeaderComponent,
    PageTitleComponent,
    SearchBarComponent,
    SideBarComponent,
    ListingComponent,
    ConfirmBoxComponent,
    ListingTitleComponent,
    ProjectsListComponent,
    ProjectDetailsComponent,
    WorkflowComponent,
    ProjectNotesComponent,
    ProjectDevliverablesComponent,
    InvoicesComponent,
    BoqsComponent,
    DetailsTitleComponent,
    BidsComponent,
    DealsComponent,
    EditProjectPopupComponent,
    LoginComponent,
    DashboardComponent,
    EditInvoiceComponent,
    EditBoqComponent,
    BidDetailsComponent,
    BidNotesComponent,
    EditBidPopupComponent,
    VisitsComponent,
    DealNotesComponent,
    DealDetailsComponent,
    EditDealPopupComponent,
    EditVisitPopupComponent,
    VisitDetailsComponent,
    VisitNotesComponent,
    UsersComponent,
    EditUserPopupComponent,
    UserDetailsComponent,
    OrdersComponent,
    SuppliersComponent,
    SupplierDetailsComponent,
    EditSupplierPopupComponent,
    OrderDetailsComponent,
    EditOrderPopupComponent,
    PaymentTracksComponent,
    EditTrackComponent,
    PurchaseEditPopupComponent,
    PurchaseItemsComponent,
    WarehouseComponent,
    BackupComponent,
    VouchersComponent,
    BeneficiariesComponent,
    EditBeneficiaryPopupComponent,
    EditVoucherPopupComponent,
    VoucherDetailsComponent,
    VoucherNotesComponent,
    PdfViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatMomentDateModule,
    JwtModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    AutocompleteLibModule,
    NgxExtendedPdfViewerModule,
    PdfViewerModule,
    ChartsModule,
    TaskModule
  ],
  exports: [ListingComponent],
  providers: [
    MatDatepickerModule,
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
