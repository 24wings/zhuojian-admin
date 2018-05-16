import { Injectable } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd";
import { Http, RequestOptions, RequestOptionsArgs } from "@angular/http";

@Injectable()
export class MyHttpService {
  isDev: boolean = true;
  get ip() {
    return this.isDev ? this.localIp : this.serverIp;
  }
  localIp = "http://47.100.23.203";
  serverIp = "http://47.100.23.203";
  Get(url: string, options?: RequestOptionsArgs) {
    // options = options ? options : {};

    // options.withCredentials = true;
    return this.http
      .get(`${this.ip}${url}`, options)
      .toPromise()
      .then(rtn => {
        let result = rtn.json();
        if (result.ok) {
          return result.data;
        } else {
          return this.createMessage("error", result.data);
        }
      });
  }
  Post(url: string, body: any, options?: RequestOptionsArgs): Promise<any> {
    // options = options ? options : {};

    // options.withCredentials = true;
    return this.http
      .post(`${this.ip}${url}`, body, options)
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

    // options.withCredentials = true;
    return this.http
      .delete(`${this.ip}${url}`, options)
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
    // options.withCredentials = true;
    return this.http
      .put(`${this.ip}${url}`, body, options)
      .toPromise()
      .then(rtn => {
        let result = rtn.json();
        return result.ok
          ? result.data
          : this.createMessage("error", result.data);
      });
  }
  createMessage(type: "error" | "success" | "warning", text) {
    return this._message.create(type, `这是一条${text}提示`);
  }
  constructor(public http: Http, private _message: NzMessageService) {}
}
