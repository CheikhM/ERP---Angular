import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Connection} from '../config/connection.config';
import {map} from 'rxjs/operators';
import {Task} from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) {
  }

  // get the list of all non deleted user
  getAllTasks(): Observable<Task []> {
    return this.http.get(Connection.api.tasks.getAll).pipe(
      map(response => response), map(tasks => {
        return Task.arrayCast(tasks);
      })
    );
  }

  // get a user by id
  getTaskByID(id: number): Observable<any> {
    return this.http.get(Connection.api.tasks.getSingle + '?id=' + id);
  }

  // delete a project using the project id
  deleteTask(id: number): Observable<any> {
    return this.http.get(Connection.api.tasks.deleteTask + '?id=' + id);
  }

  // add new bid
  newTask(user: Task) {
    return this.http.post(Connection.api.tasks.newTask, user);
  }

  // edit existing bid
  updateTask(user: Task) {
    return this.http.post(Connection.api.tasks.updateTask, user);
  }

}
