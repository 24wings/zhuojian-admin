import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unconfirm-order',
  templateUrl: './unconfirm-order.component.html',
  styleUrls: ['./unconfirm-order.component.scss']
})
export class UnconfirmOrderComponent implements OnInit {

  data: any[] = [
    { _id: 'dasdasd213123', product: { name: '黄金梨', _id: '1312d213' }, state: '未确认', price: 4, num: 10, money: 40.00 }
  ];
  now = new Date();
  constructor() { }

  ngOnInit() {
  }

  orderRecords: any[] = [
    { createDt: new Date(), state: '未确认', stage: '进行中', actioner: '刺月无影', spenTime: 0 }
  ];

}
