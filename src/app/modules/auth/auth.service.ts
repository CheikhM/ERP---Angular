import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Connection} from '../../config/connection.config';
import {map} from 'rxjs/operators';
import {User} from '../../models/user.model';
import {LocalStorageHelper} from '../../helpers/local-storage.helper';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(public jwtHelper: JwtHelperService,
              private http: HttpClient) {
  }

  // ...
  public isAuthenticated(): boolean {
    const token = LocalStorageHelper.getItem('token');
    // Check whether the token is expired and return
    // true or false
    try {
      return !this.jwtHelper.isTokenExpired(token);
    } catch (e) {
      return false;
    }
  }

  // login with uname and password
  checkCredentials(email: string, pwd: string): Observable<any> {
    const data = {
      email: email,
      password: pwd
    };
    return this.http.post(Connection.api.auth.login, data);
  }

  //login with google email
  checkLoginEmail(email: string): Observable<any> {
    return this.http.get(Connection.api.auth.loginEmail + '?email=' + email).pipe(map(result => result['data']));
  }


  // get the list of all non deleted user
  getAllUsers(role = 'all'): Observable<User []> {
    return this.http.get(Connection.api.users.getAll + '?role=' + role).pipe(
      map(response => response), map(users => {
        return User.arrayCast(users);
      })
    );
  }

  // get a user by id
  getUserByID(id: number): Observable<any> {
    return this.http.get(Connection.api.users.getSingle + '?id=' + id);
  }

  // delete a project using the project id
  deleteUser(id: number): Observable<any> {
    return this.http.get(Connection.api.users.deleteUser + '?id=' + id);
  }

  // add new bid
  newUser(user: User) {
    return this.http.post(Connection.api.users.newUser, user);
  }

  // edit existing bid
  updateUser(user: User) {
    return this.http.post(Connection.api.users.updateUser, user);
  }

}
