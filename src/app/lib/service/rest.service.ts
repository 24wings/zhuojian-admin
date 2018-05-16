import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { DbService, IAction } from "./db.service";
import { ActionType } from "../enum";
@Injectable()
export class RestService {
  restApi = {
    db: "/api.rest.go",
    uploadImage: "/api.uploadImage.go", // psot base64
    uploadImages: "/api.uploadImages.go" // post base64s
  };

  findAll(model: string, query, action: IAction) {
    return this.db.findAll(model, query, action);
  }

  uploadImage(base64: string): Promise<CloudinaryImage> {
    return this.api.Post(this.restApi.uploadImage, { base64 });
  }
  uploadImages(base64s: string[]): Promise<CloudinaryImage[]> {
    return this.api.Post(this.restApi.uploadImages, { base64s });
  }
  createOne(modelName: string, body) {
    return this.api.Post(this.restApi.db, {
      model: modelName,
      type: ActionType.NEW,
      newObject: body
    });
  }

  removeOne(modelName: string, query) {
    return this.api.Post(this.restApi.db, {
      model: modelName,
      type: ActionType.DELETE,
      query
    });
  }
  removeById(modelName: string, _id: string) {
    return this.api.Post(this.restApi.db, {
      model: modelName,
      type: ActionType.DELETE,
      query: { _id }
    });
  }
  updateOne(modelName, query) {
    return this.api.Post(this.restApi.db, {
      model: modelName,
      type: ActionType.UPDATE,
      query
    });
  }
  updateById(modelName, _id, updateObject) {
    return this.api.Post(this.restApi.db, {
      model: modelName,
      type: ActionType.UPDATE,
      query: { _id },
      updateObject
    });
  }
  removeByIds(modelName, _ids: string[]) {
    return this.api.Post(this.restApi.db, {
      model: modelName,
      type: ActionType.DeleteMany,
      query: { _ids }
    });
  }

  constructor(public api: ApiService, public db: DbService) {}
}
