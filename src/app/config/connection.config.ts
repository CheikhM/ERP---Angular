import {environment} from '../../environments/environment';

export class Connection {
  private static apiProject = environment.api;

  public static get api(): any {
    return {
      projects: {
        getAll: this.apiProject + 'projects/all',
        getSingle: this.apiProject + 'projects/project'
      },
      delete: {
        get: this.apiProject + 'projects/delete'
      }
    };
  }
}
