import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {SharedService} from './services/shared.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'erp-dardelta-front';
  isAuth: boolean;

  constructor(private auth: AuthService,
              private jwtHelper: JwtHelperService,
              private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.isAuth = this.auth.isAuthenticated();
    this.setCurrentUser();
  }


  closeNavBar() {
    $('body').removeClass('nav-opened');
    $('.close-layer').hide();

  }

  private setCurrentUser() {
    const token = localStorage.getItem('token');
    if (token && token !== '') {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const user = {id: decodedToken['user_id'], name: decodedToken['full_name'], role: decodedToken['user_role']};
      console.log(user);
      this.sharedService.setCurrentUser(user);
    }
  }
}
