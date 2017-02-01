let wechat = require('../../utils/wechat')
let request = require('../../utils/fetch');
 let WxParse= require('../../wxParse/wxParse');

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
    let params={
      jobID:jobId,
      properties:'companyID$$firstJobFunc$$secondJobFunc' +
      '$$thirdJobFunc$$jobName$$workCharact$$jobLocation' +
      '$$jobMinSalary$$jobMaxSalary$$jobDesc$$jobTemptation$$' +
      'jobTemptationCustom$$jobCity$$location$$minDegree$$' +
      'minExp$$createTime$$updateTime$$jobType$$refreshTime$$' +
      'companyLogo$$companyShortName$$companyName$$companyProvince$$' +
      'companyCity$$companyDistrict$$companyAddress$$companyLocation$$' +
      'companyIndustry$$companyCharact$$companyScale$$companyStage$$companyWebsite'
    }

    request.get('member/detail/getJob',params)
            .then(res => {
              if (res.statusCode == 200) {
                let {data} =res;
                if (data.code == 200) {
                  this.setData({
                    job: data.data
                  })
                  let that =this;
                  WxParse.wxParse('article', 'html', data.data.jobDesc, that, 5);
                }
              }

            })
  }

})