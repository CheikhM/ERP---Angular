import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {SharedService} from '../../../services/shared.service';
import {Subscription} from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  projects: any; // original data
  filteredProjects: any; // copy of original data
  metaDefinition = [
    {text: 'Name', attribute: 'name'},
    {text: 'Start Date', attribute: 'startDate'},
    {text: 'End Date', attribute: 'endDate'},
    {text: 'Status', attribute: 'status'},
  ];
  searchText: string;
  private searchTextSub: Subscription;
  private toBeDeletedId: number;

  constructor(private projectService: ProjectService,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.getAllProjects();

    // search project
    this.searchTextSub = this.sharedService.getSearchText().subscribe(item => {
      this.searchProject(item);
    });
  }

  // get all projects
  getAllProjects() {
    this.projectService.getAllProjects().subscribe(
      resp => {
        this.projects = resp;
        this.filteredProjects = resp;
      },
      error => console.log(error),
      () => {
      }
    );
  }

  // edit a project with
  editProject(projectID) {
    console.log('edit', projectID);
  }

  // soft delete a project
  deleteProject(projectId) {
    this.toBeDeletedId = projectId;
    $('#deleteProjectModal').modal('show');
  }

  ngOnDestroy(): void {
    this.searchTextSub.unsubscribe();
  }

  // search project by name
  private searchProject(text: string) {
    if (this.projects) {
      this.filteredProjects = this.projects.filter(project => project.name.includes(text));
    }
  }

  confirmProjectDelete(action: boolean) {
    if (action && this.toBeDeletedId) {

      this.projectService.deleteProject(this.toBeDeletedId).subscribe(result => {
        // todo check for delete error
        console.log(result.status);
      }, error => {
        console.log('error: ', error);
      }, () => {
        this.projects = this.projects.filter(project => project.id !== this.toBeDeletedId);
        this.filteredProjects = this.projects;
      });

      $('#deleteProjectModal').modal('hide');
    }
  }
}
