import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { BangweiOrderState } from "../../lib";

export enum SubmitShopState {
  Wait = 1,
  Pass,
  Fail
}

// systemAction 的 actionType
export enum ActionState {
  FenxiaoSubmitShopPassAction = 1,
  FenxiaoSubmitShopFailAction
}

@Injectable()
export class FenxiaoAdminService {
  private fxAdminApi = {
    listFenxiaoUsers: "/fenxiao-admin/all-fenxiao-users",
    listFenxiaoSubmitShops: "/fenxiao-admin/all-submit-shops",
    passFenxiaoSubmitShop: "/fenxiao-admin/pass-submit-shop",
    failSubmitShop: "/fenxiao-admin/fail-submit-shop",
    chooseParent: "/fenxiao-admin/choose-parent",
    // listSubmitActions: "/fenxiao-admin/list-submit-actions",
    listSystemAction: "/fenxiao-admin/actions", //ActionType
    listWaitVerifyUsers: "/fenxiao-admin/list-wait-verify-users",
    listPassedVerifyUsers: "/fenxiao-admin/list-passed-verify-users",
    confirmVerifyUser: "/fenxiao-admin/confirm-verify-user", // 审核通过用户
    fullMemberFxUser: "/fenxiao-admin/full-member-fxuser", // 成为会员,
    queryOrder: "/bangwei-shop/admin/query-order",
    getOrderInfo: "/bangwei-shop/admin/getOrderInfo", // orderId
    sendProduct: "/bangwei-shop/admin/send-product"
  };
  async confirmVerifyUser(fxUserId: string) {
    return this.api.Get(this.fxAdminApi.confirmVerifyUser, {
      params: { fxUserId }
    });
  }
  fullMemberFxUser(fxUserId: string) {
    return this.api.Get(this.fxAdminApi.fullMemberFxUser, {
      params: { fxUserId }
    });
  }

  queryOrder(state?: BangweiOrderState) {
    let params = {};
    if (state) params["state"] = state;
    return this.api.Get(this.fxAdminApi.queryOrder, { params });
  }

  listFenxiaoUsers(state?: any) {
    return state
      ? this.api.Get(this.fxAdminApi.listFenxiaoUsers, { params: { state } })
      : this.api.Get(this.fxAdminApi.listFenxiaoUsers);
  }
  listFenxiaoSubmitShops(state?: SubmitShopState) {
    if (state)
      return this.api.Get(this.fxAdminApi.listFenxiaoSubmitShops, {
        params: { state }
      });
    else return this.api.Get(this.fxAdminApi.listFenxiaoSubmitShops);
  }
  passFenxiaoSubmitShop(_id: string) {
    return this.api.Get(this.fxAdminApi.passFenxiaoSubmitShop, {
      params: { _id }
    });
  }
  failFenxiaoSubmitShop(_id: string) {
    return this.api.Get(this.fxAdminApi.failSubmitShop, {
      params: { _id }
    });
  }
  chooseParent(userId, parentId) {
    return this.api.Get(this.fxAdminApi.chooseParent, {
      params: { userId, parentId }
    });
  }
  listSubmitSuccessActions() {
    return this.api.Get(this.fxAdminApi.listSystemAction, {
      params: { actionType: ActionState.FenxiaoSubmitShopPassAction }
    });
  }
  listSubmitFailActions() {
    return this.api.Get(this.fxAdminApi.listSystemAction, {
      params: { actionType: ActionState.FenxiaoSubmitShopFailAction }
    });
  }
  listWaitVerifyUsers() {
    // return this.api.Get(this.api.f);
    return this.api.Get(this.fxAdminApi.listSystemAction);
  }

  getOrderInfo(orderId: string) {
    console.log(orderId);
    return this.api.Get(this.fxAdminApi.getOrderInfo, { params: { orderId } });
  }
  sendProduct(
    orderId: string,
    transfer: { transfer?: string; sendDt?: Date; sendComment?: string }
  ) {
    return this.api.Post(this.fxAdminApi.sendProduct, transfer, {
      params: { orderId }
    });
  }

  constructor(public api: ApiService) {}
}
