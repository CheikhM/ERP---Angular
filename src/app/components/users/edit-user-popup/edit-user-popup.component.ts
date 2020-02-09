import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgModel} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {SharedService} from '../../../services/shared.service';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {User} from '../../../models/user.model';
import {LocalStorageHelper} from '../../../helpers/local-storage.helper';
import {BASE_PATH} from '../../../config';


declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-edit-user-popup',
  templateUrl: './edit-user-popup.component.html',
  styleUrls: ['./edit-user-popup.component.css']
})
export class EditUserPopupComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  title: string;

  @Input()
  user: any = User.getEmptyUser();

  @Output() onExitModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  password: string;
  userCopy: User;

  roles = User.getEmptyRoles();

  constructor(private authService: AuthService,
              private toastrService: ToastrService,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.userCopy = User.getEmptyUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user && !changes.user.firstChange) {
      this.roles = User.getEmptyRoles();
      this.userCopy = {...this.user};
      this.getRoles();
    }
  }

  restoreModal() {
    this.onExitModal.emit(true);
  }

  isEmpty(model: NgModel) {
    return this.isNotValid(model) && model.errors.required;
  }

  isNotValid(model: NgModel) {
    return model.invalid && (model.dirty || model.touched);
  }

  ngOnDestroy(): void {
  }

  saveUser() {
    const copyToSend = {
      ...this.userCopy,
      created_at: this.userCopy.createdAt,
      password: this.password,
      role: this.roles
    };

    // delete unused object
    delete copyToSend.createdAt;
    delete copyToSend.roles;

    // adding new project
    if (this.title === 'Add User') {

      this.authService.newUser(copyToSend).subscribe(
        result => {
          if (result['status'] === '200_OK' && result['data'].uid) {
            // tell the project about new data update
            $('#newUser').modal('hide');
            this.sharedService.setNewUpdate(true);
            this.toastrService.success('', 'Successfully added');
          } else {
            this.toastrService.error('', 'An error was occurred');
          }
        },
        error => this.toastrService.error('', 'An error was occurred'),
        () => {
          this.onExitModal.emit(true);
          this.password = '';
        }
      );
    } else if (this.title === 'Edit User') {
      delete copyToSend.created_at;

      if (!this.password || this.password.length < 8) {
        delete copyToSend.password;
      }

      this.authService.updateUser(copyToSend).subscribe(
        result => {
          if (result['status'] === '200_OK' && result['data'].uid) {
            $('#newUser').modal('hide');
            // tell the project about new data update
            this.sharedService.setNewUpdate(true);
            this.toastrService.success('', 'Successfully updated');
          } else {
            this.toastrService.error('', 'An error was occurred');
          }
        },
        error => this.toastrService.error('', 'An error was occurred'),
        () => {
          this.onExitModal.emit(true);
          this.password = '';
          const currentUser = LocalStorageHelper.getItem('user');
          if (currentUser.id === copyToSend.id) {
            LocalStorageHelper.removeItem('token');
            window.location.replace(BASE_PATH + 'login');
          }
        }
      );
    }
  }

  private getRoles() {
    const roles = this.userCopy.roles;
    roles.forEach(item => {
      this.roles[item] = true;
    });
  }

  isNotValidEmail(email: NgModel) {
    return this.isNotValid(email) && email.errors.pattern;
  }

  isNotValidPassword(password: NgModel) {
    return this.isNotValid(password) && password.errors.minlength;

  }
}
