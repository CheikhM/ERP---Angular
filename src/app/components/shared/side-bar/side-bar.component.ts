import { Component, OnInit } from '@angular/core';
import {menuElements} from '../../../config';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  menuElements = menuElements;

  constructor() {

  }

  ngOnInit() {
  }

}
