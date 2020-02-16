export class GlobalHelper {

  static getCurrentModule() {
    const path = window.location.pathname;
    if (path.includes('projects')) {
      return 'project';
    } else if (path.includes('suppliers')) {
      return 'supplier';
    } else if (path.includes('tasks')) {
      return 'task';
    } else if (path.includes('bids')) {
      return 'bid';
    } else if (path.includes('deals')) {
      return 'deal';
    } else if (path.includes('visits')) {
      return 'visit';
    } else if (path.includes('orders')) {
      return 'order';
    } else if (path.includes('warehouse')) {
      return 'warehouse';
    } else if (path.includes('beneficiaries')) {
      return 'beneficiary';
    } else if (path.includes('vouchers')) {
      return 'voucher';
    } else {
      return '';
    }
  }

  static isListingPage() {
    const path = window.location.pathname;

    return path.includes('all');
  }

  static isFilterable() {
    const path = window.location.pathname;
    const notFilterable = (path.includes('vouchers') ||
      path.includes('users') ||
      path.includes('suppliers') ||
      path.includes('visits') ||
      path.includes('beneficiaries'));

    return this.isListingPage() && !notFilterable;
  }

  static getKnownFilterableModules() {
    return 'project, task, bid, deal, warehouse, order';
  }
}
