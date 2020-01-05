import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  listingPage = false;
  // includeWorkflow: boolean;

  currentPath: string;
  private workflowID: number;
  private workflowIDSub: Subscription;

  constructor(private sharedService: SharedService,
              private router: Router) {
  }

  ngOnInit() {
    this.loadPageHeader();
  }

  // the header is dynamic
  private loadPageHeader() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('all')) {
          this.listingPage = true;
        } else {
          this.listingPage = false;
        }
      }
    });

    // in case of details
    this.initializeWorkflow();
  }

  initializeWorkflow() {
    this.workflowIDSub = this.sharedService.getworkflowID().subscribe(id => this.workflowID = id);
  }

  ngOnDestroy(): void {
    this.workflowIDSub.unsubscribe();
  }
}
