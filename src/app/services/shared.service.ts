import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private searchText = new BehaviorSubject('');

  constructor() {
  }

  public getSearchText() {
    return this.searchText.asObservable();
  }

  public setSearchText(searchText: string) {
    this.searchText.next(searchText);
  }
}
