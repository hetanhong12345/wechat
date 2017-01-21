//app.js
let wechat = require('./utils/wechat')
App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据

        wechat.getStorage('logs')
            .then(res => {
                res.unshift(Date.now());
                wechat.setStorage('logs', res);
            }).catch(() => {
            wechat.setStorage('logs', [Date.now()]);
        })


    },

    globalData: {
        userInfo: null
    }
})