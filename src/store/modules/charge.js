import { http, apis } from '../../libs/interfaces'
import router from '../../router'

const charge = {
  state: {
    //套餐信息
    charge_packages: [
      {
        "id": 0,
        "pay_fee": '0',
        "give_fee": 0,
      },
      {
        "id": 1,
        "pay_fee": 0,
        "give_fee": 0
      }
      ,
      {
        "id": 2,
        "pay_fee": 0,
        "give_fee": 0
      }
    ],
    //特权信息
    rights: [],
    //特权限制描述
    rights_desc: '',
    //订单号
    order_id: ''
  },
  mutations: {
    SAVE_CHARGE_PACKAGE(state, data) {
      state.charge_packages = data
    },
    SAVE_CHARGE_RIGHTS(state, rights) {
      state.rights = rights
    },
    SAVE_RIGHTS_DESC(state, desc) {
      state.rights_desc = desc
    },
    SAVE_ORDER_ID(state, orderID) {
      state.order_id = orderID
    }
  },
  actions: {
    //获取充值套餐信息
    getChargePackage({state, commit, rootState}) {
      ajax.get('https://coupon.ktvsky.com/vod/coupon/price', {}, 'other').then(res => {
        ajax.errCodeFun(res);
        if (res.price && res.price.length > 0) {
          commit('SAVE_CHARGE_PACKAGE', res.price)
        }
      })
    },
    //购买充值服务
    charge({state, commit, dispatch, rootState}, packageID) {
      let params = {
          openid: rootState.openid,
          unionid: rootState.unionid,
          id: packageID
      };
      ajax.post('https://coupon.ktvsky.com/vod/coupon/order', params, 'other')
      .then(res => {
          res.errcode = parseInt(res.errcode);
          if (res.errcode === 200) {
            commit('SAVE_ORDER_ID', res.oid);
            //将后台返回的信息，注入微信支付API中，唤起微信支付
            wx.chooseWXPay({
              timestamp: res.pay.jspay.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: res.pay.jspay.nonceStr, // 支付签名随机串，不长于 32 位
              package: res.pay.jspay.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
              signType: res.pay.jspay.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: res.pay.jspay.paySign, // 支付签名
              appId: res.pay.appId,
              fail: function (res) {
                commit('SHOW_ALERT_MODAL', '支付失败')
              },
              success: function (res) {
                // 支付成功后的回调函数
                if (res.errMsg === "chooseWXPay:ok") {
                    dispatch('queryOrder');
                }
              },
              cancel: function (res) {
                commit('SHOW_ALERT_MODAL', '取消支付')
                // 支付取消回调函数
              }
          });
        } else {
          commit('SHOW_ALERT_MODAL', res.errmsg)
        }
      });
    },
    //查单
    queryOrder({state, commit, dispatch}) {
      let params = {
        order_id: state.order_id
      }
      //会员支付查单接口
      ajax.get('https://coupon.ktvsky.com/vod/coupon/order', params, 'other')
      .then(res => {
        if (res.is_pay) {
            commit('getBalance')
            router.push('/thunder/customer')
        } else {
            setTimeout(() => {
              dispatch('queryOrder')
            }, 4000)
        }
      }, function (res) {
        commit('SHOW_ALERT_MODAL', res.errmsg)
      })
    }
  }
}

export default charge
