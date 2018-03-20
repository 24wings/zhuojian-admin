import { Component, OnInit } from '@angular/core';
import { ConfigService, FruitOrderState } from '../../../lib';
@Component({
  selector: 'app-old-order-page',
  templateUrl: './old-order-page.component.html',
  styleUrls: ['./old-order-page.component.scss']
})
export class OldOrderPageComponent implements OnInit {
  showGroup: boolean = true;
  pageIndex: number = 1;
  FruitOrderState = FruitOrderState;
  orders: FruitOrder[] = [];
  keyword: string;
  _operating: boolean = false;
  allChecked = false;
  indeterminate = true;
  dateRange = [new Date(), new Date()];
  checkOptionsOne = [
    { label: '未确认', value: 'Apple', checked: true },
    { label: '待发货', value: 'Pear', checked: false },
    { label: '待收货', value: 'Orange', checked: false },
    { label: '已完结', value: '', checked: true },
    { label: '待评价', value: '', checked: true }
  ];
  constructor(public config: ConfigService) { }
  updateAllChecked() {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptionsOne.forEach(item => item.checked = true);
    } else {
      this.checkOptionsOne.forEach(item => item.checked = false);
    }
  }
  updateSingleChecked() {
    if (this.checkOptionsOne.every(item => item.checked === false)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.checkOptionsOne.every(item => item.checked === true)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }
  ngOnInit() {
    this.orders = this.config.fruit.getUserOrder();
    this._dataSet = this.orders;
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
    this._indeterminate = (!allChecked) && (!allUnChecked);
    this._disabledButton = !this._dataSet.some(value => value.checked);
    this._checkedNumber = this._dataSet.filter(value => value.checked).length;
  }

  _checkAll(value) {
    if (value) {
      this._displayData.forEach(data => data.checked = true);
    } else {
      this._displayData.forEach(data => data.checked = false);
    }
    this._refreshStatus();
  }

  _operateData() {
    this._operating = true;
    setTimeout(_ => {
      this._dataSet.forEach(value => value.checked = false);
      this._refreshStatus();
      this._operating = false;
    }, 1000);
  }
}
