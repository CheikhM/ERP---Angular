import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectsListComponent} from './modules/projects/projects-list/projects-list.component';
import {ProjectDetailsComponent} from './modules/projects/project-details/project-details.component';
import {ProjectNotesComponent} from './modules/projects/project-notes/project-notes.component';
import {InvoicesComponent} from './modules/projects/invoices/invoices.component';
import {ProjectDevliverablesComponent} from './modules/projects/project-devliverables/project-devliverables.component';
import {BoqsComponent} from './modules/projects/boqs/boqs.component';
import {BidsComponent} from './modules/sales/bids/bids.component';
import {DealsComponent} from './modules/sales/deals/deals.component';
import {AuthGuardService as AuthGuard} from './services/auth-guard.service';
import {LoginComponent} from './modules/auth/login/login.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {BidDetailsComponent} from './modules/sales/bids/bid-details/bid-details.component';
import {BidNotesComponent} from './modules/sales/bids/bid-notes/bid-notes.component';
import {VisitsComponent} from './modules/sales/visits/visits.component';
import {DealNotesComponent} from './modules/sales/deals/deal-notes/deal-notes.component';
import {DealDetailsComponent} from './modules/sales/deals/deal-details/deal-details.component';
import {VisitDetailsComponent} from './modules/sales/visits/visit-details/visit-details.component';
import {VisitNotesComponent} from './modules/sales/visits/visit-notes/visit-notes.component';
import {UsersComponent} from './modules/users/users.component';
import {UserDetailsComponent} from './modules/users/user-details/user-details.component';
import {TasksComponent} from './modules/tasks/tasks.component';
import {TaskDetailsComponent} from './modules/tasks/task-details/task-details.component';
import {TaskNotesComponent} from './modules/tasks/task-notes/task-notes.component';
import {SuppliersComponent} from './modules/orders/suppliers/suppliers.component';
import {OrdersComponent} from './modules/orders/orders.component';
import {OrderDetailsComponent} from './modules/orders/order-details/order-details.component';
import {PaymentTracksComponent} from './modules/orders/payment-tracks/payment-tracks.component';
import {PurchaseItemsComponent} from './modules/orders/purchase-items/purchase-items.component';
import {WarehouseComponent} from './modules/warehouse/warehouse.component';
import {BackupComponent} from './modules/backup/backup.component';
import {VouchersComponent} from './modules/vouchers/vouchers.component';
import {BeneficiariesComponent} from './modules/beneficiaries/beneficiaries.component';
import {VoucherDetailsComponent} from './modules/vouchers/voucher-details/voucher-details.component';
import {VoucherNotesComponent} from './modules/vouchers/voucher-notes/voucher-notes.component';

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
  { path: 'tasks/all', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'tasks/task/' + ':id', component: TaskDetailsComponent, canActivate: [AuthGuard] },
  { path: 'tasks/task/' + ':id' + '/notes', component: TaskNotesComponent, canActivate: [AuthGuard] },
  { path: 'orders/suppliers/all', component: SuppliersComponent, canActivate: [AuthGuard] },
  { path: 'orders/all', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'orders/order/' + ':id', component: OrderDetailsComponent, canActivate: [AuthGuard] },
  { path: 'orders/order/' + ':id' + '/tracks', component: PaymentTracksComponent, canActivate: [AuthGuard] },
  { path: 'orders/order/' + ':id' + '/items', component: PurchaseItemsComponent, canActivate: [AuthGuard] },
  { path: 'warehouse/all', component: WarehouseComponent, canActivate: [AuthGuard] },
  { path: 'backup', component: BackupComponent, canActivate: [AuthGuard] },
  { path: 'vouchers/all', component: VouchersComponent, canActivate: [AuthGuard] },
  { path: 'vouchers/voucher/' + ':id', component: VoucherDetailsComponent, canActivate: [AuthGuard] },
  { path: 'vouchers/voucher/' + ':id' + '/notes', component: VoucherNotesComponent, canActivate: [AuthGuard] },
  { path: 'beneficiaries/all', component: BeneficiariesComponent, canActivate: [AuthGuard] },
  { path: '**', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
