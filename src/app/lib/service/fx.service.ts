import { Injectable } from "@angular/core";
import { ApiService } from "../service/api.service";

let fxApi = {
  fxSignin: "/fenxiao/fenxiao-user/signin", // Post{Phone,Password}
  fxSignup: "/fenxiao/fenxiao-user/signup", //Post  FenxiaoUser
  shopSignin: "/fenxiao/shop-user/signin", // Post {Phone,Password}
  shopSignup: "/fenxiao/shop-user/signup", // Post ShopUser
  userAuthCode: "/fenxiao/user-auth-code", //Get Phone
  queryAuthCodeDetail: "/fenxiao/query-detail", //Get Phone
  fxUserRelation: "/fenxiao/fenxiao-user/relation",
  fxUserInfo: "/fenxiao/user-info",
  submitShop: "/fenxiao/submit-shop",
  fxUserSubmitShops: "/fenxiao/list-submit-shop",
  setParent: "/fenxiao/set-parent" // get  fxUserId  parentId
};
enum SubmitShopState {
  Wating = 1,
  Pass,
  Fail
}

@Injectable()
export class FxService {
  get fxUserId() {
    return localStorage.getItem("fxUserId");
  }

  fxUserRelation() {
    return this.httpservice.Get(fxApi.fxUserRelation, {
      params: { userId: this.fxUserId }
    });
  }
  fxUserInfo() {
    return this.httpservice.Get(fxApi.fxUserInfo, {
      params: { userId: this.fxUserId }
    });
  }
  setParent(parentId: string) {
    return this.httpservice.Get(fxApi.setParent, {
      params: {
        fxUserId: this.fxUserId,
        parentId
      }
    });
  }

  constructor(public httpservice: ApiService) {}

  fxSignin(Phone: string, Password: string, isWithErrorHandle: boolean = true) {
    return isWithErrorHandle
      ? this.httpservice.Post(fxApi.fxSignin, { Phone, Password })
      : this.httpservice.Post(fxApi.fxSignin, {
          Phone,
          Password
        });
  }
  fxSignup(fenxiaoUser: FenxiaoUser) {
    return this.httpservice.Post(fxApi.fxSignup, fenxiaoUser);
  }
  shopSignup(newshop: ShopUser) {
    return this.httpservice.Post(fxApi.shopSignup, newshop);
  }
  shopSignin(Phone, Password) {
    return this.httpservice.Post(fxApi.shopSignin, { Phone, Password });
  }
  sendUserAuthCode(Phone: string) {
    return this.httpservice.Get(fxApi.userAuthCode, { params: { Phone } });
  }
  queryAuthCodeDetail(Phone: string) {
    return this.httpservice.Get(fxApi.queryAuthCodeDetail, {
      params: { Phone }
    });
  }
  submitShop(shop: SubmitShop) {
    return this.httpservice.Post(fxApi.submitShop, shop, {
      params: { fxUserId: this.fxUserId }
    });
  }
  listFxUserSubmitRecords() {
    return this.httpservice.Get(fxApi.fxUserSubmitShops, {
      params: { userId: this.fxUserId }
    });
  }
}
