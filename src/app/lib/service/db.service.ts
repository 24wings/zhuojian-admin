import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { ApiService } from "./api.service";
import { Model } from "../Model";
import { ActionType } from "../enum";

export interface IAction {
  type?: ActionType;
  query?: Object;
  skip?: number;
  limit?: number;
  sort?: Object;
  model?: string;
  populate?: string;
  newObject?: Object;
  keyword?: string;
  keys?: string[];
}

@Injectable()
export class DbService {
  models = {
    shopUserModel: "shopUserModel",
    fenxaioUserModel: "fenxaioUserModel",
    systemActionModel: "systemActionModel",
    shopUserReciveAddressModel: "shopUserReciveAddressModel",
    payOrderModel: "payOrderModel",
    orderActionModel: "orderActionModel",
    bangweiProductGroupModel: "bangweiProductGroupModel",
    bangweiProductModel: "bangweiProductModel",
    bangweiReductionModel: "bangweiReductionModel",
    bangweiOrderModel: "bangweiOrderModel",
    bangweiTicketModel: "bangweiTicketModel",
    bangweiSubmitShopModel: "bangweiSubmitShopModel"
  };
  private buildModel<T>(modelName: string): Model<T> {
    let model = new Model<T>(modelName);
    model["http"] = this.http;
    model["api"] = this.api;
    return model;
  }
  private IP = "http://localhost";
  // user = this.buildModel<User>('userModel');
  findAll(modelName, query, action?: IAction) {
    return this.buildModel<any>(modelName).find(query, action);
  }

  createOne<T>(modelName, newObject) {
    return this.buildModel<T>(modelName).createOne(newObject);
  }
  removeOne<T>(modelName, query) {
    return this.buildModel<T>(modelName).remove(query);
  }
  removeById<T>(modelName, _id) {
    return this.buildModel<T>(modelName).remove({ _id });
  }

  private do<T>(action: IAction): Promise<T[]> {
    return this.http
      .post(this.IP + "/api.rest.go", action)
      .toPromise()
      .then(response => {
        let result = response.json();
        if (result.ok) {
          return result.data;
        } else {
          alert(result.data);
        }
      });
  }

  constructor(private http: Http, public api: ApiService) {}
}
