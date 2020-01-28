import {LocalStorageHelper} from './local-storage.helper';
import {BASE_PATH} from '../config';

export class AuthHelper {

  static isPermitted(permission: string, redirect = true): boolean | void {
    const currentUser = LocalStorageHelper.getItem('user');
    if (currentUser && currentUser.role && currentUser.role.length >= 2) {


      const userRights = currentUser.role.split(',');

      // when permission is CEO or SA
      if (permission === 'CS' && (userRights.includes('CEO') || userRights.includes('SA'))) {
        if (!redirect) {
          return true;
        } else {
          window.location.replace(BASE_PATH + 'unauthorized');
        }
      } else if (permission === '*') {
        return true;
      }

      // whe simple manager
      if (!(userRights.includes('CEO') || userRights.includes('SA') || userRights.includes(permission))) {
        if (!redirect) {
          return false;
        } else {
          window.location.replace(BASE_PATH + 'unauthorized');
        }
      }
    } else {
      if (!redirect) {
        return false;
      } else {
        window.location.replace(BASE_PATH + 'unauthorized');
      }
    }


    return true;
  }


}
