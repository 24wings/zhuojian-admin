import { Component, OnInit, Input, Output, ViewChild } from "@angular/core";
import { FormField, ConfigService } from "../../lib";

enum ViewState {
  List,
  Update,
  Create
}

@Component({
  selector: "app-auto-form",
  templateUrl: "./auto-form.component.html",
  styleUrls: ["./auto-form.component.scss"]
})
export class AutoFormComponent implements OnInit {
  selectedData;
  ViewState = ViewState;
  createVisible: boolean = true;
  updateVisible: boolean = false;
  state: ViewState = ViewState.List;
  // @Output()
  @Input() model: string = "";
  @Input() fields: Field[] = [];
  constructor(public config: ConfigService) {}

  async ngOnInit() {
    // let users = await this.config.db.findAll("shopUserModel", {});
    // console.log(users);
  }
}
