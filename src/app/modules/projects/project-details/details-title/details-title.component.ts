import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-details-title',
  templateUrl: './details-title.component.html',
  styleUrls: ['./details-title.component.scss']
})
export class DetailsTitleComponent implements OnInit {
  @Input()
  canAdd: boolean;
  @Input()
  title: string;

  @Output() onClickAdd: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onClickPrint: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  printable: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  addItem() {
    this.onClickAdd.emit(true);
  }

  printItem() {
    this.onClickPrint.emit(true);
  }
}
