import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Connection} from '../config/connection.config';
import {map} from 'rxjs/operators';
import {Supplier} from '../models/supplier.model';
import {Order} from '../models/order.model';
import {Invoice} from '../models/invoice.model';
import {Track} from '../models/track.model';
import {Purchase} from '../models/purchase.model';
import {Beneficiary} from '../models/beneficiary.model';
import {Voucher} from '../models/voucher.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  // get the list of all non deleted user
  getAllSuppliers(): Observable<Supplier []> {
    return this.http.get(Connection.api.suppliers.getAll).pipe(
      map(response => response), map(suppliers => {
        return Supplier.arrayCast(suppliers);
      })
    );
  }

  // get the list of all non deleted user
  getAllBeneficiaries(): Observable<Beneficiary []> {
    return this.http.get(Connection.api.vouchers.getAllBeneficiaries).pipe(
      map(response => response), map(beneficiaries => {
        return Beneficiary.arrayCast(beneficiaries);
      })
    );
  }


  // get a supplier by id
  getSupplierByID(id: number): Observable<Supplier> {
    return this.http.get(Connection.api.suppliers.getSingle + '?id=' + id).pipe(map(results => results['data']), map(item => new Supplier(item)));
  }

  // delete a project using the project id
  deleteSupplier(id: number): Observable<any> {
    return this.http.get(Connection.api.suppliers.deleteSupplier + '?id=' + id);
  }

  // delete a project using the project id
  deleteTrack(id: number): Observable<any> {
    return this.http.get(Connection.api.orders.deleteTrack + '?id=' + id);
  }

  // add new bid
  newSupplier(supplier: Supplier) {
    return this.http.post(Connection.api.suppliers.newSupplier, supplier);
  }

  // edit existing bid
  updateSupplier(supplier: Supplier) {
    return this.http.post(Connection.api.suppliers.updateSupplier, supplier);
  }

  // add new bid
  newPurchase(purchase: Purchase) {
    return this.http.post(Connection.api.orders.newPurchase, purchase);
  }

  // add new bid
  newTrack(track: Track) {
    return this.http.post(Connection.api.orders.newTrack, track);
  }

  // edit existing bid
  updateTrack(track: any) {
    return this.http.post(Connection.api.orders.updateTrack, track);
  }

  // edit existing bid
  updatePurchase(purchase: any) {
    return this.http.post(Connection.api.orders.updatePurchase, purchase);
  }

  // get the list of all non deleted user
  getAllOrders(): Observable<Order []> {
    return this.http.get(Connection.api.orders.getAll).pipe(
      map(response => response), map(orders => {
        return Order.arrayCast(orders);
      })
    );
  }

  // delete a project using the project id
  deleteOrder(id: number): Observable<any> {
    return this.http.get(Connection.api.orders.deleteOrder + '?id=' + id);
  }

  // add new bid
  newOrder(order: Order) {
    return this.http.post(Connection.api.orders.newOrder, order);
  }

  // edit existing bid
  updateOrder(order: Order) {
    return this.http.post(Connection.api.orders.updateOrder, order);
  }

  // get a order by id
  getOrderByID(id: number): Observable<any> {
    return this.http.get(Connection.api.orders.getSingle + '?id=' + id);
  }

  // get the list of all invoices of a given project
  getAllTracks(trackID): Observable<Track []> {
    return this.http.get(Connection.api.orders.getAllTracks + '?id=' + trackID).pipe(
      map(response => response), map(tracks => {
        return Track.arrayCast(tracks);
      })
    );
  }


  // get the list of all invoices of a given project
  getAllItems(oid = 0, received = 0, pid = 0): Observable<Purchase []> {
    return this.http.get(Connection.api.orders.getAllItems + '?id=' + oid + '&received=' + received + '&pid=' + pid).pipe(
      map(response => response), map(items => {
        return Purchase.arrayCast(items);
      }));
  }

  // add new beneficiary
  newBeneficiary(beneficiary: Beneficiary) {
    return this.http.post(Connection.api.vouchers.newBeneficiary, beneficiary);
  }

  // edit existing beneficiary
  updateBeneficiary(beneficiary: Beneficiary) {
    return this.http.post(Connection.api.vouchers.updateBeneficiary, beneficiary);
  }


  deleteBeneficiary(toBeDeletedId: any) {
    return this.http.get(Connection.api.vouchers.deleteBeneficiary + '?id=' + toBeDeletedId);
  }

  // get a supplier by id
  getBeneficiaryByID(id: number): Observable<Beneficiary> {
    return this.http.get(Connection.api.vouchers.getSingleBeneficiary + '?id=' + id).pipe(map(results => results['data']), map(item => new Beneficiary(item)));
  }
}
