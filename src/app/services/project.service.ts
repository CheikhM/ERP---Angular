import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../models/project.model';
import {Connection} from '../config/connection.config';
import {map} from 'rxjs/operators';


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


  // edit existing project
  updateProject(project: Project) {
    return this.http.post(Connection.api.projects.updateProject, project);
  }

}
