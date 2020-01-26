import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ToastrService} from 'ngx-toastr';
import {AutoUnsubscribe} from '../../decorators/autounsubscribe.decorator';
import {SalesService} from '../../services/sales.service';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';

declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  filteredUsers: any;

  metaDefinition = [
    {text: 'Full Name', attribute: 'name', type: 'PLString'},
    {text: 'Email', attribute: 'email'},
    {text: 'Username', attribute: 'username', type: 'string'},
    {text: 'Permissions', attribute: 'roles'},
  ];

  users: User [];
  manageAction = 'Add User';
  userTobeManaged: User;
  private toBeDeletedId: any;

  constructor(private sharedService: SharedService,
              private authService: AuthService,
              private toastrService: ToastrService) {
  }

  ngOnInit() {
    // check for new update
    this.sharedService.getNewUpdate().subscribe(update => this.getAllUsers());

    // search user
    this.sharedService.getSearchText().subscribe(item => {
      this.searchUser(item.toLocaleLowerCase());
    });
    this.getAllUsers();
  }

  getAllUsers() {
    this.authService.getAllUsers().subscribe(
      resp => {
        console.log(resp);
        this.users = resp;
        this.filteredUsers = resp;
      },
      error => console.log(error),
        () => {
        console.log(this.users);
        }
    );
  }

// search project by name
  private searchUser(text: string) {
    if (this.users) {
      this.filteredUsers = this.users.filter(user => user.name.toLowerCase().includes(text));
    }
  }

  editUser(userID: number) {
    this.manageAction = 'Edit User';
    this.userTobeManaged = this.users.find(item => item.id === userID);

    $('#newUser').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  deleteUser(userID: number) {
    this.toBeDeletedId = userID;

    $('#deleteUserModal').modal('show');
  }

  confirmUserDelete(action: boolean) {
    if (action && this.toBeDeletedId) {
      this.authService.deleteUser(this.toBeDeletedId).subscribe(result => {
        if (result && result.status === '200_OK') {
          this.toastrService.success('', 'Successfully deleted');
          this.users = this.users.filter(user => user.id !== this.toBeDeletedId);
          this.filteredUsers = this.users;
        } else {
          this.toastrService.error('', 'An Error was occurred');
        }
      }, error => {
        this.toastrService.error('', 'An Error was occurred');
      }, () => {
      });

      $('#deleteUserModal').modal('hide');
    }
  }
}
