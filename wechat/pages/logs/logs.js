//logs.js
let util = require('../../utils/util')
let wechat = require('../../utils/wechat')
Page({
    data: {
        logs: []
    },
    onLoad: function () {
        return wechat.getStorage('logs')
            .then(logs => {
                this.setData({
                    logs: (logs || []).map(function (log) {
                        return util.formatTime(new Date(log))
                    })
                })
            })
    }
})
