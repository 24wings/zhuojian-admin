import { Component, OnInit } from "@angular/core";
import { ApiService, ShopClientService, FxService } from "../../../lib";
import { BangweiTestService } from "../../../lib/service/bangwei-test.service";

@Component({
  selector: "app-test-shop-page",
  templateUrl: "./test-shop-page.component.html",
  styleUrls: ["./test-shop-page.component.scss"]
})
export class TestShopPageComponent implements OnInit {
  payOrderModalVisible: boolean = false;
  shopUser: ShopUser;
  orderId: string = "";
  orders: BangweiOrder[] = [];
  recommand: FenxiaoUser;
  recommandParent: FenxiaoUser;
  recommandParentParent: FenxiaoUser;
  bills: Bill[] = [];
  tickets: BangweiTicket[] = [];

  constructor(
    public client: ShopClientService,
    public fx: FxService,
    public testApi: BangweiTestService
  ) {}

  ngOnInit() {}

  async createShopUser(Phone) {
    this.shopUser = await this.fx.shopSignup({ Phone });
    localStorage.setItem("shopUserId", this.shopUser._id);
    await this.getUserInfo({ Phone });
  }
  async clearShopUser(Phone) {
    await this.testApi.clearShopUser({ Phone });
    this.orders = null;
    this.shopUser = null;
    this.bills = null;
    this.recommand = null;
    this.recommandParent = null;
    this.recommandParentParent = null;
  }
  async getUserInfo(query) {
    let result = await this.testApi.getShopUserAllInfo(query);
    this.orders = result.orders;
    console.log(this.orders);
    this.shopUser = result.shopUser;
    this.bills = result.bills;
    this.recommand = result.recommand;
    this.recommandParent = result.recommandParent;
    this.recommandParentParent = result.recommandParentParent;
    this.tickets = result.tickets;
    console.log(this.tickets);
  }
  /**购买随机商品 */
  async buyRandomProduct() {
    let groups: {
      children: BangweiProduct[];
    }[] = await this.client.listGroupAndProducts();
    let product = groups
      .filter(group =>
        group.children.find(product => /技师工位/g.test(product.unit))
      )[0]
      .children.find(product => /技师工位/g.test(product.unit));

    await this.client.userCreateOrder(product._id, 1, this.shopUser._id);
    alert(`创建订单  ${product.name} 1个`);

    await this.getUserInfo({ Phone: this.shopUser.Phone });
  }

  async payOrder() {
    let tickets = await this.client.userActiveTickets();
    let {
      reciveAddress,
      default: defaultAddress
    } = await this.client.shopUserReciveAddress();
    let address = reciveAddress[0];
    if (!address) {
      address = await this.client.createShopUserReciveAddress({
        name: "test"
      });
    }
    let order = await this.client.getOrderDetail(this.orderId);
    let truePayMoney =
      order.num * order.product.price * order.product.discount / 100;
    if (tickets[0]) {
      let pay = await this.client.payOrder(
        this.orderId,
        [tickets[0]._id],
        truePayMoney - tickets[0].reduction.value,
        address._id
      );
      alert(`支付订单 ${this.orderId} `);
    } else {
      let pay = await this.client.payOrder(
        this.orderId,
        [],
        truePayMoney,
        address._id
      );
      alert(`支付订单 ${this.orderId} `);
    }
    await this.getUserInfo({ Phone: this.shopUser.Phone });

    this.payOrderModalVisible = false;
  }
  async creatFxuser() {
    let fxa = await this.fx.fxSignup({ Phone: "Fxa" });
    if (!fxa) {
      await this.testApi.removeFxUserById({ Phone: "Fxa" });
      fxa = await this.fx.fxSignup({ Phone: "Fxa" });
    }

    let shopUser = await this.fx.shopSignup({
      Phone: "b",
      RecommandCode: fxa.id
    });
    if (!shopUser) {
      this.clearShopUser("b");
      shopUser = await this.fx.shopSignup({
        Phone: "b",
        RecommandCode: fxa._id
      });
    }
    this.shopUser = shopUser;
    localStorage.setItem("shopUserId", this.shopUser._id);
    this.getUserInfo({ Phone: "b" });
  }
  async createFxUserParent() {
    let fxc = await this.fx.fxSignup({ Phone: "Fxc" });
    if (!fxc) {
      await this.testApi.removeFxUserById({ Phone: "Fxc" });
      fxc = await this.fx.fxSignup({ Phone: "Fxc" });
    }
    let fxb = await this.fx.fxSignup({ Phone: "Fxb", Parent: fxc._id });
    if (!fxb) {
      await this.testApi.removeFxUserById({ Phone: "Fxb" });
      fxb = await this.fx.fxSignup({ Phone: "Fxb" });
    }
    let shopc = await this.fx.shopSignup({
      Phone: "c",
      RecommandCode: fxb._id
    });
    if (!shopc) {
      await this.clearShopUser("c");
      shopc = await this.fx.shopSignup({ Phone: "c", RecommandCode: fxb._id });
    }
    this.shopUser = shopc;
    localStorage.setItem("shopUserId", this.shopUser._id);
    this.getUserInfo({ Phone: "c" });
  }
  async createFxUserParentParent() {
    let fxf = await this.fx.fxSignup({ Phone: "Fxf" });
    if (!fxf) {
      await this.testApi.removeFxUserById({ Phone: "Fxf" });
      fxf = await this.fx.fxSignup({ Phone: "Fxf" });
    }
    let fxe = await this.fx.fxSignup({ Phone: "Fxe", Parent: fxf._id });
    if (!fxe) {
      await this.testApi.removeFxUserById({ Phone: "Fxe" });
      fxe = await this.fx.fxSignup({ Phone: "Fxe" });
    }
    let fxd = await this.fx.fxSignup({ Phone: "Fxd", Parent: fxe._id });
    if (!fxd) {
      await this.testApi.removeFxUserById({ Phone: "Fxd" });
      fxd = await this.fx.fxSignup({ Phone: "Fxd" });
    }

    let shopd = await this.fx.shopSignup({
      Phone: "d",
      RecommandCode: fxd._id
    });
    if (!shopd) {
      await this.clearShopUser("d");
      shopd = await this.fx.shopSignup({ Phone: "d", RecommandCode: fxd._id });
    }
    this.shopUser = shopd;
    localStorage.setItem("shopUserId", this.shopUser._id);
    this.getUserInfo({ Phone: "d" });
  }
}
