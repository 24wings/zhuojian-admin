import { Component, OnInit } from "@angular/core";
import {
  ConfigService,
  FruitOrderState,
  BangweiOrderState
} from "../../../lib";

@Component({
  selector: "app-user-order-page",
  templateUrl: "./user-order-page.component.html",
  styleUrls: ["./user-order-page.component.scss"]
})
export class UserOrderPageComponent implements OnInit {
  BangweiOrderState = BangweiOrderState;
  selectedOrderState: BangweiOrderState = BangweiOrderState.Unpay;
  // users: FruitUser[] = [];
  keyword: string;
  states: { state: BangweiOrderState; label: string }[] = [
    { state: BangweiOrderState.Unpay, label: "待支付" },
    { state: BangweiOrderState.SendProduct, label: "待发货" },
    { state: BangweiOrderState.WaitReciveProduct, label: "待收货" },
    { state: BangweiOrderState.Finish, label: "已完结" }
  ];
  states2: { state: BangweiOrderState; label: string }[] = [
    { state: BangweiOrderState.Cancel, label: "未支付取消" },
    // { state: BangweiOrderState.WaitProductCancel, label: "待发货取消" },
    // { state: BangweiOrderState.ReciveCancel, label: "待收货取消" },
    { state: BangweiOrderState.Close, label: "申请退款" }
  ];
  orders: BangweiOrder[] = [];
  dateRange: Date[] = [new Date(), new Date()];
  constructor(public config: ConfigService) {}

  _allChecked = false;
  _disabledButton = true;
  _checkedNumber = 0;
  _displayData: Array<any> = [];
  _operating = false;
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
  async refersh(state?) {
    if (!state) state = this.selectedOrderState;
    this.orders = await this.config.fenxiaoAdmin.queryOrder(state);
  }

  async ngOnInit() {
    this.refersh();
  }
}
