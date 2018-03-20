/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare var wx: any;
declare var WeixinJSBridge: any;
interface Field {
  key: string;
  label: string;
  value: any;
  controlType: string;
  validators?: any;
}

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

interface Field {
  key: string;
  label: string;
  value: any;
  controlType: string;
  validators?: any;
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
  checked?: boolean;
}

interface BangweiUser {
  _id?: string;
  openid?: string;
  nickname?: string;
  createDt?: Date;
  checked?: boolean;
}
