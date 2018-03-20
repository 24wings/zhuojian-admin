import { Component, OnInit } from "@angular/core";
import { ConfigService } from "../../../lib";

let bangweiShopAdminApi = {
  productGroup: {
    list: "/bangwei-shop/admin/list-product-groups",
    create: "/bangwei-shop/admin/create-product-group",
    update: "/bangwei-shop/admin/update-product-group",
    delete: "/bangwei-shop/admin/delete-product-group"
  }
};

@Component({
  selector: "app-product-group-manage-page",
  templateUrl: "./product-group-manage-page.component.html",
  styleUrls: ["./product-group-manage-page.component.scss"]
})
export class ProductGroupManagePageComponent implements OnInit {
  newDiscount: number = 100;
  newGroup: BangweiProductGroup = { image: "", groupName: "", summary: "" };
  selectedGroup: BangweiProductGroup;
  modifyModalVisible: boolean = false;
  modifyDiscountVisible: boolean = false;
  keyword: string;
  name: string;
  images: any[] = [];
  comment: string;
  showRecommand: boolean = true;
  switchValue: boolean = true;
  isVisible = false;

  showModal = () => {
    this.isVisible = true;
  };

  handleOk = e => {
    console.log("点击了确定");
    this.isVisible = false;
  };

  handleCancel = e => {
    console.log(e);
    this.isVisible = false;
  };
  constructor(public config: ConfigService) {}

  async selectFile() {
    let base64 = await this.config.common.selectFile();
    this.newGroup.image = base64;
  }
  groups: BangweiProductGroup[] = [];
  _allChecked = false;
  _disabledButton = true;
  _checkedNumber = 0;
  _displayData: Array<any> = [];
  _operating = false;

  _indeterminate = false;

  _displayDataChange($event) {
    this._displayData = $event;
  }

  _refreshStatus() {
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = !allChecked && !allUnChecked;
    this._disabledButton = !this.groups.some(value => value.checked);
    this._checkedNumber = this.groups.filter(value => value.checked).length;
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
      this.groups.forEach(value => (value.checked = false));
      this._refreshStatus();
      this._operating = false;
    }, 1000);
  }

  ngOnInit() {
    this.listGroup();
  }

  async listGroup() {
    this.groups = await this.config.api.Get(
      bangweiShopAdminApi.productGroup.list
    );
  }
  async createGroup() {
    let createResult = await this.config.api.Post(
      bangweiShopAdminApi.productGroup.create,
      this.newGroup
    );
    await this.listGroup();
  }
  async deleteGroups() {
    let deleteGroupIds = this.groups
      .filter(group => group.checked)
      .map(group => group._id);
    for (let _id of deleteGroupIds) {
      await this.config.api.Delete(bangweiShopAdminApi.productGroup.delete, {
        search: { _id }
      });
    }
    await this.listGroup();
  }
  async modifyGroup() {
    let updateAction = await this.config.api.Put(
      bangweiShopAdminApi.productGroup.update +
        "?_id=" +
        this.selectedGroup._id,
      this.selectedGroup
    );
    await this.listGroup();
  }
  async modifyFile() {
    let base64 = await this.config.common.selectFile();
    this.selectedGroup.image = base64;
  }
}
