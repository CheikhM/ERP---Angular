import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Connection } from '../config/connection.config';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {
  }

  // login with uname and password
  notifyUser(data): Observable<any> {
    return this.http.post(Connection.api.notification.notify, data).pipe(map(result => result['data']));
  }

}
