import { Component, OnInit } from "@angular/core";
import { ApiService, ConfigService, ActionState } from "../../lib";
enum ShowState {
  Pass = 1,
  Fail
}
@Component({
  selector: "app-submit-shop-history-page",
  templateUrl: "./submit-shop-history-page.component.html",
  styleUrls: ["./submit-shop-history-page.component.scss"]
})
export class SubmitShopHistoryPageComponent implements OnInit {
  state: ShowState = ShowState.Pass;
  ShowState = ShowState;
  users: BangweiUser[] = [];
  submitShopActions: any[] = [];
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
  constructor(public config: ConfigService) {}
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

  ngOnInit() {
    this.listSuccessActionRecords();
  }
  async listSuccessActionRecords() {
    this.actions = await this.config.fenxiaoAdmin.listSubmitSuccessActions();
  }
  async listFailActionRecords() {
    this.actions = await this.config.fenxiaoAdmin.listSubmitFailActions();
  }
  listActions() {
    if (this.state == ShowState.Pass) {
      this.listSuccessActionRecords();
    } else {
      this.listFailActionRecords();
    }
  }
}
