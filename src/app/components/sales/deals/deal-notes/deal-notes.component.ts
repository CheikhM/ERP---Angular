import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../../../services/shared.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {NoteService} from '../../../../services/note.service';
import {ToastrService} from 'ngx-toastr';
import {Note} from '../../../../models/note.model';
import {AutoUnsubscribe} from '../../../../decorators/autounsubscribe.decorator';

declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-deal-notes',
  templateUrl: './deal-notes.component.html',
  styleUrls: ['./deal-notes.component.css']
})
export class DealNotesComponent implements OnInit, OnDestroy {

  currentDealID: number;
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
    // get the current project id
    this.currentDealID = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    // set the current project id
    this.sharedService.setworkflowID(this.currentDealID);
  }

  ngOnInit() {
    this.sharedService.setCurrentWorkflowPath('/sales/deal/');

    this.currentDealID = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.sharedService.setworkflowID(this.currentDealID);

    this.listAllNotes();

    this.currentUserSub = this.sharedService.getCurrentUser().subscribe(user => this.currentUser = user);
  }

  // get all projects
  listAllNotes() {
    this.noteService.getAllNotes(this.currentDealID, 2).subscribe(
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
    note.type = 2;
    note.createdAt = new Date();
    note.lastUpdate = new Date();
    if (this.currentUser) {
      note.writer = this.currentUser.name;
    }
    note.typeID = this.currentDealID;
    this.noteService.newNote(note).subscribe(
      res => {
        if (res['status'] === '200_OK') {
          this.toastService.success('', 'Successfully added');
          note.id = res['data'].nid;
          //console.log(note.id);
          this.filteredNotes.push(note);
          this.notes = this.filteredNotes.map(item => Object.assign({}, item));
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

  updateNote(note: Note) {
    note.lastUpdate = new Date();
    this.noteService.updateNote(note).subscribe(
      result => {
        if (result['status'] === '200_OK' && result['data'].nid) {
          this.toastService.success('', 'Successfully updated');
          this.notes = this.filteredNotes.map(item => Object.assign({}, item));
        } else {
          this.toastService.error('', 'An error was occurred');
        }
      },
      error => this.toastService.error('', 'An error was occurred'),
      () => {
      }
    );
  }

  sortItems(value) {
    if (value && value === 'CREATED AT') {
      this.filteredNotes = this.filteredNotes.sort((a, b) => {
        return Math.abs(new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      });
    } else if (value === 'UPDATED AT') {
      this.filteredNotes = this.filteredNotes.sort((a, b) => {
        return Math.abs(new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime());
      });
    }
  }

  detectDirection(text: string) {
    const firstLetter = text.charAt(0);
    const arabic = /[\u0600-\u06FF]/;

    return arabic.test(firstLetter);
  }


}
