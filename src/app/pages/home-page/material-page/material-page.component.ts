import { Component, OnInit } from "@angular/core";
import { PcClientService, CommonService } from "../../../lib";
@Component({
  selector: "app-material-page",
  templateUrl: "./material-page.component.html",
  styleUrls: ["./material-page.component.css"]
})
export class MaterialPageComponent implements OnInit {
  pageIndex: number = 0;
  pageSize = 10;
  loading: boolean = true;
  total = 1;
  dataSet = [];
  showPublishModal: boolean = false;

  selectedMaterial = {
    home_image_url: "",
    ticket_image_url: "",
    share_image_url: ""
  };
  constructor(public pcClient: PcClientService, public common: CommonService) { }

  async ngOnInit() {
    await this.searchData();
  }

  listMaterials() { }
  async searchData(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }

    let result = await this.pcClient.listCouponAndMaterialByShopId();
    // result.total = result.total;
    this.dataSet = result;
    this.loading = false;
  }
  async modifyHomeImageUrl() {
    let base64 = await this.common.selectFile();
    let result = await this.common.uploadImage(base64);
    this.selectedMaterial.home_image_url = result.url;
  }
  async modifyTicketImageUrl() {
    let base64 = await this.common.selectFile();
    let result = await this.common.uploadImage(base64);
    this.selectedMaterial.ticket_image_url = result.url;
  }
  async modifyShareImageUrl() {
    let base64 = await this.common.selectFile();
    let result = await this.common.uploadImage(base64);
    this.selectedMaterial.share_image_url = result.url;
  }
  async beforeUpload(file: File) {
    return true;
  }

  async handleChange(info: { file: any }, type: 1 | 2 | 3) {
    console.log(info.file);
    if (info.file.status === "uploading") {
      this.loading = true;
    }

    let base64 = await this.common.convertFileToBase64(info.file.originFileObj);
    this.loading = false;
    let result = await this.common.uploadImage(base64);
    switch (type) {
      case 1:
        this.selectedMaterial.home_image_url = result.url;
        break;
      case 2:
        this.selectedMaterial.ticket_image_url = result.url;
        break;
      default:
        this.selectedMaterial.share_image_url = result.url;
        break;
    }
  }

  async createMaterial() {
    console.log(this.selectedMaterial);
    this.loading = true;
    await this.pcClient.createMaterial(this.selectedMaterial);
    await this.listMaterials();
    this.loading = false;
  }
}
