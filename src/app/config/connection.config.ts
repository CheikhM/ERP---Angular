import {environment} from '../../environments/environment';

export class Connection {
  private static apiProject = environment['api'];

  public static get api(): any {
    return {
      projects: {
        getAll: this.apiProject + 'projects/all',
        getAllCodes: this.apiProject + 'projects/codes',
        getAllInvoices: this.apiProject + 'projects/invoices/all',
        getAllBOQs: this.apiProject + 'projects/boqs/all',
        newGroup: this.apiProject + 'projects/boqs/group/new',
        getSingle: this.apiProject + 'projects/project',
        newProject: this.apiProject + 'projects/new',
        updateProject: this.apiProject + 'projects/update',
        delete: this.apiProject + 'projects/delete',
        deleteInvoice: this.apiProject + 'projects/invoices/delete',
        newInvoice: this.apiProject + 'projects/invoices/new',
        newBoq: this.apiProject + 'projects/boqs/new',
        groupeByStatus: this.apiProject  + 'entity/groupby'
      },
      sales: {
        getAllBids: this.apiProject + 'sales/bids/all',
        getAllDeals: this.apiProject + 'sales/deals/all',
        getAllVisits: this.apiProject + 'sales/visits/all',
        getSingleBid: this.apiProject + 'sales/bid',
        getSingleDeal: this.apiProject + 'sales/deal',
        getSingleVisit: this.apiProject + 'sales/visit',
        deleteBid: this.apiProject + 'sales/bids/delete',
        deleteDeal: this.apiProject + 'sales/deals/delete',
        deleteVisit: this.apiProject + 'sales/visits/delete',
        newBid: this.apiProject + 'sales/bids/new',
        newDeal: this.apiProject + 'sales/deals/new',
        newVisit: this.apiProject + 'sales/visits/new',
        updateBid: this.apiProject + 'sales/bids/update',
        updateDeal: this.apiProject + 'sales/deals/update',
        updateVisit: this.apiProject + 'sales/visits/update',
      },
      notes: {
        getAll: this.apiProject + 'notes/all',
        newNote: this.apiProject + 'notes/new',
        updateNote: this.apiProject + 'notes/update',
        delete: this.apiProject + 'notes/delete'
      },
      auth: {
        login: this.apiProject + 'login',
        loginEmail: this.apiProject + 'auth/login/email'
      },
      users: {
        getAll: this.apiProject + 'users/all',
        getSingle: this.apiProject + 'users/user',
        deleteUser: this.apiProject + 'users/delete',
        newUser: this.apiProject + 'users/new',
        updateUser: this.apiProject + 'users/update',
      },
      tasks: this.apiProject + 'tasks',
      suppliers: {
        getAll: this.apiProject + 'suppliers/all',
        getSingle: this.apiProject + 'suppliers/supplier',
        deleteSupplier: this.apiProject + 'suppliers/delete',
        newSupplier: this.apiProject + 'suppliers/new',
        updateSupplier: this.apiProject + 'suppliers/update',
      },
      orders: {
        getAll: this.apiProject + 'orders/all',
        getAllTracks: this.apiProject + 'orders/tracks',
        getSingle: this.apiProject + 'orders/order',
        deleteOrder: this.apiProject + 'orders/delete',
        newOrder: this.apiProject + 'orders/new',
        updateOrder: this.apiProject + 'orders/update',
        deleteTrack: this.apiProject + 'orders/tracks/delete',
        newPurchase: this.apiProject + 'orders/items/new',
        updatePurchase: this.apiProject + 'orders/items/update',
        newTrack: this.apiProject + 'orders/tracks/new',
        updateTrack: this.apiProject + 'orders/tracks/update',
        getAllItems: this.apiProject + 'orders/items/all',
      },
      vouchers: {
        getAllBeneficiaries: this.apiProject + 'beneficiaries/all',
        getSingleBeneficiary: this.apiProject + 'beneficiaries/beneficiary',
        newBeneficiary: this.apiProject + 'beneficiaries/new',
        updateBeneficiary: this.apiProject + 'beneficiaries/update',
        deleteBeneficiary: this.apiProject + 'beneficiaries/delete',
        getAll: this.apiProject + 'vouchers/all',
        getSingle: this.apiProject + 'vouchers/voucher',
        deleteVoucher: this.apiProject + 'vouchers/delete',
        newVoucher: this.apiProject + 'vouchers/new',
        updateVoucher: this.apiProject + 'vouchers/update',
      },
      notification: {
        notify: this.apiProject + 'notify'
      }
    };
  }
}
