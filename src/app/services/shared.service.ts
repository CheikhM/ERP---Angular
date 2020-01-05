import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private searchText = new BehaviorSubject('');
  private workflowID = new BehaviorSubject(0);
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

  public setCurrentListingElement(object: any) {
    this.CurrentListingElement.next(object);
  }

  // setters and getters for the workflow ID
  public getworkflowID() {
    return this.workflowID.asObservable();
  }

  public setworkflowID(id: number) {
    this.workflowID.next(id);
  }

}
