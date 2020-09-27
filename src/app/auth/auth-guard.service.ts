import {ActivatedRoute, CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {BASE_PATH} from '../../config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService,
              public router: Router,
              private route: ActivatedRoute) {

  }
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      window.location.replace(BASE_PATH + 'login');

      return false;
    }
    return true;
  }
}
