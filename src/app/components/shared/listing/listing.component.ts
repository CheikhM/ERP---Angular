import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  @Input()
  model: string;
  @Input()
  metaDefinition: any [];
  @Input()
  contents: any [];
  // delete and edit actions
  @Output() onEditClick: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteClick: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  // emit the project id, to be edited
  editElement(id: number) {
    this.onEditClick.emit(id);
  }

  // emit the project id, to be soft deleted
  deleteElement(id: number) {
    this.onDeleteClick.emit(id);
  }
}
