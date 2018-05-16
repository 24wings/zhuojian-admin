import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LibModule } from "./lib";
import { NgZorroAntdModule, NzLayoutModule } from "ng-zorro-antd";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UnconfirmOrderComponent } from "./pages/home-page/order-detail-page/unconfirm-order/unconfirm-order.component";
import { SendProductOrderComponent } from "./pages/home-page/order-detail-page/send-product-order/send-product-order.component";
import { ReciveProductOrderComponent } from "./pages/home-page/order-detail-page/recive-product-order/recive-product-order.component";
import { FinishOrderComponent } from "./pages/home-page/order-detail-page/finish-order/finish-order.component";

import { WechatPageComponent } from "./pages/wechat-page/wechat-page.component";
import { WechatButtonPageComponent } from "./pages/wechat-button-page/wechat-button-page.component";
import { FormListComponent } from "./com/form-list/form-list.component";
import { StrKeyPipe } from "./pipe/str-key.pipe";
import { AutoFormComponent } from "./com/auto-form/auto-form.component";
import { FormCreateComponent } from "./com/form-create/form-create.component";
import { FormUpdateComponent } from "./com/form-update/form-update.component";
import { OrderStateComponent } from "./com/order-state/order-state.component";


import { RolePageComponent } from './pages/home-page/role-page/role-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,

    UnconfirmOrderComponent,
    SendProductOrderComponent,
    ReciveProductOrderComponent,
    FinishOrderComponent,


    WechatPageComponent,
    WechatButtonPageComponent,
    FormListComponent,
    StrKeyPipe,
    AutoFormComponent,
    FormCreateComponent,
    FormUpdateComponent,
    OrderStateComponent,

    RolePageComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    LibModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "/admin/login", pathMatch: "full" },
      { path: "admin/login", component: LoginPageComponent },
      {
        path: "admin",
        component: HomePageComponent,
        children: [{
          path: 'system/role',
          component: RolePageComponent
        }]

      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
