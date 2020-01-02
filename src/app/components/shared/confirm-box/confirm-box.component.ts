import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.css']
})
export class ConfirmBoxComponent implements OnInit {
  @Input()
  popupID: string;

  constructor() {
  }

  ngOnInit() {
    // $('#deleteProjectModal').modal('show');
  }

}
