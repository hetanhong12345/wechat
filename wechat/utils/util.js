function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function query(obj) {
  let result=[];
  for(let key in obj){
    result.push(`${key}=${encodeURIComponent(obj[key])}`);
  }
  return result.join('&');
}
module.exports = {
  formatTime,query
}
