import { Injectable } from '@angular/core';
import { FruitOrderState } from '../index';


@Injectable()
export class MockService {
    get admin() {
        return { nickname: 'admin', username: 'admin', password: '1234' };
    }
    adminLogin(username, password) {
        if (username == 'admin' && password == '1234') {
            return this.admin;
        } else {
            return false;
        }
    }
    getMainInfo() {
        return {}
    }
    getTodayOrders(): any[] {
        return [
            // 待确认
            { createDt: new Date(), product: { name: '边瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.UnConfirm, admin: '', address: '杭州西湖区古荔湾' },
            { createDt: new Date(), product: { name: '南瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.SendProduct, admin: '', address: '杭州西湖区古荔湾' },
            { createDt: new Date(), product: { name: '苹果' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.ReciveProduct, admin: '', address: '杭州西湖区古荔湾' },
            { createDt: new Date(), product: { name: '冬瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.Finish, admin: '', address: '杭州西湖区古荔湾' },
            { createDt: new Date(), product: { name: '西瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.UnConfirm, admin: '', address: '杭州西湖区古荔湾' },
            { createDt: new Date(), product: { name: '边瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.SendProduct, admin: '', address: '杭州西湖区古荔湾' },
            { createDt: new Date(), product: { name: '南瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.ReciveProduct, admin: '', address: '杭州西湖区古荔湾' },
            { createDt: new Date(), product: { name: '苹果' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.Finish, admin: '', address: '杭州西湖区古荔湾' },
            { createDt: new Date(), product: { name: '边瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.UnConfirm, admin: '', address: '杭州西湖区古荔湾' },
            { createDt: new Date(), product: { name: '南瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.SendProduct, admin: '', address: '杭州西湖区古荔湾' },
            { createDt: new Date(), product: { name: '苹果' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.ReciveProduct, admin: '', address: '杭州西湖区古荔湾' },
            { createDt: new Date(), product: { name: '冬瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.Finish, admin: '', address: '杭州西湖区古荔湾' },
            { createDt: new Date(), product: { name: '西瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.UnConfirm, admin: '', address: '杭州西湖区古荔湾' },
            { createDt: new Date(), product: { name: '边瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.SendProduct, admin: '', address: '杭州西湖区古荔湾' },
            { createDt: new Date(), product: { name: '南瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.ReciveProduct, admin: '', address: '杭州西湖区古荔湾' },
            { createDt: new Date(), product: { name: '苹果' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.Finish, admin: '', address: '杭州西湖区古荔湾' },
            { createDt: new Date(), product: { name: '边瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.UnConfirm, admin: '', address: '杭州西湖区古荔湾' },
            { createDt: new Date(), product: { name: '南瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.SendProduct, admin: '', address: '杭州西湖区古荔湾' },
            { createDt: new Date(), product: { name: '苹果' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.ReciveProduct, admin: '', address: '杭州西湖区古荔湾' },
            { createDt: new Date(), product: { name: '冬瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.Finish, admin: '', address: '杭州西湖区古荔湾' },
            { createDt: new Date(), product: { name: '西瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.UnConfirm, admin: '', address: '杭州西湖区古荔湾' },
            { createDt: new Date(), product: { name: '边瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.SendProduct, admin: '', address: '杭州西湖区古荔湾' },
            { createDt: new Date(), product: { name: '南瓜' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.ReciveProduct, admin: '', address: '杭州西湖区古荔湾' },
            { createDt: new Date(), product: { name: '苹果' }, num: 40, orderUser: { nickname: '用户甲' }, state: FruitOrderState.Finish, admin: '', address: '杭州西湖区古荔湾' },


        ];
    }
    listFruitUsers(): any[] {
        return [
            { nickname: '刺月无影', phone: '13419597065', bussiness: 29.6, state: '活跃', createDt: new Date() },
            { nickname: '刺月无影', phone: '13419597065', bussiness: 29.6, state: '活跃', createDt: new Date() },
            { nickname: '张三', phone: '13419597065', bussiness: 29.6, state: '活跃', createDt: new Date() },
            { nickname: '李四', phone: '13419597065', bussiness: 29.6, state: '活跃', createDt: new Date() },
            { nickname: '王五', phone: '13419597065', bussiness: 29.6, state: '活跃', createDt: new Date() },
            { nickname: '赵六', phone: '13419597065', bussiness: 29.6, state: '活跃', createDt: new Date() },
            { nickname: '莫问', phone: '13419597065', bussiness: 29.6, state: '活跃', createDt: new Date() },
            { nickname: '刺月无影', phone: '13419597065', bussiness: 29.6, state: '活跃', createDt: new Date() },
            { nickname: '刺月无影', phone: '13419597065', bussiness: 29.6, state: '活跃', createDt: new Date() },
            { nickname: '张三', phone: '13419597065', bussiness: 29.6, state: '活跃', createDt: new Date() },
            { nickname: '李四', phone: '13419597065', bussiness: 29.6, state: '活跃', createDt: new Date() },
            { nickname: '王五', phone: '13419597065', bussiness: 29.6, state: '活跃', createDt: new Date() },
            { nickname: '赵六', phone: '13419597065', bussiness: 29.6, state: '活跃', createDt: new Date() },
            { nickname: '莫问', phone: '13419597065', bussiness: 29.6, state: '活跃', createDt: new Date() },
        ]
    }
}