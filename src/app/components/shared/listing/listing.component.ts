import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {Router} from '@angular/router';
import {LocalStorageHelper} from '../../../helpers/local-storage.helper';
import {GlobalHelper} from '../../../helpers/global.helper';

@AutoUnsubscribe()
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit, OnChanges {
  @Input()
  model: string;
  @Input()
  metaDefinition: any [];
  @Input()
  contents: any [];
  // delete and edit actions
  @Output() onEditClick: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteClick: EventEmitter<any> = new EventEmitter();
  @Output() showPopupValues: EventEmitter<any> = new EventEmitter();

  public innerWidth: any;
  p = 1;
  @Input()
  icon: string;

  dataBackUp: any;

  @Input()
  modulePath: string;
  @Input()
  withWorkflow = true;

  constructor(private sharedService: SharedService,
              private router: Router) {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.sharedService.filters.subscribe(filter => {
      if (filter && filter.val !== '*') {
        this.contents = this.dataBackUp.filter(object => object[filter.prop] === filter.val);
      } else if (filter && filter.val === '*') {
        this.contents = this.dataBackUp;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.contents && changes.contents.currentValue) {
      if (!this.dataBackUp) {
        this.dataBackUp = JSON.parse(JSON.stringify(this.contents));
        const currentModule = GlobalHelper.getCurrentModule();
        if (currentModule === 'project') {
          const filters = LocalStorageHelper.getModuleFilters(currentModule);
          this.contents = this.dataBackUp.filter(object => object.status === filters.status);
        }
      }

    }
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
    // navigate if there is a workflow
    if (this.withWorkflow) {
      this.sharedService.setCurrentListingElement(object);
      this.router.navigateByUrl(this.modulePath + object.id).then(item => {
        // alert('ff');
      });
    } else {
      this.showPopupValues.emit(object.id);
    }
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
