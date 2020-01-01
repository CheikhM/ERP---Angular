import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {
  }

  sendSearchText(text: string) {
    this.sharedService.setSearchText(text);
  }
}
