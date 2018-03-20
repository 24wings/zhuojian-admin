import { Injectable } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd";
import { Http, RequestOptions, RequestOptionsArgs } from "@angular/http";

@Injectable()
export class ApiService {
  serverIp = "http://118.31.72.227";

  bangweiH5Api = {
    postSubmitShop: "/bangwei-h5/submit-shop",
    getSubmitShops: "/bangwei-h5/list-submit-shops"
  };

  Get(url: string, options?: RequestOptionsArgs) {
    options = options ? options : {};

    options.withCredentials = true;
    return this.http
      .get(`${this.serverIp}${url}`, options)
      .toPromise()
      .then(rtn => {
        let result = rtn.json();
        return result.ok
          ? result.data
          : this.createMessage("error", result.data);
      });
  }
  Post(url: string, body?: any, options?: RequestOptionsArgs) {
    options = options ? options : {};

    options.withCredentials = true;
    return this.http
      .post(`${this.serverIp}${url}`, body, options)
      .toPromise()
      .then(rtn => {
        let result = rtn.json();
        return result.ok
          ? result.data
          : this.createMessage("error", result.data);
      });
  }

  Delete(url: string, options?: RequestOptionsArgs) {
    options = options ? options : {};

    options.withCredentials = true;
    return this.http
      .delete(`${this.serverIp}${url}`, options)
      .toPromise()
      .then(rtn => {
        let result = rtn.json();
        return result.ok
          ? result.data
          : this.createMessage("error", result.data);
      });
  }

  Put(url: string, body, options?: RequestOptionsArgs) {
    options = options ? options : {};
    options.withCredentials = true;
    return this.http
      .put(`${this.serverIp}${url}`, body, options)
      .toPromise()
      .then(rtn => {
        let result = rtn.json();
        return result.ok
          ? result.data
          : this.createMessage("error", result.data);
      });
  }
  /** base64数据 */
  url2Qrcode(url: string): Promise<string> {
    return this.http
      .post(`${this.serverIp}/api.url2Qrcode.go`, { url })
      .toPromise()
      .then(rtn => {
        let result = rtn.json();
        return result.ok
          ? result.data
          : this.createMessage("error", result.data);
      });
  }

  async checkAuthCode(phone: string, code: string): Promise<boolean> {
    return await this.Post("/sale.checkAuthCode.go", { code, phone });
  }
  /**发送验证码 */
  async getAuthCode(phone: string) {
    return await this.Post("/sale.signupAuthCode.go", { phone });
  }

  createMessage(type: "error" | "success" | "warning", text) {
    this._message.create(type, `这是一条${text}提示`);
  }

  listSubmitShops() {
    return this.Get(this.bangweiH5Api.getSubmitShops);
  }
  constructor(public http: Http, private _message: NzMessageService) {}
}
