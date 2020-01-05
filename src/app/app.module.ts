import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FiltersComponent } from './components/shared/filters/filters.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { PageTitleComponent } from './components/shared/page-title/page-title.component';
import { SearchBarComponent } from './components/shared/search-bar/search-bar.component';
import { SideBarComponent } from './components/shared/side-bar/side-bar.component';
import { ListingComponent } from './components/shared/listing/listing.component';
import { ConfirmBoxComponent } from './components/shared/confirm-box/confirm-box.component';
import { ListingTitleComponent } from './components/shared/listing-title/listing-title.component';
import { ProjectsListComponent } from './components/projects/projects-list/projects-list.component';
import {HttpClientModule} from '@angular/common/http';
import { ProjectDetailsComponent } from './components/projects/project-details/project-details.component';
import {FormsModule} from '@angular/forms';
import { WorkflowComponent } from './components/shared/workflow/workflow.component';
import { ProjectNotesComponent } from './components/projects/project-notes/project-notes.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
