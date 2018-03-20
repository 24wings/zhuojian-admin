import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AdminService } from './admin.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MockService } from './mock.service';
import { FruitOrderState } from '../index';
@Injectable()
export class AppFruitService {
  isMocking: boolean = true;
  private adminLoginApi: string = '/fruit.login.post';
  private getAdminInfoApi: string = '/fruit.adminInfo.get';
  private adminLogoutApi: string = '/fruit.adminLogout.get';
  private userListApi: string = '/fruit.userlist.get';// 用户列表
  private createUserApi: string = '/fruit.createUser.post';// 创建用户
  private deleteFruitUserApi: string = '/fruit.deleteFruitUser.del';// 删除用户
  private updateFruitUserApi: string = '/fruit.updateUser.put';// 更新用户
  private searchUserList: string = '/fruit.searchUserlist.get';// 关键字搜索用户
  private productGroupList: string = '/fruit.productGroups.get';// 产品组列表
  private createProductGroupApi: string = '/fruit.createProductGroup.post';// 创建产品组
  private updateProductGroupApi: string = '/fruit.updateProductGroup.put';// 更新产品组
  private deleteProductGroupApi: string = '/fruit.deleteProductGroup.del';
  private productGroupProductsApi: string = '/fruit.productGroupProducts.get';// 获取产品组下的产品
  private getSendProductOrdersNumApi = '/fruit.sendProductOrdersNum.get';
  private getTodayOrdersApi: string = '/fruit.todayOrders.get';
  private getMainInfoApi: string = '/fruit.mainInfo.get'
  // private userOrdersApi
  // 增加产品
  private createProductApi: string = '/fruit.createProduct.post';

  // 删除产品
  private deleteProductApi: string = '/fruit.deleteProduct.del';

  // 更新产品
  private updateProductApi: string = '/fruit.updateProduct.put';
  public get fruitAdmin() {
    return JSON.parse(localStorage.getItem('admin'));
  }
  public set fruitAdmin(obj: any) {
    localStorage.setItem('admin', JSON.stringify(obj));
  }
  get isAdminLogin() {
    return !!this.fruitAdmin;
  }
  get fruitUserFields(): Field[] {
    return [{ key: 'nickname', label: '昵称', value: '', controlType: 'text', validators: Validators.required },
    { key: 'phone', label: '手机号', value: '', controlType: 'text', validators: Validators.required },
    { key: 'password', label: '密码', value: '', controlType: 'text', validators: Validators.required }]
  }
  get fruitProductGroupFields(): Field[] {
    return [{ label: '产品名称', key: 'name', value: "123", validators: Validators.required, controlType: 'text' },
    { label: '推荐广告图', key: 'image', value: '', validators: Validators.required, controlType: 'image' },
    { label: '是否推荐', key: 'isRecommand', value: false, validators: Validators.required, controlType: 'checkbox' }]
  }

  /**
   * price: { type: Number },
    images: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cloudinary-image' }], default: [] },
    createDt: { type: Date, default: Date.now },
    summary: { type: String, default: '' },
   */
  get fruitProductFields(): Field[] {
    return [
      { label: '产品名称', key: 'name', value: '', validators: Validators.required, controlType: 'text' },
      { label: '价格', key: 'price', value: '', validators: Validators.required, controlType: 'number' },
      { label: '产品图片', key: 'images', value: [], validators: Validators.required, controlType: 'images' },
      { label: '简介', key: 'summary', value: '', validators: Validators.required, controlType: 'text' },
      { label: '库存', key: 'store', value: 0, validators: Validators.required, controlType: 'number' }
    ]
  }


  adminLogin(username: string, password: string) {
    if (this.isMocking) {
      return this.mock.adminLogin(username, password);
    } else {
      return this.api.Post(this.adminLoginApi, { username, password });
    }
  }
  private get adminId() {
    return this.admin.admin._id;
  }
  async listFruitUsers(page?: number, pageSize?: number) {
    return this.isMocking ? this.mock.listFruitUsers() : this.api.Get(this.userListApi + '?adminId=' + this.admin.admin._id);
  }

  async createFruitUser(user: FruitUser) {
    user.adminId = this.adminId;
    return this.api.Post(this.createUserApi, user);
  }
  async deleteFruitUser(userId: string) {
    this.api.Delete(this.deleteFruitUserApi + `?adminId=${this.adminId}&userId=${userId}`)
  }
  async searchUserListByKeyword(keyword: string) {
    return this.api.Get(this.searchUserList + `?keyword=${keyword}&adminId=${this.adminId}`)
  }

  updateFruitUser(userId: string, user: FruitUser) {
    return this.api.Put(this.updateFruitUserApi + `?userId=${userId}&adminId=${this.adminId}`, user);
  }

  /**
   * 过滤对象 成为表单数据,去除_id,
   * 
   *  let pureFruit = object2FruitFiledsValue(fruit);
   *  frutUser.setFormValue()
   * @param obj 
   */
  object2FruitUserFiledsValue(obj: Object) {
    let result = {};
    this.fruitUserFields.forEach(field => result[field.key] = obj[field.key]);
    return <any>result;

  }
  object2FruitProductGroupFieldsValue(obj: Object) {
    let result = {};
    this.fruitProductGroupFields.forEach(field => result[field.key] = obj[field.key]);
    return <any>result;

  }


