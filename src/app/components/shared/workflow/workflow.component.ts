import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {SharedService} from '../../../services/shared.service';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';


@AutoUnsubscribe()
@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit {

  @Input()
  objectID: number;

  itemsPath: string;

  constructor(public location: Location,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.sharedService.getCurrentWorkflowPath().subscribe(item => this.itemsPath = item);
  }

}
