import { Component, OnInit } from "@angular/core";

import { ConfigService, bangweiShopAdminApi } from "../../../lib";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: "app-product-manage-page",
  templateUrl: "./product-manage-page.component.html",
  styleUrls: ["./product-manage-page.component.scss"]
})
export class ProductManagePageComponent implements OnInit {
  keyword: string;
  showRecommand: boolean = true;
  constructor(public config: ConfigService, public domSafe: DomSanitizer) {}
  selectedProductGroupId: string;
  products: BangweiProduct[] = [];
  createModalVisible: boolean = false;
  groupOptions: { label: string; value: string }[] = [];
  selectedGroupId: string;
  selectedProduct: BangweiProduct;
  newProduct: BangweiProduct = {
    name: "",
    summary: "",
    price: 1000,
    discount: 100,
    active: true,
    images: [],
    group: "",
    minScore: 0
  };
  modifyModalVisible: boolean = false;
  _allChecked = false;
  _disabledButton = true;
  _checkedNumber = 0;
  _displayData: Array<any> = [];
  _operating = false;

  _indeterminate = false;

  ngOnInit() {
    this.listProducts();
    this.listProductGroups();
  }

  _displayDataChange($event) {
    this._displayData = $event;
  }

  _refreshStatus() {
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = !allChecked && !allUnChecked;
    this._disabledButton = !this.products.some(value => value.checked);
    this._checkedNumber = this.products.filter(value => value.checked).length;
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
      this.products.forEach(value => (value.checked = false));
      this._refreshStatus();
      this._operating = false;
    }, 1000);
  }

  async listProducts() {
    this.products = await this.config.api.Get(
      bangweiShopAdminApi.product.list +
        (this.selectedGroupId ? `?groupId=${this.selectedGroupId}` : "")
    );
  }
  async createProduct($event) {
    this.newProduct.images = (this.newProduct.images as any[])
      .map(image => image.changingThisBreaksApplicationSecurity)
      .filter(image => !!image);
    this.products = await this.config.api.Post(
      bangweiShopAdminApi.product.create,
      this.newProduct
    );
    await this.listProducts();
  }
  async addImages() {
    let base64 = await this.config.common.selectFile();
    let data = this.domSafe.bypassSecurityTrustResourceUrl(base64);
    this.newProduct.images.push(data);
  }
  async listProductGroups() {
    let groups = await this.config.api.Get(
      bangweiShopAdminApi.productGroup.list
    );
    this.groupOptions = groups.map(group => {
      return { label: group.groupName, value: group._id };
    });
  }

  modifySelectFile() {}

  async deleteProducts() {
    let deleteProductIds = this.products
      .filter(product => product.checked)
      .map(product => product._id);
    for (let _id of deleteProductIds) {
      let deleteAction = await this.config.api.Delete(
        bangweiShopAdminApi.product.delete,
        { search: { _id } }
      );
    }
    await this.listProducts();
  }
  async activeProduct(productId: string) {
    await this.config.api.Put(
      bangweiShopAdminApi.product.active + `?productId=${productId}`,
      {}
    );
    await this.listProducts();
  }
  async unactiveProduct(productId: string) {
    await this.config.api.Put(
      bangweiShopAdminApi.product.unactive + `?productId=${productId}`,
      {}
    );
    await this.listProducts();
  }

  async modifyProduct() {
    this.selectedProduct.images = (this.selectedProduct.images as any[])
      .map(image => image.changingThisBreaksApplicationSecurity)
      .filter(image => !!image);
    await this.config.api.Put(
      bangweiShopAdminApi.product.update,
      this.selectedProduct,
      { search: { _id: this.selectedProduct._id } }
    );
    await this.listProducts();
  }
  async modifyProductImages() {
    let base64 = await this.config.common.selectFile();
    let data = this.domSafe.bypassSecurityTrustResourceUrl(base64);
    this.selectedProduct.images.push(data);
  }
}
