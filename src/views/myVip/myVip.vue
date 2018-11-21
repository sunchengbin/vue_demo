<template>
  <div class="home">
    <!--<div class="user-info">-->
    <!--<div class="avatar">-->
    <!--<img :src="user_img" alt="" ref="img">-->
    <!--</div>-->
    <!--<div class="vip-info">-->
    <!--<h3 class="user-name">{{user_name}}</h3>-->
    <!--<p>-->
    <!--<i></i>-->
    <!--<span class="vip-text">{{vip_text}}</span>-->
    <!--</p>-->
    <!--</div>-->
    <!--<div class="vip-expire" v-if="is_vip">{{expire_time}}</div>-->
    <!--</div>-->
    <div class="section buy-vip">
      <div class="title">
        <h3>会员套餐</h3>
        <p @click='argument'
           class="argument">
          服务协议
          <i class="right-arrow"></i>
        </p>
      </div>
      <div class="package-box">
        <ul class="packages-list">
          <li v-for="item, index in vip_package"
              :key="index"
              :class="item.id === package_index ? 'active' : ''"
              @click="choosePackage(item.id)">
            <span class="duration">{{item.desc}}</span>
            <div class="price">
              <p class="current-price">
                <span class="cash">￥</span>
                <span class="num">{{(item.current_fee / 100).toFixed(2)}}</span>
              </p>
              <s class="origin-price">￥{{(item.origin_fee / 100).toFixed(2)}}</s>
            </div>
          </li>
        </ul>
        <span class="ad-icon">推荐</span>
        <p class="buy-btn"
           @click="buyVip">立即购买</p>
      </div>
    </div>
    <div class="section vip-privilege">
      <div class="title">
        <h3>特权服务</h3>
      </div>
      <p class="rights-title">—&nbsp;&nbsp;VIP特权&nbsp;&nbsp;—</p>
      <ul class="vip-list list">
        <li v-for="item, index in rights">
          <p class="img-box">
            <img :src="item.active_icon"
                 alt="">
          </p>
          <p>{{item.name}}</p>
        </li>
      </ul>
      <p class="rights-title">—&nbsp;&nbsp;普通用户&nbsp;&nbsp;—</p>
      <ul class="normal-list list">
        <li v-for="item, index in rights">
          <p class="img-box">
            <img :src="item.default_icon"
                 alt="">
          </p>
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
    <!--<foot-guide :current_page="'我的'"></foot-guide>-->
    <!--<play-control></play-control>-->
  </div>
</template>
<script>
// import footGuide from '../../components/footer/footer'
// import playControl from '../../components/thunder_play_control/play_control'
// import ajax from '../../config/ajax'
// import Wx from '../../config/weixin-sdk'
import rights from './static/static'

