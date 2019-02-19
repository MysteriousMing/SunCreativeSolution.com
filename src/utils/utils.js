
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
module.exports = {
  formatNumber: formatNumber,
  getMonthEnArr () {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  },
  formatDateToItem (date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    const week = date.getDay()
    const ENMonthArr = this.getMonthEnArr()
    const ENMonth = ENMonthArr[month - 1]
    let weekName = ''
    switch (week) {
      case 0: weekName = '星期日'; break
      case 1: weekName = '星期一'; break
      case 2: weekName = '星期二'; break
      case 3: weekName = '星期三'; break
      case 4: weekName = '星期四'; break
      case 5: weekName = '星期五'; break
      case 6: weekName = '星期六'; break
      default: break
    }
    // console.log('ENMonth', ENMonth)
    return {year, month, day, hour, minute, second, weekName, ENMonth}
  },
  formatDate (date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return [year, month, day].map(formatNumber).join('-')
  }

}
