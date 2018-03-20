import { Component, OnInit } from '@angular/core';
import { ConfigService, FruitOrderState } from '../../../lib';
@Component({
  selector: 'app-store-manage-page',
  templateUrl: './store-manage-page.component.html',
  styleUrls: ['./store-manage-page.component.scss']
})
export class StoreManagePageComponent implements OnInit {
  records: any[] = [];
  FruitOrderState = FruitOrderState;
  pageSize: number = 10;
  pageIndex: number = 1;
  selectedOrderState: FruitOrderState;
  constructor(private config: ConfigService) { }


  refershTodayOrders() {
    this.listTodayOrders();
  }
  ngOnChanges(prop) {
    console.log(prop)
  }

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

  _refreshStatus(event?) {
    console.log(event, this.pageIndex);
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

  async ngOnInit() {
    await this.listTodayOrders();
  }
  async  listTodayOrders() {
    this.records = [
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },
      { createDt: new Date(), product: { name: '黄金梨,苹果' }, price: 29.6, state: '可用', waste: 300, },



    ];
    this.everyOrder();
  }
  everyOrder() {
    this.records.forEach(order => this._dataSet.push(order));
    this._dataSet = this.records;
  }
}
