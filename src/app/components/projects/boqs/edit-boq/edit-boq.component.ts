import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ProjectService} from '../../../../services/project.service';

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

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
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

    const groupID = parseInt($('#groupID').val(), 10);
    if (groupID === 0 && groupText.length > 0) {
      this.projectService.newGroup(groupText);
    } else if (groupID && groupID > 0) {
      this.boqCopy.group_id = groupID;
      this.emitActionAdd.emit(this.boqCopy);
    }

  }

  emptyGroupName() {
    $('#newGroupText').val('');
  }
}
