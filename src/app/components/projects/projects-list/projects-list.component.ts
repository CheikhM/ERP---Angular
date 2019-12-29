import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../services/project.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  projects: any;
  metaDefinition = [
    {text: 'Name', attribute: 'name'},
    {text: 'Start Date', attribute: 'startDate'},
    {text: 'End Date', attribute: 'endDate'},
    {text: 'Status', attribute: 'status'},
  ];

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    this.getAllProjects();
  }

  // get all projects
  getAllProjects() {
    this.projectService.getAllProjects().subscribe(
      resp => this.projects = resp,
      error => console.log(error),
      () => {
      }
    );
  }

  // edit a project with the id
  editProject(projectID) {
    console.log(projectID);
  }
}
