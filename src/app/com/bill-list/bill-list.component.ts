import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-bill-list",
  templateUrl: "./bill-list.component.html",
  styleUrls: ["./bill-list.component.scss"]
})
export class BillListComponent implements OnInit {
  @Input() bills: any[] = [];
  constructor() {}

  ngOnInit() {}
}
