import { Component, OnInit } from "@angular/core";
import { FenxiaoAdminService, ActionState, ConfigService } from "../../../lib";

enum ShowState {
  WaitVerifyUser = 1, // 待审核用户

  PassVerifyUser // 初审用户
}
export enum FenxiaoUserState {
  WatingVerify = 1, // 待审核
  VerifyPass, // 审核通过
  FullMember // 正式会员
}

@Component({
  selector: "app-verify-fxuser-page",
  templateUrl: "./verify-fxuser-page.component.html",
  styleUrls: ["./verify-fxuser-page.component.scss"]
})
export class VerifyFxuserPageComponent implements OnInit {
  FenxiaoUserState = FenxiaoUserState;
  state: ShowState = ShowState.WaitVerifyUser;
  ShowState = ShowState;
  // users: BangweiUser[] = [];
  submitShopActions: any[] = [];
  users: FenxiaoUser[] = [];

  newUser: BangweiUser = {
    openid: "12",
    nickname: "刺月无影"
  };
  selectedUser: BangweiUser;
  keyword: string;
  _operating = false;
  createModalVisible: boolean = false;
  modifyModalVisible: boolean = false;
  _allChecked = false;
  _disabledButton = true;
  _checkedNumber = 0;
  _displayData: Array<any> = [];
  _dataSet = [];
  _indeterminate = false;
  actions: {
    checked?: boolean;
    title: string;
    actionType: ActionState;
    createDt: Date;
  }[] = [];
  constructor(
    public config: ConfigService,
    public adminService: FenxiaoAdminService
  ) {}
  _displayDataChange($event) {
    this._displayData = $event;
  }
  async FullMember(fxUser: FenxiaoUser) {
    await this.adminService.fullMemberFxUser(fxUser._id);
    await this.refersh();
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

  ngOnInit() {
    this.listWaitVerifyUsers();
  }
  refersh() {
    if (this.state == ShowState.WaitVerifyUser) {
      this.listWaitVerifyUsers();
    } else {
      this.listPassVerifyUser();
    }
  }
  async listWaitVerifyUsers() {
    this.users = await this.config.fenxiaoAdmin.listFenxiaoUsers(
      FenxiaoUserState.WatingVerify
    );
  }
  async listPassVerifyUser() {
    this.users = await this.config.fenxiaoAdmin.listFenxiaoUsers(
      FenxiaoUserState.VerifyPass
    );
  }
  async confirmWaitVerify(fxuser: FenxiaoUser) {
    await this.adminService.confirmVerifyUser(fxuser._id);
    await this.refersh();
  }
}
