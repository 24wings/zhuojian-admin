import { Component, OnInit, Input } from "@angular/core";
import { BangweiOrderState } from "../../lib";

@Component({
  selector: "app-order-state",
  templateUrl: "./order-state.component.html",
  styleUrls: ["./order-state.component.scss"]
})
export class OrderStateComponent implements OnInit {
  @Input() state: BangweiOrderState;
  BangweiOrderState = BangweiOrderState;
  constructor() {}

  ngOnInit() {}
}
