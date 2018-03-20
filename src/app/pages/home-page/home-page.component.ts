import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../lib';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  isCollapsed = false;
  admin: any;
  sendProductOrdersNum: number = 0;
  constructor(public config: ConfigService) {

  }

  async ngOnInit() {
    await this.getAdminInfo();
    await this.getSendProductOrdersNum();
  }

  async getAdminInfo() {
    this.admin = await this.config.fruit.getAdminInfo();
    if (!this.admin) {
      this.config.router.navigateByUrl('/admin/login');
    }

  }
  async getSendProductOrdersNum() {
    this.sendProductOrdersNum = await this.config.fruit.getSendProductOrdersNum();
  }

  async logout() {
    // await this.config.fruit.adminLogout();
    this.config.router.navigateByUrl('/admin/login');
    // window.location.reload();
  }
}
