import {environment} from '../../environments/environment';

export class Connection {
  private static apiProject = environment['api'];

  public static get api(): any {
    return {
      projects: {
        getAll: this.apiProject + 'projects/all',
        getAllInvoices: this.apiProject + 'projects/invoices/all',
        getSingle: this.apiProject + 'projects/project',
        newProject: this.apiProject + 'projects/new',
        updateProject: this.apiProject + 'projects/update',
        delete: this.apiProject + 'projects/delete',
        deleteInvoice: this.apiProject + 'projects/invoices/delete',
        newInvoice: this.apiProject + 'projects/invoices/new',
      },
      notes: {
        getAll: this.apiProject + 'notes/all',
        newNote: this.apiProject + 'notes/new',
        updateNote: this.apiProject + 'notes/update',
        delete: this.apiProject + 'notes/delete'
      },
      auth: {
        login: this.apiProject + 'auth/login'
      },
      users: {
        getAll: this.apiProject + 'users/all',
        getSingle: this.apiProject + 'users/user',
      }
    };
  }
}
