import { Component, OnInit } from "@angular/core";

// import {} from '../../'
@Component({
  selector: "app-module-page",
  templateUrl: "./module-page.component.html",
  styleUrls: ["./module-page.component.css"]
})
export class ModulePageComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  sortValue = null;
  sortKey = null;
  filterGender = [
    { text: "male", value: "male" },
    { text: "female", value: "female" }
  ];
  searchGenderList: string[] = [];

  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.searchData();
  }

  constructor() {}

  async searchData(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    let data = await this.getUsers(
      this.pageIndex,
      this.pageSize,
      this.sortKey,
      this.sortValue,
      this.searchGenderList
    );

    this.loading = false;
    this.total = 200;
    this.dataSet = data;
  }

  getUsers(...any) {
    return new Promise<any[]>(resolve =>
      setTimeout(_ => resolve([{ name: { first: "first", last: "last" } }]))
    );
  }
  updateFilter(value: string[]): void {
    this.searchGenderList = value;
    this.searchData(true);
  }

  ngOnInit(): void {
    this.searchData();
  }
}
