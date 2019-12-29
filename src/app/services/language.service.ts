export class LanguageService {

  public static currentLanguage: string;

  constructor() {}

  public getLanguage() {
    const lang = localStorage.getItem('lang');
    if (lang) {
      LanguageService.currentLanguage = lang;
    } else {
      localStorage.setItem('lang', 'en');
      LanguageService.currentLanguage = 'en';
    }
  }

  public setLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    this.getLanguage();
  }
}
