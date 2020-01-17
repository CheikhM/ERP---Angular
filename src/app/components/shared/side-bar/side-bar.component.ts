import {Component, OnInit} from '@angular/core';
import {menuElements} from '../../../config';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {isNull} from 'util';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  menuElements = menuElements;

  constructor(public location: Location, private router: Router) {

  }

  ngOnInit() {
    // console.log(this.location.path());
  }

  navigateToRoute(route: string | null) {
    if (!isNull(route)) {
      this.router.navigateByUrl(route).then(item => {
        // alert('ff');
      });
    }
  }
}
