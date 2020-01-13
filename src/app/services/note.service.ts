import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../models/project.model';
import {Connection} from '../config/connection.config';
import {map} from 'rxjs/operators';
import {Note} from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  constructor(private http: HttpClient) {
  }

  // get the list of all non deleted notes
  getAllNotes(typeID: number, type: number): Observable<Note []> {
    return this.http.get(Connection.api.notes.getAll + '?type=' + type + '&type_id=' + typeID).pipe(
      map(response => response), map(notes => {
        return Note.arrayCast(notes);
      })
    );
  }

  // add new note
  newNote(note: Note) {
    return this.http.post(Connection.api.notes.newNote, note, {responseType: 'json'});
  }

}
