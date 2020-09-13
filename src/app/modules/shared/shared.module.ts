import { NgModule } from "@angular/core";


import {FiltersComponent} from './filters/filters.component';
import {HeaderComponent} from './header/header.component';
import {PageTitleComponent} from './page-title/page-title.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {SideBarComponent} from './side-bar/side-bar.component';
import {ListingComponent} from './listing/listing.component';
import {ConfirmBoxComponent} from './confirm-box/confirm-box.component';
import {ListingTitleComponent} from './listing-title/listing-title.component';
import {WorkflowComponent} from './workflow/workflow.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetailsTitleComponent } from './details-title/details-title.component';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  declarations: [
    FiltersComponent,
    HeaderComponent,
    PageTitleComponent,
    SearchBarComponent,
    SideBarComponent,
    ListingComponent,
    ConfirmBoxComponent,
    ListingTitleComponent,
    WorkflowComponent,
    PdfViewerComponent,
    DetailsTitleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatMomentDateModule,
    RouterModule,
    NgxPaginationModule,
    HttpClientModule,
    NgxExtendedPdfViewerModule,
    PdfViewerModule,

  ],
  exports: [
    FiltersComponent,
    HeaderComponent,
    PageTitleComponent,
    SearchBarComponent,
    SideBarComponent,
    ListingComponent,
    ConfirmBoxComponent,
    ListingTitleComponent,
    WorkflowComponent,
    PdfViewerComponent,
    DetailsTitleComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatMomentDateModule,
    NgxPaginationModule,
    HttpClientModule,
    NgxExtendedPdfViewerModule,
    PdfViewerModule,
  ]
})
export class SharedModule {}
