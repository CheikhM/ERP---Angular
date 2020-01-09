import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectsListComponent} from './components/projects/projects-list/projects-list.component';
import {ProjectDetailsComponent} from './components/projects/project-details/project-details.component';
import {ProjectNotesComponent} from './components/projects/project-notes/project-notes.component';
import {InvoicesComponent} from './components/projects/invoices/invoices.component';
import {ProjectDevliverablesComponent} from './components/projects/project-devliverables/project-devliverables.component';
import {BoqsComponent} from './components/projects/boqs/boqs.component';
import {BidsComponent} from './components/sales/bids/bids.component';
import {DealsComponent} from './components/sales/deals/deals.component';
import {AuthGuardService as AuthGuard} from './services/auth-guard.service';
import {LoginComponent} from './components/auth/login/login.component';

// todo lazy loading
const routes: Routes = [
  { path: 'projects/all', component: ProjectsListComponent, canActivate: [AuthGuard] },
  { path: 'projects/project/' + ':id', component: ProjectDetailsComponent },
  { path: 'projects/project/' + ':id' + '/notes', component: ProjectNotesComponent },
  { path: 'projects/project/' + ':id' + '/bill-of-quantities', component: BoqsComponent },
  { path: 'projects/project/' + ':id' + '/deliverables', component: ProjectDevliverablesComponent },
  { path: 'projects/project/' + ':id' + '/invoices', component: InvoicesComponent },
  { path: 'sales/bids/all', component: BidsComponent },
  { path: 'sales/deals/all', component: DealsComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
