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

  @Output() onEditClick: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  editProject(id: number) {
    this.onEditClick.emit(id);
  }
}
