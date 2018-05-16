import { Injectable } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd";
import { Http, RequestOptions, RequestOptionsArgs } from "@angular/http";
import { MyHttpService } from "./http.service";
@Injectable()
export class PcClientService {
  get shop_id() {
    return localStorage.getItem("shop_id");
  }
  set shop_id(str: string) {
    localStorage.setItem("shop_id", str);
  }
  pcClientApi = {
    login: "/pc/login",
    listMaterials: "/pc/list-shop-materials",
    createMaterial: "/create-material"
  };
  /**
   * 
   *  .get("/auth", home.index)
    .get("/", home.index)
    .get("/authUrl", home.getAuthUrl)
    .post("/test/upload", home.uploadBase64Test)
    .get("/getImage", home.getImage)
    .get("/getAuthCode", home.sendAuthCode)
    .post("/signup", home.signup)
    .post("/create-material", home.createMaterial)
    .get("/material", home.getMaterial)
    .get("/pc/list-shop-materials", home.listMaterial)
    .post("/pc/update-shop-material", home.updateMaterial)
    .get("/pc/get-shop-tickets", home.getShopTickets)
    .get("/pc/get-tickets-by-keyword", home.getTciketsByKeyword);
   * 
   */

  /** base64数据 */
  url2Qrcode(url: string): Promise<string> {
    return this.http.Post(`/api.url2Qrcode.go`, { url });
  }
  login(shop_id: string, password: string) {
    return this.http.Post(this.pcClientApi.login, { shop_id, password });
  }

  /**发送验证码 */
  async getAuthCode(phone: string) {
    return await this.http.Post("/sale.signupAuthCode.go", { phone });
  }
  async listMaterials() {
    return this.http.Get(this.pcClientApi.listMaterials, {
      params: { shop_id: this.shop_id }
    });
  }
  async createMaterial(material: IMaterial) {
    return this.http.Post(this.pcClientApi.createMaterial, material, {
      params: { shop_id: this.shop_id }
    });
  }

  constructor(public http: MyHttpService) {}
}
