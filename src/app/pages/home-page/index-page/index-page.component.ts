import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit, AfterViewInit {
  mode: string = 'all';
  data = [
    {
      key: '1',
      name: '小苹果',
      age: 5000,
      address: 128,
    }, {
      key: '2',
      name: '黄金梨',
      age: 5000,
      address: 128,
    }, {
      key: '3',
      name: '榴莲',
      age: 5000,
      address: 128,
    }
  ];
  circleData = [
    { item: '西瓜', count: 40 },
    { item: '苹果', count: 21 },
    { item: '香蕉', count: 17 },
    { item: '李子', count: 13 },
    { item: '其他', count: 9 }
  ];
  tabs: any[] = [];
  constructor() { }
  sorts: { count: number, name: string }[] = [
    { name: '火龙果', count: 323.234 },
    { name: '黄金梨', count: 323.234 },
    { name: '碧根果', count: 323.234 },
    { name: '小苹果', count: 323.234 },
    { name: '编不出来了', count: 323.234 },
    { name: '编不出来了', count: 323.234 },
    { name: '编不出来了', count: 323.234 },
    { name: '编不出来了', count: 323.234 },
    { name: '编不出来了', count: 323.234 },


  ]

  ngOnInit() {
    this.renderCircle();
  }

  ngAfterViewInit() {
    this.renderBishu();
    this.renderVisit();
    this.renderWeek();
    this.renderMonth();
  }
  renderVisit() {
    const data = [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 }
    ];
    const chart = new G2.Chart({
      container: 'mountNode',
      forceFit: true,
      height: '200'
    });
    chart.source(data);
    chart.scale('value', {
      min: 0
    });
    chart.scale('year', {
      range: [0, 1]
    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.line().position('year*value');
    chart.point().position('year*value').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    chart.render();

  }

  renderBishu() {
    const data = [
      { year: '1951 年', sales: 38 },
      { year: '1952 年', sales: 52 },
      { year: '1956 年', sales: 61 },
      { year: '1957 年', sales: 145 },
      { year: '1958 年', sales: 48 },
      { year: '1959 年', sales: 38 },
      { year: '1960 年', sales: 38 },
      { year: '1962 年', sales: 38 },
    ];
    const chart = new G2.Chart({
      container: 'bishu',
      forceFit: true,
      height: 250
    });
    chart.source(data);
    chart.scale('sales', {
      tickInterval: 20
    });
    chart.interval().position('year*sales');
    chart.render();
    const chart2 = new G2.Chart({
      container: 'bishu2',
      forceFit: true,
      height: 250
    });
    chart2.source(data);
    chart2.scale('sales', {
      tickInterval: 20
    });
    chart2.interval().position('year*sales');
    chart2.render();

  }

  initChart3() {
    const data = [
      { year: '1951 年', sales: 38 },
      { year: '1952 年', sales: 52 },
      { year: '1956 年', sales: 61 },
      { year: '1957 年', sales: 145 },
      { year: '1958 年', sales: 48 },
      { year: '1959 年', sales: 38 },
      { year: '1960 年', sales: 38 },
      { year: '1962 年', sales: 38 },
    ];
    const chart3 = new G2.Chart({
      container: 'bishu3',
      forceFit: true,
      height: 250
    });
    chart3.source(data);
    chart3.scale('sales', {
      tickInterval: 20
    });
    chart3.interval().position('year*sales');
    chart3.render();

  }
  renderWeek() {
    const data = [
      { year: '1991', value: 15468 },
      { year: '1992', value: 16100 },
      { year: '1993', value: 15900 },
      { year: '1994', value: 17409 },
      // { year: '1995', value: 17000 },
      // { year: '1996', value: 31056 },
      // { year: '1997', value: 31982 },
      // { year: '1998', value: 32040 },
      // { year: '1999', value: 33233 }
    ];
    const chart = new G2.Chart({
      container: 'week',
      forceFit: true,
      height: 200
    });
    chart.source(data);
    chart.scale({
      value: {
        min: 10000
      },
      year: {
        range: [0, 1]
      }
    });
    chart.axis('value', {
      label: {
        formatter: val => {
          return (val / 10000).toFixed(1) + 'k';
        }
      }
    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.area().position('year*value');
    chart.line().position('year*value').size(2);
    chart.render();
  }
  renderMonth() {
    const data = [
      { year: '1991', value: 15468 },
      { year: '1992', value: 16100 },
      { year: '1993', value: 15900 },
      { year: '1994', value: 17409 },
      // { year: '1995', value: 17000 },
      // { year: '1996', value: 31056 },
      // { year: '1997', value: 31982 },
      // { year: '1998', value: 32040 },
      // { year: '1999', value: 33233 }
    ];
    const chart = new G2.Chart({
      container: 'month',
      forceFit: true,
      height: 200
    });
    chart.source(data);
    chart.scale({
      value: {
        min: 10000
      },
      year: {
        range: [0, 1]
      }
    });
    chart.axis('value', {
      label: {
        formatter: val => {
          return (val / 10000).toFixed(1) + 'k';
        }
      }
    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.area().position('year*value');
    chart.line().position('year*value').size(2);
    chart.render();
  }
  renderCircle() {
    const { DataView } = window['DataSet'];
    const data = [
      { item: '西瓜', count: 40 },
      { item: '苹果', count: 21 },
      { item: '香蕉', count: 17 },
      { item: '李子', count: 13 },
      { item: '其他', count: 9 }
    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent'
    });
    const chart = new G2.Chart({
      container: 'circle',
      forceFit: true,
      height: 300,
    });
    chart.source(dv, {
      percent: {
        formatter: val => {
          val = (val * 100) + '%';
          return val;
        }
      }
    });
    chart.coord('theta', {
      radius: 0.75
    });
    chart.tooltip({
      showTitle: false,
      itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
    });
    chart.intervalStack()
      .position('percent')
      .color('item')
      .label('percent', {
        formatter: (val, item) => {
          return item.point.item + ': ' + val;
        }
      })
      .tooltip('item*percent', (item, percent) => {
        percent = percent * 100 + '%';
        return {
          name: item,
          value: percent
        };
      })
      .style({
        lineWidth: 1,
        stroke: '#fff'
      });
    chart.render();
  }
}