export default {
  name: '',
  data () {
    return {
      rights: rights.vip_rights,
      package_index: 0,
      entry: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    var u = navigator.userAgent
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    // XXX: 修复iOS版微信HTML5 History兼容性问题
    if (isiOS && to.path !== location.pathname) {
      // 此处不可使用location.replace
      location.assign(to.fullPath)
    } else {
      next()
    }
  },
  computed: {
    openid () {
      return this.$store.state.openid
    },
    loading () {
      return this.$store.state.is_loading
    },
    user_name () {
      return this.$store.state.user_name
    },
    user_img () {
      return this.$store.state.user_img
    },
    vip_package () {
      return this.$store.state.vip.vip_packages
    }
  },
  methods: {
    // 进入协议页
    argument () {
      this.$router.push('/thunder/argument')
    },
    // 获取vip购买套餐信息
    getInfo () {
      this.$store.dispatch('getVipPackages')
    },
    // 套餐选择
    choosePackage (index) {
      this.package_index = index
    },
    // 购买VIP，传参为套餐ID
    buyVip () {
      this.$store.dispatch('buyVip', this.package_index)
    },
    // 百度统计入口
    entryCollection () {
      let entry = this.entry
      /* eslint-disable */
      switch (entry) {
        case 'top':
          _hmt.push(['_trackEvent', '访问VIP', '顶部icon进入', 'thunder'])
          break
        case 'channel':
          _hmt.push(['_trackEvent', '访问VIP', '首页渠道进入', 'thunder'])
          break
        case 'banner':
          _hmt.push(['_trackEvent', '访问VIP', '首页轮播进入', 'thunder'])
          break
        case 'extips':
          _hmt.push(['_trackEvent', '访问VIP', '表情页tips进入', 'thunder'])
          break
        case 'exbuy':
          _hmt.push(['_trackEvent', '访问VIP', '表情购买进入', 'thunder'])
          break
        case 'topbanner':
          _hmt.push(['_trackEvent', '访问VIP', '排行榜banner进入', 'thunder'])
          break
        default:
          _hmt.push(['_trackEvent', '访问VIP', '其他方式', 'thunder'])
          break
      }
      /* eslint-enable */
    }
  },
  mounted () {
    // 图片出错时的解决办法
    // this.$refs.img.onerror = () => {
    //   this.$refs.img.src = require('../../images/icon/head.png')
    // }
    this.getInfo()
    this.entry = this.$route.query.p
    this.entryCollection()
  },
  components: {
    // footGuide,
    // playControl
  }
}
</script>
<style lang="scss" scoped>
// @import '../../style/var.scss';

.home {
  margin-bottom: remOld(144);
  // background: $background1;
}

.section {
  margin-bottom: remCalc(6);
  padding-bottom: remCalc(24);
  // background: $background2;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: remCalc(16) remCalc(12);
    margin-bottom: remCalc(14);
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    h3 {
      font-size: remOld(54);
    }
  }
  .argument {
    display: flex;
    align-items: center;
    color: #999;
    i {
      width: remCalc(7);
      height: remCalc(10);
      margin-left: remCalc(4);
      background: url('./static/arrow_right_grey.png') no-repeat;
      background-size: contain;
    }
  }
}

.buy-vip {
  margin-bottom: remOld(20);
  .title {
    span {
      width: remOld(198);
      height: remOld(36);
      background: url('./static/service.png') no-repeat;
      background-size: remOld(198) remOld(36);
    }
  }
  .current-price {
    font-size: remOld(44);
    color: #c9ad56;
  }
  .buy-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: remCalc(300);
    height: remCalc(40);
    margin: remCalc(6) auto 0;
    // border-radius: $border-r1;
    box-shadow: 0 4px 10px 0 rgba(238, 206, 156, 0.8);
    font-size: remCalc(16);
    background-image: linear-gradient(-90deg, #cb9d67 0%, #dcbd82 100%);
    // color: $background2;
  }
}

.package-box {
  position: relative;
  margin: 0 remCalc(12);
  .packages-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: remCalc(170);
      margin-bottom: remCalc(12);
      padding: remCalc(12) remCalc(8);
      padding-right: remCalc(6);
      border: 1px solid #dddddd;
      // border-radius: $border-r3;
      &.active {
        background: rgba(243, 129, 94, 0.1);
        border: 1px solid #f3815e;
      }
      .duration {
        font-size: remCalc(16);
        // color: $t-color2;
      }
    }
    .price {
      display: flex;
      flex-direction: column;
      align-items: center;
      .current-price {
        span {
          font-size: remCalc(16);
          color: #f35e5e;
          font-family: NotoSansHans-Medium;
        }
        .num {
          font-family: Impact;
          font-size: remCalc(30);
        }
      }
      s {
        font-size: remCalc(16);
        color: #bbb;
      }
    }
  }
  .ad-icon {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 remCalc(8);
    border-radius: 0 4px 4px 4px;
    background-image: linear-gradient(90deg, #6c23ae 0%, #c86dd7 100%);
    // color: $background2;
  }
}

.vip-privilege {
  .rights-title {
    margin-bottom: remCalc(12);
    text-align: center;
    // color: $t-color2;
  }
  .list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: remCalc(30);
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 33%;
    }
  }
  .img-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: remCalc(40);
    height: remCalc(35);
    margin-bottom: remCalc(12);
    img {
      transform: scale(0.33);
    }
  }

  .normal-list {
    .img-box {
      background: url('./static/slash_line.png') no-repeat;
      background-size: contain;
    }
  }
}
</style>
