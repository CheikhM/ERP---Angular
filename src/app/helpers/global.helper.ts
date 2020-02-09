export class GlobalHelper {

  static getCurrentModule() {
    const path =  window.location.pathname;
    if (path.includes('projects')) {
      return 'project';
    }
  }
}
