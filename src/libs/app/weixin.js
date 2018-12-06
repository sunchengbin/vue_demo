import wx from 'weixin-js-sdk'
import {
  utils,
  apis,
  http,
  chttp
} from '@/libs/interfaces'
import store from '@/store'
import Cookies from 'js-cookie'
import Vue from 'vue'
const weixin = {
  // wxLoginUrl: '', // 授权登录url
  wxLoginUrl (page, query) {
    const appid = process.env.VUE_APP_APPID
    const loginUrl = process.env.VUE_APP_LOGINURL
    let queryString = ''
    for (const key in query) {
      queryString += key + '=' + query[key]
    }
    return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + loginUrl + '&response_type=code&scope=snsapi_userinfo&state=/' + page + '?' + queryString + '&connect_redirect=1#wechat_redirect'
    // return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + loginUrl + '&response_type=code&scope=snsapi_userinfo&state=/' + page + '?type=' + type + '&connect_redirect=1#wechat_redirect'
  },
  // 判断是否授权
  getOpenID (page, query, callback) {
    // 用户openid，只跟当前公众号相关
    let openid = utils.util.getUrlPrem('openid') || Cookies.get('openid') || store.state.openid
    // 用户unionid，用户唯一ID，不随公众号变化
    let unionid = utils.util.getUrlPrem('unionid') || Cookies.get('unionid') || store.state.unionid
    if (!openid || !unionid || unionid === 'null') {
      let redirectUrl = this.wxLoginUrl(page, query)
      const isWxWebView = this.isWxWebView()
      if (isWxWebView) {
        window.location.replace(redirectUrl)
      }
    } else {
      Cookies.set('openid', openid, {
        expires: 30
      })
      Cookies.set('unionid', unionid, {
        expires: 30
      })
      // utils.cookie.setCookie(openid, 30)
      // utils.cookie.setCookie(unionid, 30, 'tunionid')
      store.commit('SAVE_OPENID', openid)
      store.commit('SAVE_UNIONID', unionid)
    }
  },
  isWxWebView () {
    const arr = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)
    if (arr && arr.length > 0 && arr[0] === 'micromessenger') {
      return true
    } else {
      return false
    }
  },
  isXcxWebView () {
    return utils.util.getUrlPrem('browser') === 'xcx' || window.__wxjs_environment === 'miniprogram'
  },
  init (callback) {
    let req = {
      // 'action': 'js_signature',
      'type': 'thunder',
      'url': window.location.href.replace(/#.*$/, '')
    }
    // http.get(`${apis.initWx}?param=` + encodeURIComponent(JSON.stringify(req))).then(function (res) {
    http.get(apis.initWx, {
      params: req
    }).then(function (res) {
      try {
        wx.config({
          debug: false,
          appId: res.appId,
          timestamp: parseInt(res.timestamp),
          nonceStr: res.nonceStr,
          signature: res.signature,
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseImage', 'uploadImage', 'scanQRCode', 'startRecord', 'stopRecord', 'chooseWXPay', 'getLocation']
        })
        wx.ready(function () {
          console.log(7777)
          console.log('微信js初始化成功')
          callback && callback(res)
        })
        wx.error(res => {
          alert('微信js初始化失败')
          alert(JSON.stringify(res))
        })
      } catch (g) {
        alert(g)
      }
    }).catch(function (error) {
      console.log(error)
    })
  },
  updateShare (conf) {
    let settings = 'onMenuShareTimeline onMenuShareAppMessage'
    settings.split(' ').forEach(e => {
      try {
        wx[e](conf)
      } catch (g) {
        alert(g)
      }
    })
  },
  shareTimeLine (config) {
    wx.onMenuShareTimeline({
      title: config.title, // 分享标题
      link: config.link || window.location.href, // 分享链接
      imgUrl: '', // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    })
  },
  shareAppMessage (config) {
    wx.onMenuShareAppMessage({
      title: config.title, // 分享标题
      desc: config.desc, // 分享描述
      link: config.link || window.location.href, // 分享链接
      imgUrl: '', // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    })
  },
  previewImage (current, urls) {
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  chooseImage (num, callback) {
    wx.chooseImage({
      count: num, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        callback && callback(res)
      }
    })
  },
  uploadedImgs: [],
  uploadSuccessed: true,
  uploadImages (localIds, callback) {
    if (!localIds.length) return
    let localId = localIds.pop()
    let _this = this
    if (!_this.callback) {
      _this.callback = callback
    }
    wx.uploadImage({
      localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success (res) {
        let serverId = res.serverId
        _this.uploadedImgs.push(serverId)
        if (res.errMsg !== 'uploadImage:ok') {
          _this.uploadSuccessed = false
        }
        if (localIds.length > 0) {
          _this.uploadImages(localIds)
        } else {
          if (!_this.uploadSuccessed) return
          try {
            _this.callback(_this.uploadedImgs)
          } catch (e) {
            alert(e)
          }
        }
      }
    })
  },
  uploadImgsFn (num, callback) {
    let _this = this
    // 选图
    _this.chooseImage(num, (chooseRes) => {
      if (chooseRes.errMsg === 'chooseImage:ok') {
        _this.uploadImages(
          chooseRes.localIds,
          (uploadImages) => {
            _this.imgServerDownload(uploadImages, (downloadRes) => {
              callback(downloadRes)
            })
          })
      }
    })
  },
  imgServerDownload (uploadImages, callback) {
    // 服务器端图片下载
  },
  scanQRCode (callback) {
    wx.scanQRCode({
      desc: 'scanQRCode desc',
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
      success (res) {
        let result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
        callback && callback(result)
        alert(res.resultStr)
      }
    })
  },
  wxPay (parmas, data) {
    let url = apis.zhuzai_pay
    switch (data.type) {
      case 'zhuzai':
        url = apis.zhuzai_wpay
        break
      case 'thumb':
        url = apis.thumb_wpay
        break
      default:
        break
    }
    chttp.post(url, parmas).then(res => {
      console.log(res)
      res.errcode = parseInt(res.errcode)
      if (res.errcode === 200) {
        console.log(res.errmsg)
        store.state.order_id = res.oid
        wx.chooseWXPay({
          timestamp: res.pay.jspay.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: res.pay.jspay.nonceStr, // 支付签名随机串，不长于 32 位
          package: res.pay.jspay.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: res.pay.jspay.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: res.pay.jspay.paySign, // 支付签名
          fail: function (res) {
            Vue.$messageBox.alert('支付失败')
          },
          success: function (res) {
            // 支付成功后的回调函数
            if (res.errMsg === 'chooseWXPay:ok') {
              data.callback() === 'function' && data.callback()
            }
          },
          cancel: function (res) {
            // 支付取消回调函数
            Vue.$messageBox.alert('支付取消')
          }
        })
      } else {
        console.log(res.errmsg)
        Vue.$messageBox.alert(res.errmsg)
      }
    })
  },
  startRecord (e) {
    console.log(e)
    wx.startRecord()
  },
  stopRecord (_this) {
    console.log(wx.stopRecord, _this.setWord())
    wx.stopRecord({
      success (res) {
        return wx.translateVoice({
          localId: res.localId, // 需要识别的音频的本地Id，由录音相关接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            console.log(res.translateResult, 'res.translateResult')
            _this.setWord(res.translateResult)
          },
          fail: function () {
            alert('识别失败')
          }
        })
      }
    })
  },
  getLocation (that) {
    // const pointAdd = new BMap.Point(116.404, 39.915)
    // const gc = new BMap.Geocoder()
    // gc.getLocation(pointAdd, (rs) => {
    //   const city = rs.addressComponents.city
    //   console.log(city)
    // })
    wx.getLocation({
      type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: function (res) {
        console.log(res)
        that.latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
        that.longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
        // 参考文档http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a7b27
        const pointAdd = new BMap.Point(res.longitude, res.latitude)
        const gc = new BMap.Geocoder()
        gc.getLocation(pointAdd, (rs) => {
          const city = rs.addressComponents.city
          if (city.charAt(city.length - 1) === '市') {
            that.location_city = city.substring(0, city.length - 1)
          } else {
            that.location_city = city
          }
          localStorage.setItem('location_city', that.location_city)
          if (that.key || that.city) {
            let data = {
              p: that.p,
              ps: that.ps,
              city: that.city,
              latitude: that.latitude,
              longitude: that.longitude,
              location_city: that.location_city,
              key: that.key ? that.key : '',
              openid: that.openid
            }
            chttp.get(apis.dpStore, {
              params: data
            }).then(res => {
              that.showLoad = false
              if (res.store.length < that.ps) {
                that.isRefresh = false
                that.showTitle = !that.showTitle
              }
              that.store = res.store
              that.showLoad = false
            })
            return
          }
          let data2 = {
            p: that.p,
            city: that.city,
            latitude: that.latitude,
            longitude: that.longitude,
            location_city: that.location_city,
            key: that.key ? that.key : '',
            openid: that.openid
          }
          chttp.get(apis.dpStore, data2).then(res => {
            that.showLoad = false
            if (res.store.length < this.ps) {
              that.isRefresh = false
              that.showTitle = !that.showTitle
            }
            that.store = res.store
            that.showLoad = false
          })
        })
      },
      fail: function (res) {
        alert(res)
      }
    })
  }
}

export default weixin
