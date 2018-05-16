import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConfigService, bangweiShopAdminApi } from "../../../lib";

@Component({
  selector: "app-user-manage-page",
  templateUrl: "./user-manage-page.component.html",
  styleUrls: ["./user-manage-page.component.scss"]
})
export class UserManagePageComponent implements OnInit {
  users: BangweiUser[] = [];
  newUser: BangweiUser = {
    openid: "12",
    nickname: "刺月无影"
  };
  selectedUser: BangweiUser;
  keyword: string;
  _operating = false;
  createModalVisible: boolean = false;
  modifyModalVisible: boolean = false;

  constructor(public config: ConfigService, public http: HttpClient) {}

  async ngOnInit() {
    // this.users = await this.config.fruit.listFruitUsers();
    // this.http
    //   .get("http://localhost/listPages")
    //   .subscribe(rtn => console.log(rtn));
    await this.listUsers();
  }
  _allChecked = false;
  _disabledButton = true;
  _checkedNumber = 0;
  _displayData: Array<any> = [];

  _dataSet = [];
  _indeterminate = false;

  _displayDataChange($event) {
    this._displayData = $event;
  }

  _refreshStatus() {
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = !allChecked && !allUnChecked;
    this._disabledButton = !this._dataSet.some(value => value.checked);
    this._checkedNumber = this._dataSet.filter(value => value.checked).length;
  }

  _checkAll(value) {
    if (value) {
      this._displayData.forEach(data => (data.checked = true));
    } else {
      this._displayData.forEach(data => (data.checked = false));
    }
    this._refreshStatus();
  }

  _operateData() {
    this._operating = true;
    setTimeout(_ => {
      this._dataSet.forEach(value => (value.checked = false));
      this._refreshStatus();
      this._operating = false;
    }, 1000);
  }

  isVisible = false;
  showModal = () => {
    this.isVisible = true;
  };

  handleOk = e => {
    console.log("点击了确定");
    this.isVisible = false;
  };

  handleCancel = e => {
    console.log(e);
    this.isVisible = false;
  };
  async listUsers() {
    this.users = await this.config.api.Get(bangweiShopAdminApi.user.list);
  }
  /** 线上禁用 */
  async createUser($event) {
    await this.config.api.Post(bangweiShopAdminApi.user.create, this.newUser);
    await this.listUsers();
  }
  async modifyUser() {
    await this.config.api.Put(
      bangweiShopAdminApi.user.update,
      this.selectedUser
    );
    await this.listUsers();
  }
  async deleteUser(userId) {
    await this.config.api.Delete(bangweiShopAdminApi.user.delete, {
      search: userId
    });
    await this.listUsers();
  }
}
