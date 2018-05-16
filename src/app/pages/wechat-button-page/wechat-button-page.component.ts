import { Component, OnInit } from "@angular/core";
import { FenxiaoAdminService, WechatService } from "../../lib";

@Component({
  selector: "app-wechat-button-page",
  templateUrl: "./wechat-button-page.component.html",
  styleUrls: ["./wechat-button-page.component.scss"]
})
export class WechatButtonPageComponent implements OnInit {
  createModalVisible: boolean = false;
  /**新建二级菜单 */
  newSecondMenu: WechatButton = {
    name: "",
    type: "view",
    key: "",
    url: ""
  };
  newWechatButton: WechatButton = {
    type: "click",
    view: "",
    name: "",
    sub_button: [],
    key: ""
  };
  buttonTypeOptions: { label: string; value: string }[] = [
    {
      label: "素材按钮",
      value: "click"
    },
    {
      label: "链接按钮",
      value: "view"
    }
  ];
  wechatMenu: WechatMenu = {
    menu: {
      button: []
    }
  };

  constructor(
    public adminService: FenxiaoAdminService,
    public wechat: WechatService
  ) {}

  ngOnInit() {
    this.listButtons();
  }

  async listButtons() {
    let data = await this.wechat.listButtons();
    if (data) {
      this.wechatMenu = data;
    }
    console.log(this.wechatMenu);
  }
  async removeMenu() {
    await this.wechat.removeMenu();
    await this.listButtons();
  }
  async createMenu() {
    await this.wechat.removeMenu();
    await this.wechat.createMenu(this.wechatMenu.menu);
    await this.listButtons();
  }
  addNewButtonMenu() {
    this.wechatMenu.menu.button.push(
      JSON.parse(JSON.stringify(this.newWechatButton))
    );
  }
  selectedButton: WechatButton;
  addSecondMenu() {
    this.selectedButton.sub_button.push(this.newSecondMenu);
  }
  openUrl(url) {
    window.open(url);
  }
  removeSencondButton(subBtn) {
    let i = this.selectedButton.sub_button.findIndex(
      button => button == subBtn
    );
    this.selectedButton.sub_button.splice(i, 1);
  }
  removeTopButton(button) {
    let i = this.wechatMenu.menu.button.findIndex(btn => btn == button);
    this.wechatMenu.menu.button.splice(i, 1);
  }
}
