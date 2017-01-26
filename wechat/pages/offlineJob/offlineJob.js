let wechat = require('../../utils/wechat')
const serverUrl = 'https://mobile-application.mofanghr.com/offline/job-detail/';

Page({
  data: {
    job: {}
  },
  onLoad(query){
    console.log(query);
    let {jobId, jobTitle} = query;

    wx.setNavigationBarTitle({
      title: jobTitle
    });
    this.getJob(jobId)
  },
  getJob(jobId){
    let that = this;
    wx.request({
      url: `${serverUrl}${jobId}`,
      type: 'GET',
      header: {'Content-Type': 'application/x-www-form-urlencoded'},
      success: function (res) {
        console.log(res)
        let {data} = res;
        that.setData({
          'job': data
        })
      }
    })
  }

})