<template>
  <div class="main">
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
import Toast from '@/components/toast'
import weixin from '@/libs/app/weixin'
export default {
  name: 'pay_panel',
  data () {
    return {
      payment: 2,
      balance: 0
    }
  },
  props: {
    price: {
      type: Number,
      default: 0
    }
  },
  computed: {
    can_pay () {
      return this.balance >= this.price
    }
  },
  methods: {
    pay () {
      if (this.payment === 1 && this.can_pay) {
        // 调用余额支付接口
      } else if (this.payment === 2) {
        const openid = '122'
        const unionid = '122'
        weixin.wxPay(openid, unionid, this.wxPayCallback)
      }
    },
    choosePayment (type) { // 支付方式选择
      if (type === 1 && !this.can_pay) {
        this.jump('charge')
        return
      }
      this.payment = type
    },
    closePanel () {
      this.$emit('hidePanel')
    },
    getBalance () {
      // 调用获取余额接口
    },
    jump (path) {
      this.closePanel()
      this.$router.push('/thunder/' + path)
    },
    wxPayCallback (type) {
      let message = '支付成功'
      switch (type) {
        case 'fail':
          message = 'fail'
          break
        case 'cancel':
          message = 'cancel'
          break
        default:
          message = 'success'
      }
      Toast({
        message: message,
        position: 'middle'
      })
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
