import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-product-order',
  templateUrl: './send-product-order.component.html',
  styleUrls: ['./send-product-order.component.scss']
})
export class SendProductOrderComponent implements OnInit {
  current = 2;
  selectedOption: any;
  inputValue: string;
  inputValue2: string;
  date: Date = new Date();
  options: any[] = [
    { value: '申通物流', label: '申通物流' },
    { value: '菜鸟快递', label: '菜鸟快递' },
    { value: '天天快递', label: '天天快递' }
  ]

  data: any[] = [
    { _id: 'dasdasd213123', product: { name: '黄金梨', _id: '1312d213' }, state: '待发货', price: 4, num: 10, money: 40.00 }
  ];
  now = new Date();
  constructor() { }

  ngOnInit() {
  }

  orderRecords: any[] = [
    { createDt: new Date(), state: '未确认', stage: '完成', actioner: '刺月无影', spenTime: 0 },
    { createDt: new Date(), state: '待发货', stage: '进行中', actioner: '刺月无影', spenTime: 0 },

  ];

  isVisible = false;

  showModal = () => {
    this.isVisible = true;
  }

  handleOk = (e) => {
    console.log('点击了确定');
    this.isVisible = false;
  }

  handleCancel = (e) => {
    console.log(e);
    this.isVisible = false;
  }

}
