import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';

@AutoUnsubscribe()
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

  public innerWidth: any;

  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  // emit the project id, to be edited
  editElement(id: number) {
    this.onEditClick.emit(id);
  }

  // emit the project id, to be soft deleted
  deleteElement(id: number) {
    this.onDeleteClick.emit(id);
  }

  // set the current object
  setCurrentListingObject(object: any) {
    this.sharedService.setCurrentListingElement(object);
  }

  getMaxText() {
    if (this.innerWidth > 1400) {
      return 22;
    }
    if (this.innerWidth > 1350) {
      return 18;
    }
    if (this.innerWidth > 768) {
      return 12;
    }
    return 12;
  }
}
