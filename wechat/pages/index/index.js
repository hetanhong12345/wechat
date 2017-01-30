//index.js
//获取应用实例

let wechat = require('../../utils/wechat');
let request = require('../../utils/fetch');
let util = require('../../utils/util')
const app = getApp();
const serverUrl = 'https://mobile-application.mofanghr.com/offline/onsite-jobs/search';
let jobList = [{
  code: '01',
  name: '技术'
}, {
  code: '02',
  name: '产品'
}, {
  code: '03',
  name: '设计'
}, {
  code: '04',
  name: '运营'
}, {
  code: '05',
  name: '销售'
}, {
  code: '06',
  name: '市场'
}, {
  code: '08',
  name: '金融'
}]
Page({
  data: {
    hidden: true,
    pickerHidden: true,
    lists: [],
    jobList,
    currentValue: {
      code: '01',
      name: '技术'
    }

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
  getList(job){
    let params = {
      page: 0,
      size: 15,
      firstJobCode: '01',
      appKey: 'web',
      properties: 'updateTime$$companyLogo$$jobID$$jobName$$jobMinSalary$$jobMaxSalary$$workCharact$$jobLocation$$jobCity$$location$$minDegree$$minExp$$companyName$$companyID$$companyIndustry$$companyCharact$$companyScale'
    }
    if (job && job.code) {
      params.firstJobCode = job.code;
    }
    this.setData({
      hidden: false
    })
    request.get('job/getListByFirstJobFunc', params)
            .then(res => {
              console.log(res)
              if (res.statusCode == 200) {
                let {data} =res;
                if (data.code == 200) {
                  this.setData({
                    lists: data.data.jobList,
                    hidden: true
                  })
                }
              }
            }).catch(err => {
      this.setData({
        error: JSON.stringify(err)
      })
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
              if (res.statusCode == 200) {
                let {data} =res;
                if (data.code == 200) {
                  wechat.setStorage('mfUserInfo', data.data)

                }


              }
            }).catch(err => console.log(err))
  },

  bindChange(event){
    console.log(event.currentTarget.dataset);
    let {job} = event.currentTarget.dataset;
    this.setData({
      currentValue: job
    });
    this.getList(job);


  },
  //列表点击
  jobTap: function (event) {

    console.log(event.currentTarget.dataset);
    let {jobId, jobTitle} = event.currentTarget.dataset;
    wx.navigateTo({
      url: `../onlineJob/onlineJob?jobId=${jobId}&jobTitle=${jobTitle}`
    })
  },
  ensure(){
    console.log(this.data.currentValue);

  }
})
