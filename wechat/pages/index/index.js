//index.js
//获取应用实例

let wechat = require('../../utils/wechat');
let request = require('../../utils/fetch');
let util =require('../../utils/util')
const app = getApp();
const serverUrl= 'https://mobile-application.mofanghr.com/offline/onsite-jobs/search';
Page({
    data: {
        motto: 'Hello World',
        lists:[]
    },
    //事件处理函数
    bindViewTap: function () {

        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        console.log('onLoad')
//      wx.clearStorageSync();
        //调用应用实例的方法获取全局数据
        wechat.getStorage('mfUserInfo')
            .then((userInfo) => {
                this.setData({
                    userInfo: userInfo
                })
            }).catch(() => {
            this.login();
        });
        this.getList()

   },
  getList(){
      let params={
        start:0,
        count:20,
        province:'北京',
        cicyCode:'03'
      }
      let  that =this;
   wx.request({
     url:`${serverUrl}?${util.query(params)}`,
     type:'GET',
     header: {'Content-Type': 'application/x-www-form-urlencoded'},
     success:function (res) {
       console.log(res)
       let {data} =res;
       that.setData({
         'lists':data
       })
     }
   })
  },
    login(){
      let params = {
        account: 13720057698,
        password: 'hxx123456'
      }

      request.get('user/loginByPassword', params)
              .then((res) => {
                console.log(res);
                if(res.statusCode==200){
                  let {data} =res;
                  if(data.code==200){
                    wechat.setStorage('mfUserInfo',data.data)

                  }


                }
              }).catch(err => console.log(err))
    }
})
