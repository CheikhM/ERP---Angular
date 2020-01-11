import {environment} from '../../environments/environment';

export class Connection {
  private static apiProject = environment['api'];

  public static get api(): any {
    return {
      projects: {
        getAll: this.apiProject + 'projects/all',
        getSingle: this.apiProject + 'projects/project',
        newProject: this.apiProject + 'projects/new'
      },
      delete: {
        get: this.apiProject + 'projects/delete'
      },
      auth: {
        login: this.apiProject + 'auth/login'
      }
    };
  }
}
