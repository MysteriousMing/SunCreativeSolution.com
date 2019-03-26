
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatProject = nodeArr => {
  // h1 h2 分在一个 section 里 - .para-section
  // h2 之后, 下一个图片之前的 p 分在一个 section 里 .images-section
  let stTime = new Date()
  let newNodeArr = []
  let flag = 0
  let titleIndex = -1
  let subTitleIndex = -1
  let currentHeader = ''
  let currentHeaderNodes = []
  nodeArr.forEach(item => {
    let tagObj = {}
    switch (item.tagName.toLowerCase()) {
      case 'h1':
        titleIndex++
        subTitleIndex = -1
        // console.log('[+]H 1 -', item)
        tagObj.styleClass = 'para-section'
        tagObj.header = {
          name: item.textContent,
          nodes: [item],
          idx: `title-${titleIndex}`
        }
        tagObj.para = []
        currentHeader = item.textContwwent
        currentHeaderNodes = item
        newNodeArr.push(tagObj)
        flag++
        break
      case 'h2':
        subTitleIndex++
        // console.log('[+]H 2 -', item)
        if (flag === 0) {
          tagObj.styleClass = 'para-section'
          tagObj.header = {
            name: item.textContent,
            nodes: item,
            idx: `title-${titleIndex}`
          }
          tagObj.para = []
          newNodeArr.push(tagObj)
          flag++
        }
        let lastSection = newNodeArr[flag - 1]
        if (lastSection.styleClass === 'para-section' && lastSection.header) {
          if (!lastSection.subheader) {
            newNodeArr[flag - 1].subheader = {
              name: item.textContent,
              nodes: item,
              idx: `title-${titleIndex}-${subTitleIndex}`
            }
          } else {
            tagObj.styleClass = 'para-section'
            tagObj.header = {
              name: currentHeader,
              nodes: currentHeaderNodes
            }
            tagObj.subheader = {
              name: item.textContent,
              nodes: item,
              idx: `title-${titleIndex}-${subTitleIndex}`
            }
            tagObj.para = []
            newNodeArr.push(tagObj)
            flag++
          }
        } else {
          tagObj.styleClass = 'para-section'
          tagObj.header = {
            name: currentHeader,
            nodes: currentHeaderNodes
          }
          tagObj.subheader = {
            name: item.textContent,
            nodes: item,
            idx: `title-${titleIndex}-${subTitleIndex}`
          }
          tagObj.para = []
          newNodeArr.push(tagObj)
          flag++
        }
        break
      default:
        if (item.querySelectorAll('img').length > 0) {
          console.log('[+]Image -', item)
          let lastSection = newNodeArr[flag - 1] || null
          if (flag > 0 && lastSection && lastSection.styleClass === 'images-section') {
            newNodeArr[flag - 1].images.push(item)
          } else {
            tagObj.styleClass = 'images-section'
            tagObj.height = '500px'
            tagObj.images = [item]
            let imgUrl = item.querySelector('img').src
            // console.log(imgUrl)
            if (imgUrl) {
              loadImage(imgUrl).then(res => {
                tagObj.height = res.height
                tagObj.width = res.width
              })
            }
            newNodeArr.push(tagObj)
            flag++
          }
        } else if (item.textContent && item.textContent.indexOf('!&hr&!') >= 0) {
          newNodeArr.push(tagObj)
          flag++
        } else {
          let lastSection = newNodeArr[flag - 1]
          if (lastSection.styleClass === 'para-section' && item.textContent !== '') {
            newNodeArr[flag - 1].para.push(item)
          }
        }
        break
    }
  })

  console.log(new Date() - stTime)
  // 返回的结果不直接渲染进入 v-html, 而是在 v-for 里根据是图片还是文字进行分别的渲染
  return newNodeArr
}
const loadImage = function (imgUrl) {
  return new Promise(resolve => {
    // 创建对象
    let img = new Image()
    // 改变图片的src
    // console.log('URL = ', imgUrl)
    img.src = imgUrl
    // 定时执行获取宽高
    let check = function () {
      // 只要任何一方大于0
      // console.log('[Image Height]:', img.height || 0)
      // 表示已经服务器已经返回宽高
      if (img.width > 0 || img.height > 0) {
        // console.log('[Image Height]:', img.width, img.height)
        // clearInterval(set)
        resolve(img)
      }
    }
    check()
    // let set = setInterval(check, 1000)
  })
}
module.exports = {
  formatNumber: formatNumber,
  formatProject: formatProject,
  loadImage: loadImage,
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