  listProductGroups() {
    return this.api.Get(this.productGroupList + `?adminId=` + this.adminId);
  }

  createProductGroup(productGroup: FruitProductGroup) {
    return this.api.Post(this.createProductGroupApi + `?adminId=${this.adminId}`, productGroup);
  }

  updateProductGroup(groupId: string, productGroup: FruitProductGroup) {
    return this.api.Put(this.updateProductGroupApi + `?adminId=${this.adminId}&groupId=${groupId}`, productGroup);
  }

  updateGroupRecommand(groupId: string, isRecommand: boolean) {
    return this.updateProductGroup(groupId, { isRecommand });
  }

  deleteProductGroup(groupId: string) {
    return this.api.Delete(this.deleteProductGroupApi + `?adminId=${this.adminId}&groupId=${groupId}`);
  }

  getProductGroupProducts(groupId: string) {
    return this.api.Get(this.productGroupProductsApi + `?adminId=${this.adminId}&groupId=${groupId}`);
  }

  createProduct(groupId: string, newProduct: FruitProduct) {
    if (!newProduct.group) newProduct.group = groupId;
    return this.api.Post(this.createProductApi + `?adminId=${this.adminId}&groupId=${groupId}`, newProduct);
  }

  deleteProduct(productId: string) {
    return this.api.Delete(this.deleteProductApi + `?productId=${productId}&admin=${this.adminId}`);
  }

  updateProduct(productId: string, newProduct) {
    return this.api.Put(this.updateProductApi + `?productId=${productId}&adminId=${this.adminId}`, newProduct);
  }

  getAdminInfo() {
    return this.isMocking ? this.mock.admin : this.api.Get(this.getAdminInfoApi);
  }
  adminLogout() {
    return this.api.Get(this.adminLogoutApi);
  }
  getSendProductOrdersNum() {
    return this.isMocking ? 77 : this.api.Get(this.getSendProductOrdersNumApi);
  }

  getTodayOrders(orderState: number) {
    return this.isMocking ? this.mock.getTodayOrders() : this.api.Get(this.getTodayOrdersApi + (orderState == null || orderState == undefined ? '' : `?orderState=${orderState}`));
  }
  getMainInfo() {
    return this.isMocking ? this.mock.getMainInfo() : this.api.Get(this.getMainInfoApi);
  }
  getUserOrder() {
    return [{ createDt: new Date(), product: { name: '边瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.UnConfirm, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '南瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.SendProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '苹果' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.ReciveProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '冬瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.Finish, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '西瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.UnConfirm, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '边瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.SendProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '南瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.ReciveProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '苹果' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.Finish, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '冬瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.UnConfirm, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '西瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.SendProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '哈密瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.ReciveProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '樱桃' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.Finish, admin: '', address: '杭州西湖区古荔湾' },
    //待发货
    { createDt: new Date(), product: { name: '边瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.UnConfirm, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '南瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.SendProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '苹果' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.ReciveProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '冬瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.Finish, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '西瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.UnConfirm, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '边瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.SendProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '南瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.ReciveProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '苹果' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.Finish, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '冬瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.UnConfirm, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '西瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.SendProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '哈密瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.ReciveProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '樱桃' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.Finish, admin: '', address: '杭州西湖区古荔湾' },
    //待发货
    { createDt: new Date(), product: { name: '边瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.UnConfirm, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '南瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.SendProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '苹果' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.ReciveProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '冬瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.Finish, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '西瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.UnConfirm, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '边瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.SendProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '南瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.ReciveProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '苹果' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.Finish, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '冬瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.UnConfirm, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '西瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.SendProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '哈密瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.ReciveProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '樱桃' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.Finish, admin: '', address: '杭州西湖区古荔湾' },
    //待发货
    { createDt: new Date(), product: { name: '边瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.UnConfirm, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '南瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.SendProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '苹果' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.ReciveProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '冬瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.Finish, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '西瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.UnConfirm, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '边瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.SendProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '南瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.ReciveProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '苹果' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.Finish, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '冬瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.UnConfirm, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '西瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.SendProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '哈密瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.ReciveProduct, admin: '', address: '杭州西湖区古荔湾' },
    { createDt: new Date(), product: { name: '樱桃' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.Finish, admin: '', address: '杭州西湖区古荔湾' },

    ]
  }
  /**
   * 
   * @param api this.users = this.searchUser
      // .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      // .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => {
        console.log('term', term);

        return term   // switch to new observable each time the term changes

          // return the http search observable
          ? this.config.fruit.searchUserListByKeyword(term) //this.config.fruit.searchUserListByKeyword(term)
          // or the observable of empty heroes if there was no search term
          : Observable.of<FruitUser[]>([])

      })
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<FruitUser[]>([]);
      });
   * @param admin 
   * @param http 
   */
  constructor(private api: ApiService, private admin: AdminService, public http: Http, private mock: MockService) { }

}
