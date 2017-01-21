//index.js
//获取应用实例

let wechat = require('../../utils/wechat');
let request = require('../../utils/fetch');
const app = getApp();
Page({
    data: {
        motto: 'Hello World',
        userInfo: {}
    },
    //事件处理函数
    bindViewTap: function () {

        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        console.log('onLoad')
        wx.clearStorageSync();
        //调用应用实例的方法获取全局数据
        wechat.getStorage('userInfo')
            .then((userInfo) => {
                this.setData({
                    userInfo: userInfo
                })
            }).catch(() => {
            this.login();
        });
        let params = {
            account: 13720057698,
            password: 'hxx123456'
        }
        wx.checkSession({
            success: (suc) => {
                console.log(suc)
            },
            fail: (err => {
                console.log(err)
            })
        })
        request.get('user/loginByPassword', params)
            .then((res) => {
                console.log(res);
            }).catch(err => console.log(err))
    },
    login(){
        return wechat.login()
            .then((res) => {
                console.log(res);
                return wechat.getUserInfo();
            }).then(res => {
                wechat.setStorage('userInfo', res.userInfo);
                this.setData({
                    userInfo: res.userInfo
                })
            })
    }
})
