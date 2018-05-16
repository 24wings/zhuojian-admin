import { Component, OnInit } from "@angular/core";
import { PcClientService, CommonService } from "../../../lib";
enum ViewState {
  List = 1,
  Modify,
  Create
}
@Component({
  selector: "app-material-page",
  templateUrl: "./material-page.component.html",
  styleUrls: ["./material-page.component.css"]
})
export class MaterialPageComponent implements OnInit {
  state: ViewState = ViewState.List;
  ViewState = ViewState;
  newMaterial: IMaterial = {
    share_image_url: "",
    ticket_image_url: "",
    home_image_url: "",
    can_give_other: false,
    can_share: false,
    reg_give: false
  };
  constructor(public pcClient: PcClientService, public common: CommonService) {}
  materials: IMaterial[] = [];
  selectedMaterial: any;
  async listMaterials() {
    this.materials = await this.pcClient.listMaterials();
  }
  ngOnInit() {
    this.listMaterials();
  }
  async createMaterial() {
    await this.pcClient.createMaterial(this.newMaterial);
    await this.listMaterials();
  }
  async addHomeImageUrl() {
    let url = await this.uploadImage();
    this.newMaterial.home_image_url = url;
  }
  async addTicketImageUrl() {
    let url = await this.uploadImage();
    this.newMaterial.ticket_image_url = url;
  }
  async addShareImageUrl() {
    let share_image_url = await this.uploadImage();
    this.newMaterial.share_image_url = share_image_url;
  }

  async uploadImage() {
    let base64 = await this.common.selectFile();
    let result = await this.common.uploadImage(base64);
    return result.url;
  }
}
