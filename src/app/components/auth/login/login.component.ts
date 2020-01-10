import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {Connection} from '../../../config/connection.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loginError = false;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  checkLogin() {
    this.auth.checkCredentials(this.username, this.password).subscribe(
      result => {
        if (result && result.uid) {
          localStorage.setItem('token', result.token);
          location.reload();
        } else {
          this.loginError = true;
        }
      }
    );
  }
}
