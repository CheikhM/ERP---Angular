import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-details-title',
  templateUrl: './details-title.component.html',
  styleUrls: ['./details-title.component.css']
})
export class DetailsTitleComponent implements OnInit {
  @Input()
  canAdd: boolean;
  @Input()
  title: string;

  constructor() { }

  ngOnInit() {
  }

}
