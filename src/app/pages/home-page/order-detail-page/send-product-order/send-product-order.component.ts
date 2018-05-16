import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BangweiOrderState, FenxiaoAdminService } from "../../../../lib";

@Component({
  selector: "app-send-product-order",
  templateUrl: "./send-product-order.component.html",
  styleUrls: ["./send-product-order.component.scss"]
})
export class SendProductOrderComponent implements OnInit {
  BangweiOrderState = BangweiOrderState;

  @Input() order: BangweiOrder;
  @Input() bills: any[];
  @Output() onRefersh = new EventEmitter();
  current = 2;
  selectedOption: any;
  inputValue: string;
  inputValue2: string;
  date: Date = new Date();
  options: any[] = [
    { value: "申通物流", label: "申通物流" },
    { value: "菜鸟快递", label: "菜鸟快递" },
    { value: "天天快递", label: "天天快递" }
  ];
  sendDt: Date = new Date();
  sendComment: string = "";

  now = new Date();
  constructor(public admin: FenxiaoAdminService) {}

  ngOnInit() {}

  orderRecords: any[] = [
    {
      createDt: new Date(),
      state: "未确认",
      stage: "完成",
      actioner: "刺月无影",
      spenTime: 0
    },
    {
      createDt: new Date(),
      state: "待发货",
      stage: "进行中",
      actioner: "刺月无影",
      spenTime: 0
    }
  ];

  isVisible = false;

  showModal = () => {
    this.isVisible = true;
  };

  async handleOk(e) {
    this.admin.sendProduct(this.order._id, {
      transfer: this.selectedOption.value,
      sendComment: this.sendComment,
      sendDt: this.sendDt
    });
    this.isVisible = false;
  }

  handleCancel = e => {
    console.log(e);
    this.isVisible = false;
  };
}
