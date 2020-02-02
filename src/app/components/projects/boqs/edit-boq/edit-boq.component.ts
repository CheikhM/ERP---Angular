import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ProjectService} from '../../../../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {DateHelper} from '../../../../helpers/date.helper';

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
    const groupText = $('#newGroupText').val();

    this.boqCopy.delivery_date = DateHelper.getDateTime(new Date(this.boqCopy.delivery_date));
    const groupID = parseInt($('#groupID').val(), 10);
    if (groupID === 0 && groupText.length > 0) {
      this.projectService.newGroup(this.currentProjectID, groupText).subscribe(result => {
        if (result && result['data'] && result['data'].gid) {
          this.boqCopy.group_id = result['data'].gid;
          this.emitActionAdd.emit(this.boqCopy);
        }
      }, error => {
      }, () => {
      });
    } else if (groupID && groupID > 0) {
      this.boqCopy.group_id = groupID;
      this.emitActionAdd.emit(this.boqCopy);
    }
  }

  emptyGroupName() {
    $('#newGroupText').val('');
  }
}
