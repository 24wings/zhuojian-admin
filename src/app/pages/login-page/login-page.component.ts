import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PcClientService } from "../../lib";
@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  validateForm: FormGroup;
  shop_id: string = "";
  password: string = "";
  constructor(
    private fb: FormBuilder,
    public pcClient: PcClientService,
    public router: Router
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
  async login() {
    let result = await this.pcClient.login(this.shop_id, this.password);
    console.log(result);
    if (result) {
      localStorage.setItem("shop_id", this.shop_id);
      this.router.navigateByUrl("/admin");
    }
  }
}
