import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Jsonp, Http, RequestOptionsArgs, } from '@angular/http';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from './api.service';
import { CommonService } from './common.service';
import { WechatService } from './wechat.service';
import { DbService } from './db.service';
import { AdminService } from './admin.service';
import { AppFruitService } from './app-fruit.service';


declare var WeixinJSBridge: any;
@Injectable()
export class ConfigService {
  fieldsToFromGroup(fields: Field[]) {
    let group: any = {};
    // this.createUserFormGroup= 
    fields.forEach(field => {
      console.log(field)
      group[field.key] = new FormControl(field.value || '', field.validators);
      // filed.key
    });
    return new FormGroup(group);
  }


  // 根据ip获取用户地理位置
  // async ipLocalAddress() {
  //   let localAddress: Address = await this.api.Get('/api.ipAddress.go');
  //   return { code: localAddress.data.city_id, name: localAddress.data.city };
  // }







  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public http: Http,
    public db: DbService,
    public jsonp: Jsonp,
    public location: Location,
    public api: ApiService,
    public common: CommonService,
    public wechat: WechatService,
    public admin: AdminService,
    public fruit: AppFruitService
  ) { }

  clearObject(obj: Object): void {
    for (let key in obj) {
      if (typeof obj[key] == 'object') {
        this.clearObject(obj[key])
      } else {
        delete obj[key]
      }
    }


  }


}
