import * as CryptoJS from 'crypto-js';

export const CRYPT_KEY = 'jhjH$8888&&fffj1@#@10';

export class LocalStorageHelper {

  public static setItem(key: string, text: any): void {
    try {
      text = JSON.stringify(text);
      text = CryptoJS.AES.encrypt(text, CRYPT_KEY).toString();
      localStorage.setItem(key, text);
    } catch (error) {
      localStorage.setItem(key, null);
    }
  }

  public static getItem(key: string): any {
    let text;
    try {
      text = localStorage.getItem(key);
      text = CryptoJS.AES.decrypt(text, CRYPT_KEY).toString(CryptoJS.enc.Utf8);
      text = JSON.parse(text);
    } catch (error) {
      text = null;
    }
    return text;
  }

  public static clear() {
    localStorage.clear();
  }

  public static removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
