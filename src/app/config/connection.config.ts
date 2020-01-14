import {environment} from '../../environments/environment';

export class Connection {
  private static apiProject = environment['api'];

  public static get api(): any {
    return {
      projects: {
        getAll: this.apiProject + 'projects/all',
        getSingle: this.apiProject + 'projects/project',
        newProject: this.apiProject + 'projects/new',
        updateProject: this.apiProject + 'projects/update',
        delete: this.apiProject + 'projects/delete'
      },
      notes: {
        getAll: this.apiProject + 'notes/all',
        newNote: this.apiProject + 'notes/new',
        delete: this.apiProject + 'notes/delete'
      },
      auth: {
        login: this.apiProject + 'auth/login'
      }
    };
  }
}
