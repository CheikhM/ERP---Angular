import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {SharedService} from '../../../services/shared.service';
import {Subscription} from 'rxjs';
import {Project} from '../../../models/project.model';
import {ToastrService} from 'ngx-toastr';
import {AutoUnsubscribe} from '../../../decorators/autounsubscribe.decorator';
import {AuthHelper} from '../../../helpers/auth.helper';
import {LocalStorageHelper} from '../../../helpers/local-storage.helper';
import {GlobalHelper} from '../../../helpers/global.helper';

declare var $: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  projects: any; // original data
  filteredProjects: any; // copy of original data
  metaDefinition = [
    {text: 'Name', attribute: 'name', type: 'PLString'},
    {text: 'Start Date', attribute: 'startDate', type: 'date'},
    {text: 'End Date', attribute: 'endDate', type: 'date'},
    {text: 'Status', attribute: 'status', type: 'string'},
  ];
  private searchTextSub: Subscription;
  private toBeDeletedId: number;
  manageAction = 'Add Project';
  projectTobeManaged: Project;
  newUpdateSub: Subscription;

  constructor(private projectService: ProjectService,
              private sharedService: SharedService,
              private toastrService: ToastrService) {
    AuthHelper.isPermitted('PM');
  }

  ngOnInit() {
    this.sharedService.setCurrentWorkflowPath('/projects/project/');
    this.getAllProjects();

    // search project
    this.sharedService.getSearchText().subscribe(item => {
      if (item) {
        this.searchProject(item.toLocaleLowerCase());
      }
    });

    // check for new update
    this.newUpdateSub = this.sharedService.getNewUpdate().subscribe(update => {
      if (update) {
        this.getAllProjects();
      }
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
          // console.log(this.projects);
        }
    );
  }

  // edit a project with
  editProject(projectID) {

    this.manageAction = 'Edit Project';
    this.projectTobeManaged = this.projects.find(item => item.id === projectID);

    $('#newProject').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  // soft delete a project
  deleteProject(projectId) {
    this.toBeDeletedId = projectId;
    $('#deleteProjectModal').modal('show');
  }

  // search project by name
  private searchProject(text: string) {
    if (this.projects) {

      const currentModule = GlobalHelper.getCurrentModule();
      const filters = LocalStorageHelper.getModuleFilters(currentModule);

      this.filteredProjects = this.projects.filter(project =>
        (filters.status === '*' ||
          project.status === filters.status) && (
        project.name.toLowerCase().includes(text) ||
        project.code.toLowerCase().includes(text) ||
        project.link.toLowerCase().includes(text))
      );
    }
  }

  confirmProjectDelete(action: boolean) {
    if (action && this.toBeDeletedId) {

      this.projectService.deleteProject(this.toBeDeletedId).subscribe(result => {
        if (result.status === '200_OK') {
          this.toastrService.success('', 'Successfully deleted');
        } else {
          this.toastrService.error('', 'An Error was occurred');
        }
      }, error => {
        this.toastrService.error('', 'An Error was occurred');
      }, () => {
        this.projects = this.projects.filter(project => project.id !== this.toBeDeletedId);
        this.filteredProjects = this.projects;
      });

      $('#deleteProjectModal').modal('hide');
    }
  }

  initManageData() {
    this.manageAction = 'Add Project';
    this.projectTobeManaged = Project.getEmptyProject();
  }

  ngOnDestroy(): void {
  }
}
