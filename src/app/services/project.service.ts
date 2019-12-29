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

  getAllProjects(): Observable<Project []> {
    return this.http.get(Connection.api.projects.get).pipe(
      map(response => response), map(projects => {
        return Project.arrayCast(projects);
      })
    );
  }
}
