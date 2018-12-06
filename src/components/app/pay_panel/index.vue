<template>
  <div class="main" v-show="show_pay_panel">
    <div class="bkg"
         @click="closePanel"></div>
    <div class="panel-main">
      <div class="panel-title">请选择支付方式</div>
      <div class="payment balance-pay"
           @click="choosePayment(1)">
        <i class="pay-icon balance-icon">￥</i>
        <span class="pay-text">
          余额支付
          <span class="balance-num">(剩余：￥{{(balance/100).toFixed(2)}})</span>
          <span class="package-notice"
                v-show="!can_pay">充20得30</span>
        </span>
        <span class="go-charge"
              v-show="!can_pay">
          点击充值
          <img src="./img/icon/arrow_right_grey.png"
               alt="">
        </span>
        <span class="confirm-icon"
              :class="payment===1?'active':''"
              v-show="can_pay"></span>
      </div>
      <div class="payment wx-pay"
           @click="choosePayment(2)">
        <i class="pay-icon wx-icon"></i>
        <span class="pay-text">
          微信支付
        </span>
        <span class="confirm-icon"
              :class="payment===2?'active':''"></span>
      </div>
      <div class="pay-info">
        <p class="price-info">
          合计：<span class="price-num">￥{{(price/100).toFixed(2)}}</span>
        </p>
        <p class="pay-btn"
           @click="pay">确认支付</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'pay_panel',
  data () {
    return {
      payment: 2
    }
  },
  computed: {
    can_pay () {
      return this.balance >= this.price
    },
    show_pay_panel () {
      return this.$store.state.payPanel.show_pay
    },
    price () {
      return this.$store.state.payPanel.price_to_pay
    },
    balance () {
      return this.$store.state.payPanel.balance
    }
  },
  methods: {
    closePanel () {
      this.$store.commit('CLOSE_PAY_PANEL')
    },
    // 获取当前用户余额 存入vuex
    getBalance () {
      this.$store.dispatch('getBalance', 'thumb')
    },
    // 支付方式选择
    choosePayment (type) {
      if (type === 1 && !this.can_pay) {
        this.jump('charge')
        return
      }
      this.payment = type
    },
    // 支付方式判断
    pay () {
      if (this.payment === 1 && this.can_pay) {
        this.$store.dispatch('balancePay', {
          type: 'thumb',
          callback: () => {
            this.$router.push('/thunder/home')
            this.entryCollection()
          }
        })
      } else if (this.payment === 2) {
        this.$store.dispatch('wxPay', {
          type: 'thumb',
          callback: () => {
            this.$router.push('/thunder/home')
            this.entryCollection()
          }
        })
      }
    },
    // 微信支付
    jump (path) {
      this.$store.commit('CLOSE_PAY_PANEL')
      this.$router.push('/thunder/' + path)
    },
    entryCollection () {
      let entry = this.entry
      _hmt.push(['_trackEvent', '无限点赞总支付'])
      switch (entry) {
        case 'scan':
          _hmt.push(['_trackEvent', '无限点赞支付', '微信扫码进入', 'thunder'])
          break
        case 'banner':
          _hmt.push(['_trackEvent', '无限点赞支付', '公众号banner进入', 'thunder'])
          break
        case 'ibanner':
          _hmt.push(['_trackEvent', '无限点赞支付', '首页banner进入', 'thunder'])
          break
        case 'channel':
          _hmt.push(['_trackEvent', '无限点赞支付', 'icon进入', 'thunder'])
          break
        case 'heart':
          _hmt.push(['_trackEvent', '无限点赞支付', '点赞按钮进入', 'thunder'])
          break
        default :
          _hmt.push(['_trackEvent', '无限点赞支付', '其他方式', 'thunder'])
          break
      }
    }
  },
  created () {
    this.getBalance()
  },
  updated () {
    this.getBalance()
  }
}
</script>
<style lang="scss" scoped>
@keyframes lift-in {
  0% {
    bottom: -600px;
  }
  100% {
    bottom: 0;
  }
}

@keyframes backOpacity {
  0% {
    background: rgba(0, 0, 0, 0);
  }
  100% {
    background: rgba(0, 0, 0, 0.5);
  }
}

.main {
  z-index: 8000;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
}

.bkg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  animation: backOpacity 0.5s;
}

.panel-main {
  position: absolute;
  bottom: 0;
  width: 100%;
  border-radius: 4px 4px 0 0;
  background: #fff;
  animation: lift-in 0.5s;
}

.panel-title {
  display: flex;
  justify-content: center;
  align-items: center;
  @include px2rem(height, 128);
  @include px2rem(margin-bottom, 52);
  @include fontSize(16px);
  color: #333;
}

.payment {
  display: flex;
  align-items: center;
  @include px2rem(margin, 0 36);
  margin: 0 18px;
  &.balance-pay {
    @include px2rem(margin-bottom, 32);
    @include px2rem(padding-bottom, 52);
    border-bottom: 1px solid #ededed;
  }
  .pay-icon {
    @include px2rem(width, 38);
    @include px2rem(margin-right, 12);
  }
  .balance-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    @include px2rem(height, 38);
    border-radius: 100%;
    @include fontSize(14px);
    background: #f35b43;
    color: #fff;
  }
  .wx-icon {
    @include px2rem(height, 34);
    background: url('./img/icon/wx_pay_icon.png') no-repeat;
    background-size: contain;
  }
  .pay-text {
    display: flex;
    align-items: center;
    flex-grow: 1;
    @include fontSize(16px);
    color: #333;
    .balance-num {
      @include fontSize(12px);
      color: #666;
    }
    .package-notice {
      @include px2rem(margin-left, 8);
      @include px2rem(padding, 0 8);
      @include px2rem(border-radius, 100);
      border-bottom-left-radius: 0;
      @include fontSize(12px);
      color: #fff;
      background: linear-gradient(-90deg, #ff8c19 0%, #ff6d00 100%);
    }
  }
  .go-charge {
    /*flex-grow: 1;*/
    display: flex;
    justify-content: flex-end;
    align-items: center;
    @include fontSize(164x);
    color: #ff8c1a;
    img {
      @include px2rem(width, 16);
      @include px2rem(height, 24);
      @include px2rem(margin-left, 8);
    }
  }
  .confirm-icon {
    @include px2rem(width, 32);
    @include px2rem(height, 32);
    background: url('./img/icon/pay_not_choose.png') no-repeat;
    background-size: contain;
    &.active {
      background: url('./img/icon/pay_is_choose.png') no-repeat;
      background-size: 100%;
    }
  }
}

.pay-info {
  display: flex;
  @include px2rem(margin-top, 156);
  @include px2rem(height, 100);
  .price-info {
    display: flex;
    align-items: center;
    width: 70%;
    @include px2rem(padding-left, 36);
    @include fontSize(16px);
    color: #fff;
    background: #4a4a4a;
  }
  .price-num {
    color: #ff8c1a;
  }
  .pay-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    @include fontSize(16px);
    background: linear-gradient(-90deg, #ff8c19 0%, #ff6d00 100%);
    color: #fff;
    &.can-not-pay {
      background: #999;
    }
  }
}
</style>
