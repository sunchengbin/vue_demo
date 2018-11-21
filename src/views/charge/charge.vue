<template>
  <div class="main">
    <div class="card"
         :class="'daker-' + choosed_index">
      <p class="title">
        <span class="logo"></span>
        <!--<span class="text">-->
        <!--历史订单-->
        <!--<i class="right-arrow"></i>-->
        <!--</span>-->
      </p>
      <div class="price-show">
        <div class="charge-price price-section">
          <p class="price-num">{{charge_price}}</p>
          <p class="price-explain">充值</p>
        </div>
        <p class="symbol">+</p>
        <div class="gift-price price-section">
          <p class="price-num">{{gift_price}}</p>
          <p class="price-explain six-words">赠送特权价值</p>
        </div>
        <p class="symbol">=</p>
        <div class="total-price price-section">
          <p class="price-num">{{total_price}}</p>
          <p class="price-explain three-words">总价值</p>
        </div>
      </div>
      <!--<div class="bottom-num">-->
      <!--<p>我的余额：{{balance}}元</p>-->
      <!--<p class="discount">-->
      <!--<span class="discount-num">{{discount_num}}</span><span class="discount-text">折</span>-->
      <!--</p>-->
      <!--</div>-->
    </div>
    <div class="package">
      <div class="package-choose">
        <div class="package-item"
             v-for="item,index in packages"
             :key="item.id"
             @click="choosePackage(item.id)"
             :class="choosed_index === item.id ? 'active' : ''">
          <p class="package-price">充{{item.pay_fee / 100 ? item.pay_fee / 100 : item.pay_fee}}</p>
          <P class="package-total">
            送{{(item.give_fee) / 100}}元特权</P>
        </div>
      </div>
      <div class="package-give-fee">赠送权益总价值：
        <span>{{gift_price}}元</span>
      </div>
      <ul class="rights">
        <li v-for="item,index in rights_data"
            :key="index">
          <img :src="item.img"
               alt="">
          <p class="right-title">{{item.name + item.num + item.unit}}</p>
          <p class="expire">{{'- ' + item.desc + ' -'}}</p>
        </li>
      </ul>
      <p class="package-tips">{{rights_desc}}</p>
    </div>
    <div class="instruction">
      <div class="instruction-section">
        <div class="instruction-title">使用说明</div>
        <ul class="instruction-list">
          <li>
            充值金额仅限购买虚拟道具，不可抵扣KTV的房台费和酒水费
          </li>
          <!--<li class="style-none"></li>-->
          <li>有效期：永久</li>
        </ul>
      </div>
      <!--<div class="instruction-section">-->
      <!--<div class="instruction-title">有效期</div>-->
      <!--<ul class="instruction-list">-->
      <!--<li>永久</li>-->
      <!--</ul>-->
      <!--</div>-->
      <!--<div class="instruction-section">-->
      <!--<div class="instruction-title">使用方法</div>-->
      <!--<ul class="instruction-list">-->
      <!--<li>充值成功后，立即可以用于支付收费功能</li>-->
      <!--</ul>-->
      <!--</div>-->
      <!--<div class="instruction-section">-->
      <!--<div class="instruction-title">权益说明</div>-->
      <!--<ul class="instruction-list">-->
      <!--<li>录音保存：云端保存演唱录音，手机端可以反复播放</li>-->
      <!--<li>霸屏祝福：优惠，最高打3.3折</li>-->
      <!--<li>歌曲冠名：冠名的歌曲自动置顶</li>-->
      <!--<li>包房主宰：首次免费</li>-->
      <!--</ul>-->
      <!--</div>-->
    </div>
    <div class="notice">
      点击立即充值，即表示您已阅读并同意
      <span class="agreement-btn">《充值协议》</span>
    </div>
    <div class="charge-btn"
         @click="charge">立即充值</div>
  </div>
