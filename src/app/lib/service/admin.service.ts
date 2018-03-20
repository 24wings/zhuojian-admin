import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, } from './api.service';
@Injectable()
export class AdminService {
  /**API */
  signupApi = '/admin.signup.post';
  signinApi = '/admin.signin.post';



  async signin(loginAdmin: Admin) {
    let admin = await this.api.Post(this.signinApi, loginAdmin);
    if (!!admin) {
      this.storageAdmin(admin);
      return true;
    } else {
      return false;
    }
  }
  async signup(newAdmin: Admin) {
    let admin = await this.api.Post(this.signupApi, newAdmin);
    if (!!admin) {
      this.storageAdmin(admin);
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.clear();
    return this.router.navigateByUrl('/admin/signin');
  }
  goAdminHome() {
    return this.router.navigateByUrl('/admin');
  }
  get admin() {
    return JSON.parse(localStorage.getItem('admin'));
  }
  storageAdmin(admin: Admin) {
    localStorage.setItem('admin', JSON.stringify(admin));
  }
  constructor(private api: ApiService, public router: Router) { }

}
