import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ProjectService} from '../../../../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {DateHelper} from '../../../../helpers/date.helper';
import {NgModel} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-edit-boq',
  templateUrl: './edit-boq.component.html',
  styleUrls: ['./edit-boq.component.css']
})
export class EditBoqComponent implements OnInit, OnChanges {

  @Input()
  groups: any;

  @Input()
  boq;

  boqCopy: any;

  @Input()
  title: string;

  @Output()
  emitActionAdd: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  currentGroupID: number;
  private currentProjectID: number;
  newItemsGroup: string;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentProjectID = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    if (!this.boq) {
      this.boqCopy = {
        id: null,
        Item: null,
        quantity: null,
        cost: null,
        price: null,
        delivery_date: null,
        po_no: null,
        progress: null,
      };
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.boq) {
      this.boqCopy = Object.assign({}, this.boq);
    }
  }

  actionProject() {
    this.boqCopy.delivery_date = DateHelper.getDateTime(new Date(this.boqCopy.delivery_date));

    if (this.currentGroupID == 0 && this.newItemsGroup.length > 0) {
      this.projectService.newGroup(this.currentProjectID, this.newItemsGroup).subscribe(result => {
        if (result && result['data'] && result['data'].gid) {
          this.boqCopy.group_id = result['data'].gid;
          this.emitActionAdd.emit(this.boqCopy);
        }
      }, error => {
      }, () => {
      });
    } else if (this.currentGroupID && this.currentGroupID > 0) {
      this.boqCopy.group_id = this.currentGroupID;
      this.emitActionAdd.emit(this.boqCopy);
    }
  }

  emptyGroupName() {
    if (this.currentGroupID === 0) {
      setTimeout(() => {
        $('#newGroupText').focus();
      }, 20);
    }
    this.newItemsGroup = '';
  }

  isEmpty(model: NgModel) {
    return this.isNotValid(model) && model.errors.required;
  }

  isNotValid(model: NgModel) {
    return model.invalid && (model.dirty || model.touched);
  }

}
