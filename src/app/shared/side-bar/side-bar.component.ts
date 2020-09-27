import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import { menuElements } from 'src/app/core/enums/side-bar.config';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  menuElements = menuElements;

  constructor(public location: Location, private router: Router) {}

  ngOnInit() {
  }

  navigateToRoute(route: string) {
    if (!!route) {
      this.router.navigateByUrl(route).then(item => {
      });
    }
  }
}
