import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SharedService} from '../../../services/shared.service';
import {NoteService} from '../../../services/note.service';
import {Note} from '../../../models/note.model';

@Component({
  selector: 'app-project-notes',
  templateUrl: './project-notes.component.html',
  styleUrls: ['./project-notes.component.css']
})

export class ProjectNotesComponent implements OnInit {
  currentProjectID: number;
  newNoteText = '';
  notes: any;
  filteredNotes: any;

  constructor(private route: ActivatedRoute,
              private sharedService: SharedService,
              private noteService: NoteService) {
  }

  ngOnInit() {
    this.currentProjectID = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.sharedService.setworkflowID(this.currentProjectID);

    this.listAllNotes();
  }

  // get all projects
  listAllNotes() {
    this.noteService.getAllNotes(this.currentProjectID, 1).subscribe(
      resp => {
        this.notes = resp;
        this.filteredNotes = this.notes.map(note => Object.assign({}, note));
      },
      error => {
      },
      () => {
        // this.cloneDate();
      }
    );
  }

  isChanged(note: Note) {
    const originNote = this.notes.find(item => item.id === note.id);
    return originNote.text !== note.text;
  }

  private cloneDate() {
    this.filteredNotes = [...this.notes];
  }
}
