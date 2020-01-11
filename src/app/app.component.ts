import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'erp-dardelta-front';
  isAuth: boolean;

  constructor(private auth: AuthService) {

  }

  ngOnInit(): void {
    this.isAuth = this.auth.isAuthenticated();
  }


  closeNavBar() {
    $('body').removeClass('nav-opened');
    $('.close-layer').hide();

  }
}
