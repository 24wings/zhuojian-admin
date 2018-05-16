import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormField, ConfigService, DbService, RestService } from "../../lib";
@Component({
  selector: "app-form-create",
  templateUrl: "./form-create.component.html",
  styleUrls: ["./form-create.component.scss"]
})
export class FormCreateComponent implements OnInit {
  @Output() onCreated = new EventEmitter();
  @Input() visible: boolean;
  @Input() title: string = "创建";
  newData: any = {};
  @Input() fields: Field[] = [];
  @Input() model: string;
  Type = FormField;
  show() {
    this.visible = true;
  }
  hide() {
    this.visible = false;
  }
  async selectImage(key: string) {
    let base64 = await this.config.common.selectFile();
    if (base64) {
      let cloudinaryImage = await this.rest.uploadImage(base64);
      this.newData[key] = cloudinaryImage;
    }
  }
  async createData() {
    // this.createData()
    // console.log(this.newData);
    let result = {};

    for (let field of this.fields) {
      if (field.type == FormField.Image && this.newData[field.key]) {
        result[field.key] = this.newData[field.key]._id;
      } else {
        result[field.key] = this.newData[field.key];
      }
    }
    console.log(result);

    let rtn = await this.rest.createOne(this.model, result);
    this.onCreated.emit(rtn);
    this.hide();
  }
  constructor(
    public config: ConfigService,
    public db: DbService,
    public rest: RestService
  ) {}

  ngOnInit() {
    for (let field of this.fields) {
      if (field.default) {
        this.newData[field.key] = field.default;
      }
    }
  }
}
