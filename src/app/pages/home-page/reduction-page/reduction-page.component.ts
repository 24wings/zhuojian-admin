import { Component, OnInit } from "@angular/core";
import { ConfigService, bangweiShopAdminApi } from "../../../lib";

@Component({
  selector: "app-reduction-page",
  templateUrl: "./reduction-page.component.html",
  styleUrls: ["./reduction-page.component.scss"]
})
export class ReductionPageComponent implements OnInit {
  createModalVisible: boolean = false;
  modifyModalVisible: boolean = false;
  newReduction: Reduction = {
    title: "默认优惠标题",
    value: 800,
    everyUser: false
  };
  selectedReduction: Reduction;
  reductions: Reduction[];
  _indeterminate: boolean = false;
  _disabledButton = true;
  _checkedNumber = 0;
  _displayData: Array<any> = [];
  _operating = false;
  _allChecked = false;
  constructor(public config: ConfigService) {}

  ngOnInit() {
    this.listReductions();
  }
  async listReductions() {
    this.reductions = await this.config.api.Get(
      bangweiShopAdminApi.reduction.list
    );
  }

  async createReduction() {
    await this.config.api.Post(
      bangweiShopAdminApi.reduction.create,
      this.newReduction
    );
    await this.listReductions();
  }
  async deleteReductions() {
    let deleteIds = this.reductions
      .filter(reduction => reduction.checked)
      .map(reduction => reduction._id);
    for (let reductionId of deleteIds) {
      await this.config.api.Delete(bangweiShopAdminApi.reduction.delete, {
        search: { reductionId }
      });
    }
    await this.listReductions();
  }

  _displayDataChange($event) {
    this._displayData = $event;
  }

  _refreshStatus() {
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = !allChecked && !allUnChecked;
    this._disabledButton = !this.reductions.some(value => value.checked);
    this._checkedNumber = this.reductions.filter(value => value.checked).length;
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
      this.reductions.forEach(value => (value.checked = false));
      this._refreshStatus();
      this._operating = false;
    }, 1000);
  }
  async modifyReduction() {
    await this.config.api.Put(
      bangweiShopAdminApi.reduction.update,
      this.selectedReduction,
      { search: { reductionId: this.selectedReduction._id } }
    );
    await this.listReductions();
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
    await this.listReductions();
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
    await this.listReductions();
  }
}
