import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Connection} from '../config/connection.config';
import {map} from 'rxjs/operators';
import {Supplier} from '../models/supplier.model';
import {Order} from '../models/order.model';

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

  // get a user by id
  getSupplierByID(id: number): Observable<any> {
    return this.http.get(Connection.api.suppliers.getSingle + '?id=' + id);
  }

  // delete a project using the project id
  deleteSupplier(id: number): Observable<any> {
    return this.http.get(Connection.api.suppliers.deleteSupplier + '?id=' + id);
  }

  // add new bid
  newSupplier(supplier: Supplier) {
    return this.http.post(Connection.api.suppliers.newSupplier, supplier);
  }

  // edit existing bid
  updateSupplier(supplier: Supplier) {
    return this.http.post(Connection.api.suppliers.updateSupplier, supplier);
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

}
