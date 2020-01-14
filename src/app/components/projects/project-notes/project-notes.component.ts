import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SharedService} from '../../../services/shared.service';
import {NoteService} from '../../../services/note.service';
import {Note} from '../../../models/note.model';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-project-notes',
  templateUrl: './project-notes.component.html',
  styleUrls: ['./project-notes.component.css']
})

export class ProjectNotesComponent implements OnInit, OnDestroy {
  currentProjectID: number;
  newNoteText = '';
  newNote: boolean;
  notes: any;
  filteredNotes: any;
  private toBeDeletedId: number;
  currentUser: any;
  private currentUserSub: Subscription;

  constructor(private route: ActivatedRoute,
              private sharedService: SharedService,
              private noteService: NoteService,
              private toastService: ToastrService) {
  }

  ngOnInit() {
    this.currentProjectID = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.sharedService.setworkflowID(this.currentProjectID);

    this.listAllNotes();

    this.currentUserSub = this.sharedService.getCurrentUser().subscribe(user => this.currentUser = user);
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
    note.createdAt = new Date();
    note.lastUpdate = new Date();
    console.log(this.currentUser);
    if (this.currentUser) {
      note.writer = this.currentUser.name;
    }
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
        console.log(error);
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
      /*      $('#newNote').on('blur', () => {
              this.newNote = false;
            });*/
    }, 30);
  }


  confirmNoteDelete(action: boolean) {
    if (!action || !this.toBeDeletedId) {
      return;
    }
    this.noteService.deleteNote(this.toBeDeletedId).subscribe(
      res => {
        if (res.status === '200_OK') {
          this.toastService.success('', 'Successfully deleted');
        } else {
          this.toastService.error('', 'An Error was occurred');
        }
      },
      error => this.toastService.error('', 'An Error was occurred'),
      () => {
        this.notes = this.notes.filter(note => note.id !== this.toBeDeletedId);
        this.filteredNotes = this.filteredNotes.filter(note => note.id !== this.toBeDeletedId);
        $('#deleteNoteModal').modal('hide');

      }
    );
  }

  deleteNote(noteID: number) {
    // soft delete a project
    this.toBeDeletedId = noteID;
    $('#deleteNoteModal').modal('show');
  }

  ngOnDestroy(): void {
    this.currentUserSub.unsubscribe();
  }
}
