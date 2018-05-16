import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ConfigService, RestService, FormField } from "../../lib";
@Component({
  selector: "app-form-update",
  templateUrl: "./form-update.component.html",
  styleUrls: ["./form-update.component.scss"]
})
export class FormUpdateComponent implements OnInit {
  Type = FormField;
  @Input() title: string;
  @Input() selectedData: any = {};
  @Input() model: string;
  @Input() fields: Field[] = [];
  @Output() onUpdated = new EventEmitter();

  constructor(public rest: RestService, public config: ConfigService) {}
  async updateImage(key) {
    let base64 = await this.config.common.selectFile();
    this.selectedData[key] = await this.rest.uploadImage(base64);
  }
  ngOnInit() {
    for (let field of this.fields) {
      if (field.default) {
        this.updateData[field.key] = field.default;
      }
    }
  }

  async updateData() {
    let result = {};

    for (let field of this.fields) {
      if (
        field.type == FormField.Image &&
        typeof this.selectedData[field.key] == "object"
      ) {
        result[field.key] = this.selectedData[field.key]._id;
      } else {
        result[field.key] = this.selectedData[field.key];
      }
    }
    console.log(result);
    await this.rest.updateById(this.model, this.selectedData._id, result);
    this.onUpdated.emit(result);
    this.selectedData = false;
  }
  cancel() {
    this.onUpdated.emit();
    this.selectedData = false;
  }
}
