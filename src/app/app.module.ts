import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FiltersComponent} from './components/shared/filters/filters.component';
import {HeaderComponent} from './components/shared/header/header.component';
import {PageTitleComponent} from './components/shared/page-title/page-title.component';
import {SearchBarComponent} from './components/shared/search-bar/search-bar.component';
import {SideBarComponent} from './components/shared/side-bar/side-bar.component';
import {ListingComponent} from './components/shared/listing/listing.component';
import {ConfirmBoxComponent} from './components/shared/confirm-box/confirm-box.component';
import {ListingTitleComponent} from './components/shared/listing-title/listing-title.component';
import {ProjectsListComponent} from './components/projects/projects-list/projects-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProjectDetailsComponent} from './components/projects/project-details/project-details.component';
import {FormsModule} from '@angular/forms';
import {WorkflowComponent} from './components/shared/workflow/workflow.component';
import {ProjectNotesComponent} from './components/projects/project-notes/project-notes.component';
import {ProjectDevliverablesComponent} from './components/projects/project-devliverables/project-devliverables.component';
import {InvoicesComponent} from './components/projects/invoices/invoices.component';
import {BoqsComponent} from './components/projects/boqs/boqs.component';
import {DetailsTitleComponent} from './components/projects/project-details/details-title/details-title.component';
import {BidsComponent} from './components/sales/bids/bids.component';
import {DealsComponent} from './components/sales/deals/deals.component';
import {EditProjectPopupComponent} from './components/projects/edit-project-popup/edit-project-popup.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule} from '@angular/material';
import {LoginComponent} from './components/auth/login/login.component';
import {AuthInterceptor} from './services/auth.interceptor';
import {JWT_OPTIONS, JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import { EditInvoiceComponent } from './components/projects/invoices/edit-invoice/edit-invoice.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { EditBoqComponent } from './components/projects/boqs/edit-boq/edit-boq.component';
import { BidDetailsComponent } from './components/sales/bids/bid-details/bid-details.component';
import { BidNotesComponent } from './components/sales/bids/bid-notes/bid-notes.component';
import { EditBidPopupComponent } from './components/sales/bids/edit-bid-popup/edit-bid-popup.component';
import { VisitsComponent } from './components/sales/visits/visits.component';
import {DealNotesComponent} from './components/sales/deals/deal-notes/deal-notes.component';
import { DealDetailsComponent } from './components/sales/deals/deal-details/deal-details.component';
import { EditDealPopupComponent } from './components/sales/deals/edit-deal-popup/edit-deal-popup.component';
import { EditVisitPopupComponent } from './components/sales/visits/edit-visit-popup/edit-visit-popup.component';
import { VisitDetailsComponent } from './components/sales/visits/visit-details/visit-details.component';
import { VisitNotesComponent } from './components/sales/visits/visit-notes/visit-notes.component';
import { UsersComponent } from './components/users/users.component';
import { EditUserPopupComponent } from './components/users/edit-user-popup/edit-user-popup.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';

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
    UserDetailsComponent
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
    MatDatepickerModule,
    MatNativeDateModule,
    JwtModule,
    ToastrModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [
    MatDatepickerModule,
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
