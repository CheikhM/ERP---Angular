import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SharedService} from '../../../services/shared.service';

declare var $: any;

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {
  }

  sendSearchText(text: string) {
    this.sharedService.setSearchText(text);
  }

  detectDirection(text: string) {
    const firstLetter = text.charAt(0);
    const arabic = /[\u0600-\u06FF]/;

    return arabic.test(firstLetter);
  }

  toggleFilters() {
    $('.filters').toggleClass('hidden');
  }
}
