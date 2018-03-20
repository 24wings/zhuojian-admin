import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from '../../lib';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  validateForm: FormGroup;
  constructor(private fb: FormBuilder, public config: ConfigService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }
  async login() {
    let result = await this.config.fruit.adminLogin(this.validateForm.value.userName, this.validateForm.value.password);
    console.log(result);
    if (result) {
      this.config.router.navigateByUrl('/admin');
    }

  }

}
