
let wechat =require('../../utils/wechat')
Page({
  data:{
    name:'hkk',
    userInfo:{}
  },
  onLoad(){
    wechat.getStorage('mfUserInfo')
          .then((userInfo) => {
            this.setData({
              userInfo: userInfo
            })
          }).catch(() => {
         this.setData('name','未登录')    ;


    });
  }

})