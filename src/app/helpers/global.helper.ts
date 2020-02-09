export class GlobalHelper {

  static getCurrentModule() {
    const path = window.location.pathname;
    if (path.includes('projects')) {
      return 'project';
    }
  }

  static isListingPage() {
    const path = window.location.pathname;
    if (path.includes('all')) {
      return true;
    }
    return false;
  }
}
