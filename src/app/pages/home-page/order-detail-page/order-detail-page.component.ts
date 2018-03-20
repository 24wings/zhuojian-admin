import { Component, OnInit } from '@angular/core';
import { ConfigService, FruitOrderState } from '../../../lib';
@Component({
  selector: 'app-order-detail-page',
  templateUrl: './order-detail-page.component.html',
  styleUrls: ['./order-detail-page.component.scss']
})
export class OrderDetailPageComponent implements OnInit {
  FruitOrderState = FruitOrderState;
  orderId
  orderState: number;
  constructor(public config: ConfigService) {
    // this.orderId = this.config.route.snapshot.queryParams.orderId
    this.orderState = this.config.route.snapshot.queryParams.orderState
  }

  ngOnInit() {
  }

}



interface IAppSetting {
  sidebarCollpsed: boolean;
}

// 1. Action        toogleSidebar
//2 . Reducer      return [ state[0], true ]
// 3.  Effect        对应的 service层 的业务