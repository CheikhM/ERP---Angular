import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-project-notes',
  templateUrl: './project-notes.component.html',
  styleUrls: ['./project-notes.component.css']
})
export class ProjectNotesComponent implements OnInit {
  currentProjectID: number;
  newNoteText = '';

  constructor(private route: ActivatedRoute,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.currentProjectID = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.sharedService.setworkflowID(this.currentProjectID);

  }

}
