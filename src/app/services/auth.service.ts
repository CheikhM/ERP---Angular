import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Connection} from '../config/connection.config';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(public jwtHelper: JwtHelperService, private http: HttpClient) {
  }

  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    try {
      return !this.jwtHelper.isTokenExpired(token);
    } catch (e) {
      return false;
    }
  }


  checkCredentials(user: string, pwd: string): Observable<any> {
    const data = {
      username: user,
      password: pwd
    };
    return this.http.post(Connection.api.auth.login, data).pipe(map(result => result['data']));
  }
}
