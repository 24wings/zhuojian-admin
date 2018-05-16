import { Component, OnInit } from "@angular/core";
import {
  ConfigService,
  FruitOrderState,
  FenxiaoAdminService,
  BangweiOrderState
} from "../../../lib";
@Component({
  selector: "app-order-detail-page",
  templateUrl: "./order-detail-page.component.html",
  styleUrls: ["./order-detail-page.component.scss"]
})
export class OrderDetailPageComponent implements OnInit {
  BangweiOrderState = BangweiOrderState;
  orderId: string;
  order: any;
  bills: any[] = [];
  // orderState: number;
  constructor(public config: ConfigService, public admin: FenxiaoAdminService) {
    this.orderId = this.config.route.snapshot.queryParams.orderId;
    // this.orderState = this.config.route.snapshot.queryParams.orderState;
  }

  async getOrderInfo() {
    let result = await this.admin.getOrderInfo(this.orderId);
    if (result) {
      this.order = result.order;
      this.bills = result.bills;
    }
  }

  ngOnInit() {
    this.getOrderInfo();
  }
}

interface IAppSetting {
  sidebarCollpsed: boolean;
}

// 1. Action        toogleSidebar
//2 . Reducer      return [ state[0], true ]
// 3.  Effect        对应的 service层 的业务
