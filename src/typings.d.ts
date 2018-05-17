/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare var wx: any;
declare var WeixinJSBridge: any;

interface Admin {
  _id?: string;
  nickname: string;
  phone: string;
  password: string;
  repassword?: string;
}
interface FruitUser {
  _id?: string;
  adminId?: string;
  nickname?: string;
  phone?: string;
  password?: string;
  repassword?: string;
  bussiness?: any;
  state?: string;
  createDt?: Date;
  checked?: boolean;
}

interface FruitProductGroup {
  _id?: string;
  name?: string;
  image?: any;
  products?: any[];
  createDt?: Date;
  isRecommand?: boolean;
}

interface FruitProduct {
  _id?: string;
  price: number;
  summary: number;
  store: number;
  name: string;
  images: string[];
  group: any;
  createDt?: Date;
}

interface FruitOrder {
  _id?: string;
  createDt: Date;
  product: any;
  orderUser: any;
  state: Number;
  admin: any;
  num: number;
  address: string;
  checked?: boolean;
}

declare var G2: any;

//邦为商城头文件

interface BangweiProductGroup {
  _id?: string;
  groupName: string;
  image?: string;
  summary: string;
  createDt?: Date;
  children?: any[];
  checked?: boolean;
}

interface BangweiProduct {
  _id?: string;
  name: string;
  price?: number;
  discount?: number;
  createDt?: Date;
  images?: any[];
  summary?: string;
  active?: boolean;
  checked?: boolean;
  group?: string;
  unit?: string;
  minScore?: number;
}

interface Reduction {
  _id?: string;
  title?: string;
  value?: number;
  everyUser?: boolean;
  createDt?: Date;
  icon: any;
  checked?: boolean;
}

interface BangweiUser {
  _id?: string;
  openid?: string;
  nickname?: string;
  createDt?: Date;
  checked?: boolean;
}

interface ShopUser {
  _id?: string;
  Id?: string;
  Nickname?: string;
  Phone?: string;
  Password?: string;
  Sex?: number;
  RecommandCode?: string;
  Job?: string;
  Industry?: string;
  CreateDt?: string;
  AuthCode?: string;
}

interface FenxiaoUser {
  _id?: string;
  Nickname?: string;
  Phone?: string;
  Password?: string;
  Sex?: number;
  Job?: string;
  AuthCode?: string;
  WechatId?: string;
  ReciveRegion?: string;
  City?: string;
  Area?: string;
  Address?: string;
  checked?: boolean;
  CreateDt?: Date;
  TotalMoney?: number;
  LessMoney?: number;
  telePhone?: string;
  Parent?: string;
}

declare var BMap: any;

interface WechatButton {
  name: string;
  type?: "click" | "view"; // 默认click
  key?: string;
  url?: string;
  view?: string;
  sub_button?: WechatButton[];
}

interface WechatMenu {
  menu: {
    button: WechatButton[];
  };
}

interface Field {
  key: string;
  value?: any;
  label?: string;
  required?: boolean;
  type?: any;
  default?: any;
  options?: { label: any; value: any }[]; //type select options
}

interface CloudinaryImage {
  _id: string;
  url: string;
  width: number;
}

interface BangweiOrder {
  _id?: string;
  product?: any;
  num?: number;
  reductions?: any[];
  user?: any;
  createDt?: Date;
  state?: any;
  payDate?: Date;
  sendDt?: Date;
  useTickets?: any[];
  totalPrice?: number;
  truePayMoneyNumber?: number;
  reciveAddress?: ShopUserReciveAddress;
  checked?: boolean;
}

interface ShopUserReciveAddress {
  _id?: string;
  name?: string;
  phone?: string;
  region?: string;
  city?: string;
  area?: string;
  detailAddress?: string;
  isDefault?: boolean;
  publishRequire?: string;
  publishContent?: string;
  shopuser?: string;
  publishDt?: Date;
}

interface SubmitShop {
  _id?: string;
  shopName?: string;
  images?: string[];
  opreatorName?: string;
  opreatorContact?: string;
  masterName?: string;
  masterContact?: string;
  // phone: { type: String, required: true },
  workNum?: number;
  roomNum?: number;
  floorNum?: number;
  shopArea?: number;
  address?: string;
  createDt?: Date;
  systemBrand?: string;
  diaryFee?: number;
  telePhone?: string;
  reportUser?: any;
  state?: any;
  monthMoney?: number;
  location?: { lng: any; lat: any; address?: string };
}

interface Bill {
  _id?: string;
  order: any;
  money: number;
  isFrozen: boolean;
  createDt: Date;
  awardDt: Date;
  awardUser: any;
  isAdminView: boolean;
  isAwardUserView: boolean;
}

interface BangweiTicket {
  _id?: string;
  reduction: any;
  createDt: Date;
  user: any;
  active: true;
}

interface IMaterial {
  coupon_id?: number;
  created_at?: Date;
  home_image_url?: string;
  id?: number;
  share_image_url?: string;
  shop_phone?: string;
  shopuser_id?: number;
  ticket_image_url?: string;
  updated_at?: Date;
  reg_give?: boolean;
  can_share?: boolean;
  can_give_other?: boolean;
}


interface IUser {
  username: string;
  password: string;
}