import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  store(key: string, obj: any) {
    localStorage[key] = JSON.stringify(obj);
  }

  load(key: string) {
    var str = localStorage[key] || 'null';
    return JSON.parse(str);
  }
  // added for logging out
  remove(key: string) {
    localStorage.removeItem(key);
  }

}
