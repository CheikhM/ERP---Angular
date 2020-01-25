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
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {BidDetailsComponent} from './components/sales/bids/bid-details/bid-details.component';
import {BidNotesComponent} from './components/sales/bids/bid-notes/bid-notes.component';
import {VisitsComponent} from './components/sales/visits/visits.component';
import {DealNotesComponent} from './components/sales/deals/deal-notes/deal-notes.component';
import {DealDetailsComponent} from './components/sales/deals/deal-details/deal-details.component';
import {VisitDetailsComponent} from './components/sales/visits/visit-details/visit-details.component';
import {VisitNotesComponent} from './components/sales/visits/visit-notes/visit-notes.component';
import {UsersComponent} from './components/users/users.component';
import {UserDetailsComponent} from './components/users/user-details/user-details.component';

// todo lazy loading
const routes: Routes = [
  { path: 'projects/all', component: ProjectsListComponent, canActivate: [AuthGuard] },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'projects/project/' + ':id', component: ProjectDetailsComponent, canActivate: [AuthGuard] },
  { path: 'projects/project/' + ':id' + '/notes', component: ProjectNotesComponent, canActivate: [AuthGuard] },
  { path: 'projects/project/' + ':id' + '/bill-of-quantities', component: BoqsComponent, canActivate: [AuthGuard] },
  { path: 'projects/project/' + ':id' + '/deliverables', component: ProjectDevliverablesComponent, canActivate: [AuthGuard] },
  { path: 'projects/project/' + ':id' + '/invoices', component: InvoicesComponent, canActivate: [AuthGuard] },
  { path: 'sales/bids/all', component: BidsComponent, canActivate: [AuthGuard] },
  { path: 'sales/bid/' + ':id', component: BidDetailsComponent, canActivate: [AuthGuard] },
  { path: 'sales/bid/' + ':id' + '/notes', component: BidNotesComponent, canActivate: [AuthGuard] },
  { path: 'sales/deals/all', component: DealsComponent, canActivate: [AuthGuard] },
  { path: 'sales/deal/' + ':id', component: DealDetailsComponent, canActivate: [AuthGuard] },
  { path: 'sales/deal/' + ':id' + '/notes', component: DealNotesComponent, canActivate: [AuthGuard] },
  { path: 'sales/visits/all', component: VisitsComponent, canActivate: [AuthGuard] },
  { path: 'sales/visit/' + ':id', component: VisitDetailsComponent, canActivate: [AuthGuard] },
  { path: 'sales/visit/' + ':id' + '/notes', component: VisitNotesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'users/all', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'users/user/' + ':id', component: UserDetailsComponent, canActivate: [AuthGuard] },
  { path: '**', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