</template>
<script>
// import ajax from '../../config/ajax'
// import env from '../../config/env'
export default {
  name: '',
  computed: {
    openid () {
      return this.$store.state.openid
    },
    packages () {
      return this.$store.state.charge.charge_packages
    },
    charge_price () {
      let item = this.packages[this.choosed_index]
      return item.pay_fee === 0 ? 0 : item.pay_fee / 100
    },
    gift_price () {
      let item = this.packages[this.choosed_index]
      return item.give_fee === 0 ? 0 : item.give_fee / 100
    },
    total_price () {
      return this.charge_price === 0 ? 0 : this.charge_price + this.gift_price
    },
    discount_num () {
      return this.charge_price === 0 ? 0 : (this.charge_price / this.total_price * 10).toFixed(1)
    },
    balance () {
      return this.$store.state.payPanel.balance
    },
    rights_data () {
      return this.packages[this.choosed_index].rights
    },
    rights_desc () {
      return this.packages[this.choosed_index].rights_desc
    }
  },
  data () {
    return {
      loading: false,
      type: '',
      choosed_index: 0,
      order_id: ''
    }
  },
  methods: {
    saveOpenid (openid) {
      this.openid = openid
      env.setCookie('thunder', openid, 30)
    },
    getPackageInfo () {
      this.$store.dispatch('getChargePackage')
    },
    choosePackage (packageID) {
      this.choosed_index = packageID
    },
    charge () {
      this.$store.dispatch('charge', this.choosed_index)
    }
  },
  created () {
    //            this.getOpenid()
    this.getPackageInfo()
    //            let redirectUrl = env.redirectUrl('song/charge', 'thunder')
    //            const p = this.$route.query.p === 'out'
    //            if(p){
    //                location.href = redirectUrl
    //            }
  },
  components: {}
}
</script>
<style lang="scss" scoped>
// @import '../../style/var';

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 remCalc(7);
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: remCalc(187);
  margin-top: remCalc(14);
  padding: remCalc(14);
  &.daker-0 {
    background-image: url('https://cdn.awsbj0.fds.api.mi-img.com/autodynemv/3fa3a15ad13451156b850b02909d8096.png');
  }
  &.daker-1 {
    background-image: url('https://cdn.awsbj0.fds.api.mi-img.com/autodynemv/0d20f05194c5a078f1b87de7171edb37.png');
  }
  &.daker-2 {
    background-image: url('https://autodynemv.b0.upaiyun.com/237e44f8db7dc40a8e6d4f10e76582ae.png');
  }
  background-repeat: no-repeat;
  background-size: contain;
  * {
    // color: $background2;
  }
  .title {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: remCalc(24);
    .text {
      display: flex;
      align-items: center;
      line-height: 100%;
    }
  }
  .right-arrow {
    display: inline-block;
    width: remCalc(8);
    height: remCalc(12);
    margin-left: remCalc(4);
    background: url('../../imgs/charge/arrow_right_white.png');
  }
  .logo {
    width: remCalc(115);
    height: remCalc(11);
    background: url('../../imgs/charge/thunder_logo.png') no-repeat;
    background-size: contain;
  }
}

.price-show {
  display: flex;
  align-items: center;
  margin-bottom: remCalc(30);
  .price-section {
    position: relative;
  }
  .price-explain {
    position: absolute;
    bottom: remCalc(-16);
    left: 50%;
    margin-left: remCalc(-16);
    font-size: remCalc(16);
    text-align: center;
    &.six-words {
      width: remCalc(110);
      margin-left: remCalc(-55);
    }
    &.three-words {
      width: remCalc(60);
      margin-left: remCalc(-30);
    }
  }
  .price-num {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: remCalc(38);
    min-width: remCalc(80);
  }
  .symbol {
    display: flex;
    align-items: center;
    margin: 0 remCalc(12);
    font-size: remCalc(20);
  }
}

.bottom-num {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.discount {
  align-self: flex-end;
  .discount-num {
    font-size: remCalc(24);
  }
}

.package {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: remCalc(15) 0 0;
  margin-bottom: remCalc(8);
  border-radius: remCalc(4);
  // background: $background2;
  .package-choose {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    margin-bottom: remCalc(12);
    padding: 0 remCalc(10);
    // border-bottom: 2px solid $t-color;
  }
  .package-give-fee {
    margin-bottom: remCalc(12);
    font-size: remCalc(14);
    span {
      // color: $t-color;
    }
  }
  .package-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: remCalc(105);
    height: remCalc(78);
    border: 1px solid #acacac;
    border-bottom: none;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    &.active {
      // border: 2px solid $themeColor;
      height: remCalc(80);
      border-bottom: none;
      margin-bottom: -2px;
      padding-bottom: 3px;
      // background: $background2;
      .package-price {
        // color: $themeColor;
      }
      .package-total {
        // color: $themeColor;
      }
    }
  }
  .package-price {
    font-size: remCalc(22);
    color: #676767;
  }
  .package-total {
    font-size: remCalc(14);
    color: #676767;
  }
  .rights {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: remCalc(16);
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 25%;
    }
    img {
      width: remCalc(33);
      height: remCalc(33);
      margin-bottom: remCalc(10);
    }
    .right-title {
      font-size: remCalc(12);
      color: #6f625d;
    }
    .expire {
      font-size: remCalc(12);
      transform: scale(0.86, 0.86);
      color: #6f625d;
    }
  }
  .package-tips {
    margin-bottom: remCalc(12);
    font-size: remCalc(12);
    transform: scale(0.86);
    color: #6f625d;
  }
}

.instruction {
  width: 100%;
  border-radius: 4px;
  margin-bottom: remCalc(15);
  padding: remCalc(18) remCalc(12) 0;
  // background: $background2;
  .instruction-section {
    margin-bottom: remCalc(18);
  }
  .instruction-title {
    margin-bottom: remCalc(6);
    font-size: remCalc(14);
    color: #676767;
  }
  .instruction-list {
    li {
      padding-left: remCalc(6);
      font-size: remCalc(12);
      color: #676767;
      background: url('../../imgs/charge/list_dot.png') no-repeat left center;
      &.style-none {
        background: none;
      }
    }
  }
}

.notice {
  width: 100%;
  margin-bottom: remCalc(60);
  font-size: remCalc(12);
  text-align: center;
  color: #858585;
  .agreement-btn {
    color: #ff8c19;
  }
}

.charge-btn {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: remCalc(50);
  font-size: remCalc(18);
  // color: $background2;
  // background: linear-gradient(-269deg, #ff8c19 0%, $themeColor 100%);
}
</style>