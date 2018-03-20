import { Component, OnInit, OnChanges } from '@angular/core';
import { FruitOrderState, ConfigService } from '../../../lib';

@Component({
  selector: 'app-today-order-page',
  templateUrl: './today-order-page.component.html',
  styleUrls: ['./today-order-page.component.scss']
})
export class TodayOrderPageComponent implements OnInit, OnChanges {
  todayOrders: any[] = [];
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
    this.todayOrders = await this.config.fruit.getTodayOrders(this.selectedOrderState);
    this.everyOrder();
  }
  everyOrder() {
    this.todayOrders.forEach(order => this._dataSet.push(order));
    this._dataSet = this.todayOrders;
  }
}
