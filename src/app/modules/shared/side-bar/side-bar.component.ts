import {Component, OnInit} from '@angular/core';
import {menuElements} from '../../../config';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {isNull} from 'util';
import {AuthHelper} from '../../../helpers/auth.helper';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  menuElements = menuElements;

  constructor(public location: Location, private router: Router) {

  }

  ngOnInit() {
  }

  navigateToRoute(route: string | null) {
    if (!isNull(route)) {
      this.router.navigateByUrl(route).then(item => {
        // alert('ff');
      });
    }
  }

  isPermitted(permission: string) {
    return AuthHelper.isPermitted(permission, false);
  }
}
