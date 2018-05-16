import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FenxiaoAdminService } from "../../../lib";
@Component({
  selector: "app-user-detail-page",
  templateUrl: "./user-detail-page.component.html",
  styleUrls: ["./user-detail-page.component.scss"]
})
export class UserDetailPageComponent implements OnInit {
  orderId: string = "";
  order: any;
  now = new Date();
  data = [
    {
      key: "1",
      name: "黄金梨",
      price: 22,
      num: 3
    },
    {
      key: "2",
      name: "火龙果",
      price: 42,
      num: 4
    },
    {
      key: "3",
      name: "爱心果",
      price: 32,
      num: 4
    }
  ];
  ngOnInit() {}
  constructor(public admin: FenxiaoAdminService, public route: ActivatedRoute) {
    this.orderId = this.route.snapshot.queryParams.orderId;
  }
}
