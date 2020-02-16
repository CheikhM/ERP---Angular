import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {Router} from '@angular/router';
import {LocalStorageHelper} from '../../../helpers/local-storage.helper';
import {GlobalHelper} from '../../../helpers/global.helper';
import {Subscription} from 'rxjs';

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
  private filterSub: Subscription;

  constructor(private sharedService: SharedService,
              private router: Router) {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.contents && changes.contents.currentValue) {

      console.log(changes.contents.currentValue);
      this.dataBackUp = JSON.parse(JSON.stringify(changes.contents.currentValue));

      const currentModule = GlobalHelper.getCurrentModule();
      const knownModule = GlobalHelper.getKnownFilterableModules();
      if (knownModule.includes(currentModule) && currentModule !== '') {
        const filters = LocalStorageHelper.getModuleFilters(currentModule);
        if (filters.status !== '*') {
          this.contents = this.dataBackUp.filter(object => object.status === filters.status);
          this.sharedService.filters.next({prop: 'status', val: filters.status});
        } else {
          this.contents = JSON.parse(JSON.stringify(this.dataBackUp));
          this.sharedService.filters.next({prop: 'status', val: '*'});
        }
      }
      this.listenToFilterChange();
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

  private listenToFilterChange() {
    this.filterSub = this.sharedService.filters.subscribe(filter => {
      if (this.dataBackUp && filter && filter.val !== '*') {
        this.contents = this.dataBackUp.filter(object => object[filter.prop] === filter.val);
      } else if (this.dataBackUp && filter && filter.val === '*') {
        this.contents = this.dataBackUp;
      }
    });
  }
}
