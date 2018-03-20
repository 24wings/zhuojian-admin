import { Component, OnInit } from "@angular/core";
import { ConfigService } from "../../../lib";
@Component({
  selector: "app-bangwei-h5-page",
  templateUrl: "./bangwei-h5-page.component.html",
  styleUrls: ["./bangwei-h5-page.component.scss"]
})
export class BangweiH5PageComponent implements OnInit {
  submitShops: any[] = [];
  keyword: string;

  modifyModalVisible: boolean = false;
  _allChecked = false;
  _disabledButton = true;
  _checkedNumber = 0;
  _displayData: Array<any> = [];
  _operating = false;

  _indeterminate = false;
  constructor(public config: ConfigService) {}

  async ngOnInit() {
    await this.listSubmitShops();
    console.log(this.submitShops);
  }

  _displayDataChange($event) {
    this._displayData = $event;
  }

  _refreshStatus() {
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = !allChecked && !allUnChecked;
    this._disabledButton = !this.submitShops.some(value => value.checked);
    this._checkedNumber = this.submitShops.filter(
      value => value.checked
    ).length;
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
      this.submitShops.forEach(value => (value.checked = false));
      this._refreshStatus();
      this._operating = false;
    }, 1000);
  }
  async listSubmitShops() {
    this.submitShops = await this.config.api.listSubmitShops();
  }

  passRecord() {}
  failRecord() {}
}
