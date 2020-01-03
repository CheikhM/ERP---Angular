import {environment} from '../../environments/environment';

export class Connection {
  private static apiProject = environment.api;

  public static get api(): any {
    return {
      projects: {
        get: this.apiProject + 'projects/all'
      },
      delete: {
        get: this.apiProject + 'projects/delete'
      }
    };
  }
}
