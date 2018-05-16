import { Component, OnInit } from "@angular/core";
import {
  CommonService,
  ConfigService,
  FenxiaoAdminService,
  SubmitShopState
} from "../../../lib";
enum RecordState {
  Wait = 1,
  Pass,
  Fail,
  All
}

@Component({
  selector: "app-submit-shop-pages",
  templateUrl: "./submit-shop-pages.component.html",
  styleUrls: ["./submit-shop-pages.component.scss"]
})
export class SubmitShopPagesComponent implements OnInit {
  RecordState = RecordState;
  showState: RecordState = RecordState.All;
  submitShops: any[] = [];
  selectedFenxaioUser: FenxiaoUser;
  createModalVisible: boolean = false;
  fenxiaoUsers: FenxiaoUser[] = [];
  _operating: boolean = false;
  modifyModalVisible: boolean = false;
  _allChecked = false;
  _disabledButton = true;
  _checkedNumber = 0;
  _displayData: Array<any> = [];
  _indeterminate = false;
  selectedLocation;
  isVisible = false;

  showModal = () => {
    this.isVisible = true;
  };
  handleCancel() {
    this.isVisible = false;
  }
  handleOk() {
    this.isVisible = true;
  }

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
  constructor(public fxAdmin: FenxiaoAdminService) {}

  async ngOnInit() {
    this.listAllSubmitShops();
  }

  async listAllSubmitShops() {
    this.submitShops = await this.fxAdmin.listFenxiaoSubmitShops();
    console.log(this.submitShops);
  }
  async listWaitSubmitShops() {
    this.submitShops = await this.fxAdmin.listFenxiaoSubmitShops(
      SubmitShopState.Wait
    );
  }
  async listPassSubmitShops() {
    this.submitShops = await this.fxAdmin.listFenxiaoSubmitShops(
      SubmitShopState.Pass
    );
  }
  async listFailSubmitShops() {
    this.submitShops = await this.fxAdmin.listFenxiaoSubmitShops(
      SubmitShopState.Fail
    );
  }
  async passSubmitShop(shop) {
    await this.fxAdmin.passFenxiaoSubmitShop(shop._id);
    await this.listPassSubmitShops();
    this.showState = RecordState.All;
  }
  async failSubmitShop(shop) {
    await this.fxAdmin.failFenxiaoSubmitShop(shop._id);
    await this.listFailSubmitShops();
    this.showState = RecordState.Fail;
  }
  deleteSubmitShops() {}
}
