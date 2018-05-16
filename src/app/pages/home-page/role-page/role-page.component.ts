import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role-page',
  templateUrl: './role-page.component.html',
  styleUrls: ['./role-page.component.css']
})
export class RolePageComponent implements OnInit {
  allChecked = false;
  indeterminate = true;
  checkOptionsOne = [
    { label: 'Apple', value: 'Apple', checked: true },
    { label: 'Pear', value: 'Pear', checked: false },
    { label: 'Orange', value: 'Orange', checked: false }
  ];
  module_ids: number[] = [1, 2, 3, 4, 9, 10]
  groups: { id: number, name: string, children: { id: number, name: string }[] }[] = [
    { id: 1, name: '系统管理', children: [{ id: 2, name: '角色管理' }, { id: 3, name: '栏目管理' }, { id: 4, name: '管理人员' }] },
    { id: 5, name: '系统参数', children: [{ id: 6, name: '城市列表' }, { id: 7, name: '行业列表' }, { id: 8, name: '职业列表' }] },
    { id: 9, name: '资讯管理', children: [{ id: 10, name: '资讯分类' }, { id: 11, name: '评论管理' }, { id: 12, name: '审批文章' }, { id: 13, name: '文章统计' }] },
  ];

  get storeOptions() {
    return this.groups.map(group => {
      return {
        indeterminate: false, checkAll: false, id: group.id, name: group.name, children: group.children.map(child => {
          return { label: child.name, value: child.id, id: child.id, name: child.name, checked: this.module_ids.includes(child.id) }
        })
      }
    })
  }
  groupOptions: {
    id: number, indeterminate: boolean, name: string, checkAll: boolean,
    children: { id: number, name: string, label: string, value: number, checked: boolean }[]
  }[] = this.groups.map(group => {
    return {
      indeterminate: false, checkAll: false, id: group.id, name: group.name, children: group.children.map(child => {
        return { label: child.name, value: child.id, id: child.id, name: child.name, checked: this.module_ids.includes(child.id) }
      })
    }
  })
  updateAllChecked(group): void {
    group.indeterminate = false;
    if (group.children.every(group => group.checked)) {
      group.children.forEach(item => item.checked = false);
      group.checkAll = false;
    } else {
      group.children.forEach(item => item.checked = true);
      group.checkAll = true;
    }
  }

  updateSingleChecked(group): void {
    if (group.children.every(group => group.checked) || group.children.every(group => !group.checked)) {
      group.checkAll = group.children.every(group => group.checked);
      group.indeterminate = false;
    } else {
      group.indeterminate = true;

    }
  }
  reset() {
    this.groupOptions = this.storeOptions;
  }
  constructor() { }

  ngOnInit() {
  }

}
