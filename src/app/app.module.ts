import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LibModule } from "./lib";
import {
  NgZorroAntdModule,
  NzLayoutModule,
  NzTableModule,
  NzFormModule,
  NzInputModule,
  NzCardModule,
  NzCheckboxModule,
  NzUtilModule
} from "ng-zorro-antd";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { WechatPageComponent } from "./pages/wechat-page/wechat-page.component";
import { WechatButtonPageComponent } from "./pages/wechat-button-page/wechat-button-page.component";
import { FormListComponent } from "./com/form-list/form-list.component";
import { StrKeyPipe } from "./pipe/str-key.pipe";
import { AutoFormComponent } from "./com/auto-form/auto-form.component";
import { FormCreateComponent } from "./com/form-create/form-create.component";
import { FormUpdateComponent } from "./com/form-update/form-update.component";


import { RolePageComponent } from "./pages/home-page/role-page/role-page.component";
import { ModulePageComponent } from "./pages/home-page/module-page/module-page.component";
import { MaterialPageComponent } from "./pages/home-page/material-page/material-page.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,


    WechatPageComponent,
    WechatButtonPageComponent,
    FormListComponent,
    StrKeyPipe,
    AutoFormComponent,
    FormCreateComponent,
    FormUpdateComponent,

    RolePageComponent,

    ModulePageComponent,

    MaterialPageComponent
  ],
  imports: [
    NzCardModule,

    NzCheckboxModule,
    NzFormModule,
    HttpClientModule,
    FormsModule,
    NzInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    LibModule.forRoot(),
    BrowserModule,
    NzTableModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "/admin/login", pathMatch: "full" },
      { path: "admin/login", component: LoginPageComponent },
      {
        path: "admin",
        component: HomePageComponent,
        children: [
          {
            path: "system/role",
            component: RolePageComponent
          },
          {
            path: "system/module",
            component: ModulePageComponent
          },
          {
            path: "system/material",
            component: MaterialPageComponent
          }
        ]
      }
    ])
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
