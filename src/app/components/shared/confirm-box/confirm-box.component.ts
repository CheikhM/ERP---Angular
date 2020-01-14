import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.css']
})
export class ConfirmBoxComponent implements OnInit {
  @Input()
  popupID: string;

  @Output() confirmAction: EventEmitter<any> = new EventEmitter();

  @Input()
  deleteTitle: string;

  constructor() {
  }

  ngOnInit() {
    // $('#deleteProjectModal').modal('show');
  }

  confirmDelete() {
    this.confirmAction.emit(true);
  }

  cancelDelete() {
    this.confirmAction.emit(false);
  }
}
