import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SharedService} from '../../../services/shared.service';
import {NoteService} from '../../../services/note.service';
import {Note} from '../../../models/note.model';
import {ToastrService} from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-project-notes',
  templateUrl: './project-notes.component.html',
  styleUrls: ['./project-notes.component.css']
})

export class ProjectNotesComponent implements OnInit {
  currentProjectID: number;
  newNoteText = '';
  newNote: boolean;
  notes: any;
  filteredNotes: any;

  constructor(private route: ActivatedRoute,
              private sharedService: SharedService,
              private noteService: NoteService,
              private toastService: ToastrService) {
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

  addNewNote() {
    const note = Note.getEmptyNote();
    note.text = this.newNoteText;
    note.type = 1;
    note.typeID = this.currentProjectID;
    this.noteService.newNote(note).subscribe(
      res => {
        if (res['status'] === '200_OK') {
          this.toastService.success('', 'Successfully added');
          this.notes.push(note);
          this.filteredNotes.push(note);
        } else {
          this.toastService.error('', 'Error occurred');
        }
      },
      error => {
        this.toastService.error('', 'Error occurred');
      },
      () => {
        this.newNote = false;
        this.newNoteText = '';
      }
    );
  }

  toggleNewNote() {
    if (!this.newNote) {
      this.newNote = true;
    }

    setTimeout(() => {
      $('#newNote').focus();
    }, 30);
  }

  enableIt() {
    alert('ff');
  }
}
