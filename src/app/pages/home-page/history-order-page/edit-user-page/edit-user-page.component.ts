import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.scss']
})
export class EditUserPageComponent implements OnInit {
  username: string;
  comment: string;
  phone: string;
  password: string;
  targetState: any = 0;
  constructor() { }

  ngOnInit() {
  }

}
