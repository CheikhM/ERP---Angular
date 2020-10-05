import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { GlobalHelper } from 'src/app/core/helpers/global.helper';
import { LocalStorageHelper } from 'src/app/core/helpers/local-storage.helper';
import { SharedService } from '../shared.service';

declare var $: any;

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  status: string;
  module: string;
  knownItems = [];

  constructor(private sharedService: SharedService, private router: Router) {
  }

  ngOnInit() {
    this.module = GlobalHelper.getCurrentModule();
    this.status = LocalStorageHelper.getModuleFilters(this.module).status;

    this.getStatus();


    this.router.events.subscribe((val) => {
      const known = GlobalHelper.getKnownFilterableModules();
      if (val instanceof NavigationEnd) {
        this.module = GlobalHelper.getCurrentModule();
        if (known.includes(this.module) && this.module !== '') {
          this.status = LocalStorageHelper.getModuleFilters(this.module).status;
          this.getStatus();
        }
        $('.filters').addClass('hidden');
      }
    });
  }

  changFilter() {
    LocalStorageHelper.updateFilters(this.module, 'status', this.status);
    this.sharedService.filters.next({prop: 'status', val: this.status});
  }

  private getStatus() {
    this.knownItems = [];
    const project = ['Archived', 'On Hold', 'In Progress', 'Completed'];
    const task = ['Opened', 'On Hold', 'Closed'];
    const bid = ['Archived', 'In Progress', 'Submitted'];
    const deal = ['Archived', 'Analysis', 'Negotiation', 'Submitted'];
    const order = ['Opened', 'Closed'];
    const warehouse = ['Check In', 'Check Out'];

    const currentModule = GlobalHelper.getCurrentModule();
    if (currentModule) {
      switch (currentModule) {
        case 'project':
          this.knownItems = this.knownItems.concat(project);
          break;
        case 'task':
          this.knownItems = this.knownItems.concat(task);
          break;
        case 'bid':
          this.knownItems = this.knownItems.concat(bid);
          break;
        case 'deal':
          this.knownItems = this.knownItems.concat(deal);
          break;
        case 'order':
          this.knownItems = this.knownItems.concat(order);
          break;
        case 'warehouse':
          this.knownItems = this.knownItems.concat(warehouse);
          break;
      }
    }

  }
}
