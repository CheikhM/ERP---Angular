import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';
import {ActivatedRoute} from '@angular/router';
import {SharedService} from '../../../services/shared.service';
import {AuthService} from '../../../services/auth.service';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';

declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  roles: any = User.getEmptyRoles();
  readonly currentUserId: number;

  user = User.getEmptyUser();

  constructor(private route: ActivatedRoute,
              private sharedService: SharedService,
              private authService: AuthService) {
    // get the current visit id
    this.currentUserId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
  }

  ngOnInit() {
    this.getCurrentUser();
    // check for new update
    this.sharedService.getNewUpdate().subscribe(update => {
      if (update) {
        this.getCurrentUser(true);
      }
    });
  }

  private getCurrentUser(remote = null) {
    // if no current user was found
    // todo replace true with "remote"
    if (true) {
      this.authService.getUserByID(this.currentUserId).subscribe(
        result => {
          if (result && result.status === '200_OK') {
            this.user = new User(result.data);
          }
        },
        error => console.log('ici', error),
        () => this.getRoles()
      );

      return true;
    }
  }

  private getRoles() {
    const roles = this.user.roles;
    roles.forEach(item => {
      this.roles[item] = true;
    });
  }

  confirmUserDelete($event: any) {

  }

  triggerUserEdit() {
    $('#newUser').modal({
      backdrop: 'static',
      keyboard: false
    });
  }
}
