import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';
import {Subscription} from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  listingPage: boolean;
  workflowPresent: boolean;
  currentPath: string;
  public workflowID: number;
  private workflowIDSub: Subscription;
  listingTitleData: any;

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
          this.workflowPresent = false;
          this.listingPage = true;
          this.loadHeaderTitlesInfos(event.url);
        } else if (event.url === '/') {
          this.listingPage = false;
          this.workflowPresent = false;
        } else {
          this.workflowPresent = true;
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

  // todo rework
  private loadHeaderTitlesInfos(path: string) {
    if (path.includes('bids')) {
      this.listingTitleData = {
        title: 'Bids',
        sTitle: 'Bid'
      };
    } else if (path.includes('deals')) {
      this.listingTitleData = {
        title: 'Deals',
        sTitle: 'Deal'
      };
    } else if (path.includes('projects')) {
      this.listingTitleData = {
        title: 'Projects',
        sTitle: 'Project'
      };
    }
  }

  toggleSideBar() {
    $('body').addClass('nav-opened');
    $('.close-layer').show();
  }

  logOut() {
    localStorage.removeItem('token');
    window.location.replace('/login');
  }
}
