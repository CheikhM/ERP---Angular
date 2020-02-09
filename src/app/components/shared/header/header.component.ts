import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';
import {Subscription} from 'rxjs';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {BASE_PATH} from '../../../config';
import {LocalStorageHelper} from '../../../helpers/local-storage.helper';
import Global = WebAssembly.Global;
import {GlobalHelper} from '../../../helpers/global.helper';

declare var $: any;

@AutoUnsubscribe()
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
  profile: string;

  constructor(private sharedService: SharedService,
              private router: Router) {
  }

  ngOnInit() {
    this.loadPageHeader();
    this.getProfile();
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
        } else if (event.url.includes('users')
          || event.url.includes('backup')
          || event.url.includes('settings')
        ) {
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
    } else if (path.includes('visits')) {
      this.listingTitleData = {
        title: 'Visits',
        sTitle: 'Visit'
      };
    } else if (path.includes('users')) {
      this.listingTitleData = {
        title: 'Users',
        sTitle: 'User'
      };
    } else if (path.includes('tasks')) {
      this.listingTitleData = {
        title: 'Tasks',
        sTitle: 'Task'
      };
    } else if (path.includes('suppliers')) {
      this.listingTitleData = {
        title: 'Suppliers',
        sTitle: 'Supplier'
      };
    } else if (path.includes('orders/all')) {
      this.listingTitleData = {
        title: 'Orders',
        sTitle: 'Order'
      };
    } else if (path.includes('warehouse/all')) {
      this.listingTitleData = {
        title: 'Warehouse Items',
        sTitle: 'Item'
      };
    } else if (path.includes('beneficiaries/all')) {
      this.listingTitleData = {
        title: 'Beneficiaries',
        sTitle: 'Beneficiary'
      };
    } else if (path.includes('vouchers/all')) {
      this.listingTitleData = {
        title: 'Payment Vouchers',
        sTitle: 'Voucher'
      };
    }
  }

  toggleSideBar() {
    $('body').addClass('nav-opened');
    $('.close-layer').show();
  }

  logOut() {
    localStorage.removeItem('token');
    // window.location.replace('login');
    window.location.replace(BASE_PATH + 'login');
  }

  private getProfile() {
    const user = LocalStorageHelper.getItem('user');
    if (user && user.id) {
      this.profile = '/users/user/' + user.id;
    }
  }

  isFilterable() {
    return GlobalHelper.isFilterable();
  }
}
