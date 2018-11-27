import { chttp, apis } from '../../libs/interfaces'

const payPanel = {
  state: {
    balance: 0,//账户余额
    show_pay: false,//支付弹窗
    price_to_pay: 0,//需要付费价格
    price_text: '',
    zz_num: 0,//主宰剩余赠送次数
    max_fee: 0,//套餐最大可支持价格
    order_id: '',//订单
  },
  mutations: {
    SHOW_PAY_PANEL(state, price) {
      state.show_pay = true
      state.price_to_pay = price
    },
    CLOSE_PAY_PANEL(state) {
      state.show_pay = false
      state.price_to_pay = 0
    },
    SAVE_VIP_BALANCE(state, balance) {
      state.balance = balance
    },
    SAVE_ZZ_NUM(state, zz_num) {
      state.zz_num = zz_num
    },
    SAVE_MAX_FEE(state, max_fee) {
      state.max_fee = max_fee
    },
    SAVE_ORDER_ID(state, order_id) {
      state.order_id = order_id
    }
  },
  actions: {
    /*
    获取账户余额信息
    */
    getBalance({state, commit, rootState}, type) {
      let openid = rootState.openid
      let unionid = rootState.unionid
      chttp.get(apis.balance, {openid: openid, unionid: unionid})
        .then(res => {
          commit('SAVE_VIP_BALANCE', res.balance || 0)
          commit('SAVE_ZZ_NUM', res.zz_num || 0)
          commit('SAVE_MAX_FEE', (res.right_max_fee || 0) / 100)
        }
      )
    },
    /*
    余额支付
    */
    balancePay({state, dispatch, commit, rootState}, data) {
      let openid = rootState.openid,
        unionid = rootState.unionid,
        url = '',
        p = '',
        params = {
          openid:openid,
          unionid:unionid
        };
      switch (data.type) {
        case 'zhuzai':
          url = apis.zhuzai_pay
          break
        case 'thumb':
          p = rootState.thumb.entry == 'scan'? 'scan' : rootState.thumb.entry == 'banner' ? 'banner' : 'gzh'
          url = apis.thumb_pay
          params.roomid = rootState.thumb.roomid
          params.p = p
          break
        default:
          break
      }
      chttp.post(url, params)
      .then(res => {
        commit('THUMB_PAYED',res.is_pay);
        if (res.is_pay === 1) {
          commit('CLOSE_PAY_PANEL');
          data.callback() === 'function' && data.callback();
        } else {
          dispatch('getBalance','thumb');
          commit('SHOW_ALERT_MODAL', res.errmsg)
        }
      }).catch(err => {
        commit('SHOW_ALERT_MODAL', '支付失败，请重试')
      })
    },
    /*
    **微信支付
    */
    wxPay({state, dispatch, commit, rootState}, data) {
      let openid = rootState.openid,
        unionid = rootState.unionid,
        url = '',
        p = '',
        params = {
          openid:openid,
          unionid:unionid
        };
      switch (data.type) {
        case 'zhuzai':
          url = apis.zhuzai_wpay
          break;
        case 'thumb':
          p = rootState.thumb.entry == 'scan'? 'scan' : rootState.thumb.entry == 'banner' ? 'banner' : 'gzh'
          url = apis.thumb_wpay
          params.roomid = rootState.thumb.roomid
          params.p = p
          break;
      }
      chttp.post(url, params)
      .then(res => {
        res.errcode = parseInt(res.errcode);
        if (res.errcode === 200) {
          state.order_id = res.oid;
          wx.chooseWXPay({
            timestamp: res.pay.jspay.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: res.pay.jspay.nonceStr, // 支付签名随机串，不长于 32 位
            package: res.pay.jspay.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: res.pay.jspay.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: res.pay.jspay.paySign, // 支付签名
            fail: function (res) {
              commit('SHOW_ALERT_MODAL', '支付失败')
            },
            success: function (res) {
              // 支付成功后的回调函数
              if (res.errMsg === "chooseWXPay:ok") {
                commit('THUMB_PAYED',1);
                commit('CLOSE_PAY_PANEL');
                data.callback() === 'function' && data.callback();
            }
            },
            cancel: function (res) {
              // 支付取消回调函数
              commit('SHOW_ALERT_MODAL', '支付取消')
            }
          });
        } else {
          commit('SHOW_ALERT_MODAL', res.errmsg)
        }
      });
    },
    /*
    **查单
    */
    queryOrder({state, commit, dispatch}, url) {
      let params = {
        order_id: state.order_id
      }
      //会员支付查单接口
      chttp.get(url, params)
      .then(res => {
        commit('THUMB_PAYED',res.is_pay);
        if (res.is_pay) {
          commit('CLOSE_PAY_PANEL');
          data.callback() === 'function' && data.callback();
        } else {
          setTimeout(() => {
            dispatch('queryOrder', url)
          }, 4000)
        }
      })
    },
  }
}

export default payPanel
