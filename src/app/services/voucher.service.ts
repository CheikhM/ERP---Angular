import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Connection} from '../config/connection.config';
import {map} from 'rxjs/operators';
import {Voucher} from '../models/voucher.model';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private http: HttpClient) {
  }

  // get the list of all non deleted user
  getAllVouchers(): Observable<Voucher []> {
    return this.http.get(Connection.api.vouchers.getAll).pipe(
      map(response => response), map(vouchers => {
        return Voucher.arrayCast(vouchers);
      })
    );
  }

  // get a user by id
  getVoucherByID(id: number): Observable<any> {
    return this.http.get(Connection.api.vouchers.getSingle + '?id=' + id);
  }

  // delete a project using the project id
  deleteVoucher(id: number): Observable<any> {
    return this.http.get(Connection.api.vouchers.deleteVoucher + '?id=' + id);
  }

  // add new bid
  newVoucher(user: Voucher) {
    return this.http.post(Connection.api.vouchers.newVoucher, user);
  }

  // edit existing bid
  updateVoucher(user: Voucher) {
    return this.http.post(Connection.api.vouchers.updateVoucher, user);
  }

}
