import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit {

  @Input()
  objectID: number;

  constructor() { }

  ngOnInit() {
  }

}
