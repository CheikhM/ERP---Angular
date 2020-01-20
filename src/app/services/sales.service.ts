import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Connection} from '../config/connection.config';
import {map} from 'rxjs/operators';
import {Invoice} from '../models/invoice.model';
import {Bid} from '../models/bid.model';
import {Deal} from '../models/deal.model';


@Injectable({
  providedIn: 'root'
})
export class SalesService {
  constructor(private http: HttpClient) {
  }

  // get the list of all non deleted bids
  getAllBids(): Observable<Bid []> {
    return this.http.get(Connection.api.sales.getAllBids).pipe(
      map(response => response), map(bids => {
        return Bid.arrayCast(bids);
      })
    );
  }

  // get the list of all non deleted deals
  getAllDeals(): Observable<Deal []> {
    return this.http.get(Connection.api.sales.getAllDeals).pipe(
      map(response => response), map(deals => {
        return Deal.arrayCast(deals);
      })
    );
  }

  // delete a project using the project id
  deleteBid(id: number): Observable<any> {
    return this.http.get(Connection.api.sales.deleteBid + '?id=' + id);
  }

  // get a project by id
  getBidByID(id: number): Observable<any> {
    return this.http.get(Connection.api.sales.getSingleBid + '?id=' + id);
  }

  // add new bid
  newBid(bid: Bid) {
    return this.http.post(Connection.api.sales.newBid, bid);
  }

  // edit existing bid
  updateBid(bid: Bid) {
    return this.http.post(Connection.api.sales.updateBid, bid);
  }

  // add new invoice todo validate
  newInvoice(invoice: any) {
    return this.http.post(Connection.api.projects.newInvoice, invoice);
  }

  // get the list of all invoices of a given project
  getAllInvoices(pid): Observable<Invoice []> {
    return this.http.get(Connection.api.projects.getAllInvoices + '?pid=' + pid).pipe(
      map(response => response), map(invoices => {
        return Invoice.arrayCast(invoices);
      })
    );
  }

  // delete a project using the project id
  deleteInvoice(id: number): Observable<any> {
    return this.http.get(Connection.api.projects.deleteInvoice + '?id=' + id);
  }


}
