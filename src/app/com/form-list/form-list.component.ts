import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  ConfigService,
  RestService,
  bangweiShopAdminApi,
  FormField
} from "../../lib";
@Component({
  selector: "app-form-list",
  templateUrl: "./form-list.component.html",
  styleUrls: ["./form-list.component.scss"]
})
export class FormListComponent implements OnInit {
  data: any[] = [];
  @Input() model: string;
  Type = FormField;
  @Input() fields: Field[] = [];
  @Output() onEdit = new EventEmitter();
  selectedData: any;
  _indeterminate: boolean = false;
  _disabledButton = true;
  _checkedNumber = 0;
  _displayData: Array<any> = [];
  _operating = false;
  _allChecked = false;
  newData: any = {};
  ngOnInit() {
    this.listData();
  }
  deleteDatas() {}
  toFormGroup(): FormGroup {
    let group: any = {};
    this.fields.forEach(field => {
      group[field.key] = field.required
        ? new FormControl(field.value || "", Validators.required)
        : new FormControl(field.value || "");
    });
    return new FormGroup(group);
  }
  async listData() {
    this.data = await this.rest.findAll(this.model, {}, { populate: "icon" });
    console.log(this.data);
  }

  async createReduction($event) {
    await this.config.api.Post(
      bangweiShopAdminApi.reduction.create,
      this.newData
    );
    await this.listData();
  }
  async deleteReductions() {
    let deleteIds = this.data
      .filter(reduction => reduction.checked)
      .map(reduction => reduction._id);
    for (let reductionId of deleteIds) {
      await this.config.api.Delete(bangweiShopAdminApi.reduction.delete, {
        search: { reductionId }
      });
    }
    await this.listData();
  }

  _displayDataChange($event) {
    this._displayData = $event;
  }

  _refreshStatus() {
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = !allChecked && !allUnChecked;
    this._disabledButton = !this.data.some(value => value.checked);
    this._checkedNumber = this.data.filter(value => value.checked).length;
  }

  _checkAll(value) {
    if (value) {
      this._displayData.forEach(data => (data.checked = true));
    } else {
      this._displayData.forEach(data => (data.checked = false));
    }
    this._refreshStatus();
  }

  _operateData() {
    this._operating = true;
    setTimeout(_ => {
      this.data.forEach(value => (value.checked = false));
      this._refreshStatus();
      this._operating = false;
    }, 1000);
  }
  async modifyReduction() {
    await this.config.api.Put(
      bangweiShopAdminApi.reduction.update,
      this.selectedData,
      { search: { reductionId: this.selectedData._id } }
    );
    await this.listData();
  }
  async unactiveReduction(reductionId) {
    await this.config.api.Put(
      bangweiShopAdminApi.reduction.update,
      {
        active: false
      },
      {
        search: { reductionId }
      }
    );
    await this.listData();
  }
  async activeReduction(reductionId) {
    await this.config.api.Put(
      bangweiShopAdminApi.reduction.update,
      {
        active: true
      },
      {
        search: { reductionId }
      }
    );
    await this.listData();
  }
  async selectImage() {
    this.newData.icon = await this.config.common.selectFile();
  }

  async updateImage() {
    this.selectedData.icon = await this.config.common.selectFile();
  }
  async removeById(_id) {
    await this.rest.removeById(this.model, _id);
    await this.listData();
  }

  edit(data) {
    this.onEdit.emit(data);
  }
  async deleteSelected() {
    this.rest.removeByIds(
      this.model,
      this.data.filter(item => item.checked).map(item => item._id)
    );
    await this.listData();
  }

  constructor(public config: ConfigService, public rest: RestService) {}
}
