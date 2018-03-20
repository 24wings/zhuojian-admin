import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.component.html',
  styleUrls: ['./add-user-page.component.scss']
})
export class AddUserPageComponent implements OnInit {
  username: string;
  comment: string;
  phone: string;
  password: string;
  targetState: any = 0;
  constructor() { }

  ngOnInit() {
  }

}
