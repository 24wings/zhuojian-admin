import { Component, OnInit } from "@angular/core";
import { ConfigService } from "../../../lib";
@Component({
  selector: "app-fenxiao-user-manage-page",
  templateUrl: "./fenxiao-user-manage-page.component.html",
  styleUrls: ["./fenxiao-user-manage-page.component.scss"]
})
export class FenxiaoUserManagePageComponent implements OnInit {
  manageParentVisible = true;
  selectedFenxaioUser: FenxiaoUser;
  allFenxiaoUsers: any[] = [];
  // createModalVisible: boolean = false;
  fenxiaoUsers: FenxiaoUser[] = [];
  _operating: boolean = false;
  modifyModalVisible: boolean = false;
  _allChecked = false;
  _disabledButton = true;
  _checkedNumber = 0;
  _displayData: Array<any> = [];
  _indeterminate = false;
  allUsers: FenxiaoUser[] = [];

  async listFenxiaoUsers() {
    this.fenxiaoUsers = await this.config.fenxiaoAdmin.listFenxiaoUsers();
    console.log(this.fenxiaoUsers);
  }

  constructor(public config: ConfigService) {}

  _displayDataChange($event) {
    this._displayData = $event;
  }
  _checkAll(value) {
    if (value) {
      this._displayData.forEach(data => (data.checked = true));
    } else {
      this._displayData.forEach(data => (data.checked = false));
    }
    this._refreshStatus();
  }
  _refreshStatus() {
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = !allChecked && !allUnChecked;
    this._disabledButton = !this.fenxiaoUsers.some(value => value.checked);
    this._checkedNumber = this.fenxiaoUsers.filter(
      value => value.checked
    ).length;
  }
  modifyUser($event) {}
  async ngOnInit() {
    this.allFenxiaoUsers = await this.config.fenxiaoAdmin.listFenxiaoUsers();
    this.listFenxiaoUsers();
  }
  async chooseParent(parentId: string) {
    await this.config.fenxiaoAdmin.chooseParent(
      this.selectedFenxaioUser._id,
      parentId
    );
  }
  deleteFenxiaoUser() {}
}
