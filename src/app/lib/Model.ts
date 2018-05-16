import { IAction } from "./service/db.service";
import { Http } from "@angular/http";
import { ApiService } from "./service/api.service";

enum ActionType {
  FIND = 1,
  UPDATE,
  NEW,
  DELETE,
  FINDONE,
  FindByKeyword,
  //创建多个
  CreateMany
}
export class Model<T> {
  /**运行时bind的http,api,由db.service注入 */
  private http: Http;
  private api: ApiService;
  async findOne(query: Object, options?: IAction): Promise<T> {
    return <T>await this.api.Post(
      "/api.rest.go",
      Object.assign(
        { model: this.modelName, type: ActionType.FINDONE },
        { query },
        options
      )
    );
  }
  async find(query?: Object, options?: IAction) {
    return <T[]>await this.api.Post(
      "/api.rest.go",
      Object.assign(
        { model: this.modelName },
        { type: ActionType.FIND },
        { query },
        options
      )
    );
  }
  async findByKeyword(keyword: string, keys: string[], options?: IAction) {
    return <T[]>await this.api.Post(
      "/api.rest.go",
      Object.assign(
        { model: this.modelName },
        { type: ActionType.FindByKeyword },
        { keys, keyword },
        options
      )
    );
  }
  /** 最后一个参数,默认一次只修改一条数据,multi为true为修改批量数据 */
  async update(
    query: Object,
    updateObject: Object,
    multi: boolean = false
  ): Promise<{ n: number; nModified: number; ok: number }> {
    return <{ n: number; nModified: number; ok: number }>await this.api.Post(
      "/api.rest.go",
      Object.assign(
        { model: this.modelName, type: ActionType.UPDATE },
        { query },
        updateObject,
        multi
      )
    );
  }
  /**创建一个表实例 */
  async createOne(newObject?: Object) {
    let modelName = this.modelName;
    debugger;
    return <T>await this.api.Post("/api.rest.go", {
      model: modelName,
      type: ActionType.NEW,
      newObject
    });
  }
  async remove(query: Object): Promise<{ n: number; ok: number }> {
    return <{ n: number; ok: number }>await this.api.Post(
      "/api.rest.go",
      Object.assign(
        { model: this.modelName, type: ActionType.DELETE },
        { query }
      )
    );
  }

  async createMany(manyObj: Object[]): Promise<T[]> {
    return <T[]>await this.api.Post(
      "/api.rest.go",
      Object.assign(
        { model: this.modelName, type: ActionType.CreateMany },
        { newObject: manyObj }
      )
    );
  }

  constructor(private modelName: string) {}
}
