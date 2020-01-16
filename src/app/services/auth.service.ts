import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Connection} from '../config/connection.config';
import {map} from 'rxjs/operators';
import {Note} from '../models/note.model';
import {User} from '../models/user.model';

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

  // get the list of all non deleted users
  getAllUsers(roleID): Observable<User []> {
    return this.http.get(Connection.api.users.getAll + '?role=' + roleID).pipe(
      map(response => response), map(users => {
        return User.arrayCast(users);
      })
    );
  }

  // get a user by id
  getUserByID(id: number): Observable<any> {
    return this.http.get(Connection.api.users.getSingle + '?id=' + id);
  }
}
