import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  set user(obj: IUser) {
    localStorage.setItem('user', JSON.stringify(obj))
  }
  get user(): IUser | null {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  }

  constructor() {

  }

}
