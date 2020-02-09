import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import {LocalStorageHelper} from '../../../helpers/local-storage.helper';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  status: string;

  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {
    this.status = LocalStorageHelper.getModuleFilters('project').status;
    console.log(this.status);

  }

  changFilter() {
    LocalStorageHelper.updateFilters('project', 'status', this.status);
    this.sharedService.filters.next({prop: 'status', val: this.status});
  }
}
