import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../models/project.model';
import {Connection} from '../config/connection.config';
import {map} from 'rxjs/operators';
import {Invoice} from '../models/invoice.model';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) {
  }

  // get the list of all non deleted projects
  getAllProjects(): Observable<Project []> {
    return this.http.get(Connection.api.projects.getAll).pipe(
      map(response => response), map(projects => {
        return Project.arrayCast(projects);
      })
    );
  }

  // get the list of all non deleted projects
  getAllCodes(): Observable<any> {
    return this.http.get(Connection.api.projects.getAllCodes);
  }
  // delete a project using the project id
  deleteProject(id: number): Observable<any> {
    return this.http.get(Connection.api.projects.delete + '?id=' + id);
  }

  // get a project by id
  getProjectByID(id: number): Observable<any> {
    return this.http.get(Connection.api.projects.getSingle + '?id=' + id);
  }

  // add new project
  newProject(project: Project) {
    return this.http.post(Connection.api.projects.newProject, project);
  }

  // add new invoice todo validate
  newInvoice(invoice: any) {
    return this.http.post(Connection.api.projects.newInvoice, invoice);
  }

  // add new invoice todo validate
  newBoq(bid: any) {
    return this.http.post(Connection.api.projects.newBoq, bid);
  }


  // add new invoice todo validate
  newGroup(pid: number, name: string) {
    return this.http.get(Connection.api.projects.newGroup + '?pid=' + pid +  '&name=' + name);
  }

  // get the list of all invoices of a given project
  getAllInvoices(pid): Observable<Invoice []> {
    return this.http.get(Connection.api.projects.getAllInvoices + '?pid=' + pid).pipe(
      map(response => response), map(invoices => {
        return Invoice.arrayCast(invoices);
      })
    );
  }

  // get the list of all invoices of a given project
  getAllBoqs(pid): Observable<any> {
    return this.http.get(Connection.api.projects.getAllBOQs + '?pid=' + pid);
  }

  // delete a project using the project id
  deleteInvoice(id: number): Observable<any> {
    return this.http.get(Connection.api.projects.deleteInvoice + '?id=' + id);
  }

  // edit existing project
  updateProject(project: Project) {
    return this.http.post(Connection.api.projects.updateProject, project);
  }


  // to be moved to global service
  groupEntityByStatus(entity: string, attr: string) {
    return this.http.get(Connection.api.projects.groupeByStatus + '?entity=' + entity  + '&attr=' + attr).pipe(map(res => res['data']));
  }
}
