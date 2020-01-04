import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private searchText = new BehaviorSubject('');
  private CurrentListingElement = new BehaviorSubject(null);

  constructor() {
  }

  public getSearchText() {
    return this.searchText.asObservable();
  }

  public setSearchText(searchText: string) {
    this.searchText.next(searchText);
  }


  // setters and getters for current project
  public getCurrentListingElement() {
    return this.CurrentListingElement.asObservable();
  }

  public setCurrentListingElement(searchText: string) {
    this.CurrentListingElement.next(searchText);
  }

}
