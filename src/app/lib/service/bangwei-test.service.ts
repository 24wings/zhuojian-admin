import { Injectable } from "@angular/core";
import { ApiService } from ".";

@Injectable()
export class BangweiTestService {
  bangweiTestApi = {
    /**
     * ```js
     *function clearShopUser(query:any){}
     * ```
     */
    clearShopUser: "/test/bangwei/clear-shopUser",
    /**
     * function getShopUserAllInfo(query:any){
     * }
     */
    getShopUserAllInfo: "/test/bangwei/get-shopuser-allinfo",
 
 
    getFxUserAllInfo: '/test/bangwei/get-fxuser-allinfo',//get query:any
    clearFxUser: '/test/bangwei/clear-fxUser',//get  query:any
    removeFxUser:'/test/bangwei/remove-fxUser',// get   query:any   
  };
  constructor(public api: ApiService) {}
  clearShopUser(query: any) {
    return this.api.Get(this.bangweiTestApi.clearShopUser, {
      params: query
    });
  }

  getShopUserAllInfo(
    query: any
  ): Promise<{
    shopUser: ShopUser;
    orders: BangweiOrder[];
    bills: Bill[];
    recommand?: FenxiaoUser;
    recommandParent?: FenxiaoUser;
    recommandParentParent?: FenxiaoUser;
    tickets: BangweiTicket[];
  }> {
    return this.api.Get(this.bangweiTestApi.getShopUserAllInfo, {
      params: query
    });
  }
  removeFxUserById(query){
    return this.api.Get(this.bangweiTestApi.removeFxUser,{params:query})
  }
}
