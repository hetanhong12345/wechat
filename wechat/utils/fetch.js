const Promise = require('./bluebird');
const URL = 'https://web-application.mofanghr.com/';

/**
 * 抓取远端API的结构
 * https://developers.douban.com/wiki/?title=movie_v2
 * @param  {String} api    api 根地址
 * @param  {String} path   请求路径
 * @param  {Objece} params 参数
 * @return {Promise}       包含抓取任务的Promise
 */
let get = (path, params, data) => {
    let query = encodeURIComponent(JSON.stringify(params));
    return new Promise((resolve, reject) => {
        wx.request({
            type: 'GET',
            url: `${URL}/${path}.json?&params=${query}`,
            data: Object.assign({}, data),
            header: {'Content-Type': 'application/x-www-form-urlencoded'},
            success: (res)=>{
                resolve(res)
            },
            fail: reject
        })
    })
}
let post = (path, params, data) => {
    let query = encodeURIComponent(JSON.stringify(params));
    return new Promise((resolve, reject) => {
        wx.request({
            type: 'POST',
            url: `${URL}/${path}.json?platform=1201&version=2.2.0&params=${query}`,
            data: Object.assign({}, data),
            header: {'Content-Type': 'application/x-www-form-urlencoded'},
            success: resolve,
            fail: reject,

        })
    })
}
module.exports = {
    get,
    post
}