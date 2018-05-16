import { NgModule, ModuleWithProviders } from "@angular/core";
// import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from "@angular/router";
import { HttpModule, JsonpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import {
  CommonService,
  ConfigService,
  ApiService,
  DbService,
  WechatService,
  ShopClientService,
  FxService,
  PcClientService
} from "./service";
// import { MoneyPipe, ArrTruePipe } from './pipe';
import { BackDirective, BgImgDirective } from "./directive";
import { TitleComponent } from "./com/title/title.component";
import { TransitionComponent } from "./com/transition/transition.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ImageViewerDirective } from "./directive/image-viewer.directive";
import { AdminService } from "./service/admin.service";
import { AppFruitService } from "./service/app-fruit.service";
import { MockService } from "./service/mock.service";
import { CommonModule } from "@angular/common";
import { FenxiaoAdminService } from "./service";
import { LocationComponent } from "./com/location/location.component";
import { RestService } from "./service/rest.service";
import { BangweiTestService } from "./service/bangwei-test.service";
import { MyHttpService } from "./service/http.service";
// import { FormListComponent } from './com/form-list/form-list.component';

@NgModule({
  imports: [
    // BrowserModule,
    RouterModule,
    HttpModule,
    FormsModule,
    JsonpModule,
    // CommonModule,
    BrowserAnimationsModule
  ],
  declarations: [
    TitleComponent,
    TransitionComponent,
    BgImgDirective,
    BackDirective,
    ImageViewerDirective,
    LocationComponent
    // FormListComponent
  ],
  exports: [
    // BrowserModule,
    // RouterModule,
    LocationComponent,
    HttpModule,
    FormsModule,
    JsonpModule,
    TitleComponent,
    TransitionComponent,
    BgImgDirective,
    BackDirective,
    ImageViewerDirective
    // FormListComponent
  ],
  providers: [
    ConfigService,
    ApiService,
    CommonService,
    DbService,
    WechatService,
    AdminService,
    // MoneyPipe,
    // ArrTruePipe,
    BackDirective,
    BgImgDirective,
    AppFruitService,
    ImageViewerDirective,
    MockService,
    FenxiaoAdminService,
    RestService,
    FxService,
    ShopClientService,
    BangweiTestService,
    MyHttpService
  ]
})
export class LibModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LibModule,
      providers: [
        ConfigService,
        ApiService,
        CommonService,
        DbService,
        WechatService,
        // MoneyPipe,
        // ArrTruePipe,
        BackDirective,
        BgImgDirective,
        ImageViewerDirective,
        MockService,
        RestService,
        ShopClientService,
        FxService,
        BangweiTestService,
        PcClientService,
        MyHttpService
      ]
    };
  }
}
