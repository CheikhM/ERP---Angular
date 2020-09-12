import {Component, OnInit} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {LocalStorageHelper} from './helpers/local-storage.helper';
import { AuthService } from './modules/auth/auth.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'erp-dardelta-front';
  isAuth: boolean;

  constructor(private auth: AuthService,
              private jwtHelper: JwtHelperService) {
  }

  ngOnInit(): void {
    this.isAuth = this.auth.isAuthenticated();
    this.setCurrentUser();



    /* initialize filters
    const filters = LocalStorageHelper.getItem('filters');
    if (!filters && window.location.pathname !== BASE_PATH + 'login') {
      LocalStorageHelper.initialiseFilters();
    }
    */
  }


  closeNavBar() {
    $('body').removeClass('nav-opened');
    $('.close-layer').hide();
  }

  private setCurrentUser() {
    const token = LocalStorageHelper.getItem('token');
    if (token && token !== '') {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const user = {id: decodedToken['user_id'], name: decodedToken['full_name'], role: decodedToken['role']};
      LocalStorageHelper.setItem('user', user);
      // this.sharedService.setCurrentUser(user);
    }
  }
}
