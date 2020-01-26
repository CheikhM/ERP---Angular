export class DateHelper {

  static getDateTime(date: Date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }
}
