import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-details-title',
  templateUrl: './details-title.component.html',
  styleUrls: ['./details-title.component.css']
})
export class DetailsTitleComponent implements OnInit {
  @Input()
  canAdd: boolean;
  @Input()
  title: string;

  @Output() onClickAdd: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  addItem() {
    this.onClickAdd.emit(true);
  }
}
