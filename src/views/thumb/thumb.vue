<template>
  <div class="thumb-wrapper">
    <div class="thumb-intro">
      <div class="thumb-title">玩法介绍</div>
      <div class="thumb-des">1.包场送赞，点击红心支持Ta，只需1元。</div>
      <div class="thumb-img">
          <img src="./static/img2.png" alt="">
      </div>
      <div class="thumb-line"></div>
      <div class="thumb-des">2.点赞时大屏幕心心怒放，同时还展示您的微信头像哦，快来让Ta感受您的支持吧！</div>
      <div class="thumb-img">
          <img src="./static/img1.png" alt="">
      </div>
    </div>
    <div class="thumb-button-wrapper">
      <div class="thumb-button" @click='thumb'>立刻为Ta点赞</div>
    </div>
    <payPanel></payPanel>
  </div>
</template>
<script>
import { chttp, apis } from '@/libs/interfaces'
import payPanel from '@/components/app/pay_panel/index'

export default {
  name: 'thumb',
  props: {
    singer: String
  },
  components: {
    payPanel
  },
  data () {
    return {
    }
  },
  computed: {
    loading () {
      return this.$store.state.is_loading
    },
    // 判断点赞支付与否
    thumb_pay () {
      return this.$store.state.thumb.thumb_pay
    },
    openid () {
      return this.$store.state.openid
    },
    unionid () {
      return this.$store.state.unionid
    },
    price () {
      return this.$store.state.thumb.fee
    },
    roomid () {
      return this.$store.state.thumb.roomid
    }
  },
  methods: {
    thumb () {
      let params = {
        openid: this.openid,
        unionid: this.unionid,
        roomid: this.roomid || 83705916
      }
      if (this.thumb_pay) {
        this.$router.push('/thunder/home')
        return
      }
      chttp.get(apis.send_like, params)
        .then(res => {
          this.$store.commit('THUMB_PAYED', res.is_pay)
          if (res.is_pay) {
            this.$router.push('/thunder/home')
            return
          }
          this.$store.commit('SHOW_PAY_PANEL', this.price)
        }).catch(function (err) {
          console.log(err)
        })
    },
    entryCollection () {
      let entry = this.entry
      switch (entry) {
        case 'scan':
          _hmt.push(['_trackEvent', '无限点赞', '微信扫码进入', 'thunder'])
          break
        case 'banner':
          _hmt.push(['_trackEvent', '无限点赞', '公众号banner进入', 'thunder'])
          break
        case 'ibanner':
          _hmt.push(['_trackEvent', '无限点赞', '首页banner进入', 'thunder'])
          break
        case 'channel':
          _hmt.push(['_trackEvent', '无限点赞', 'icon进入', 'thunder'])
          break
        case 'heart':
          _hmt.push(['_trackEvent', '无限点赞', '点赞按钮进入', 'thunder'])
          break
        default :
          _hmt.push(['_trackEvent', '无限点赞', '其他方式', 'thunder'])
          break
      }
    }
  },
  mounted () {
    if (this.$route.query.roomid && !this.roomid) {
      this.$store.commit('THUMB_ROOMID', this.$route.query.roomid)
    } else {
      console.log('已有roomid')
    }
    this.entry = this.$route.query.p
    this.$store.commit('THUMB_ENTRY', this.entry)
    this.entryCollection()
  }
}
</script>
<style lang="scss" scoped>
.thumb-wrapper{
  @include px2rem(margin-bottom, 100);
  .thumb-intro{
    background:#fff;
    @include px2rem(padding-bottom, 80);
  }
  .thumb-title{
    color: rgb(252,135,44);
    @include px2rem(font-size, 42);
    font-weight:bold;
    @include px2rem(margin-bottom, 32);
    @include px2rem(padding, 50 0 0 50);
  }
  .thumb-des{
    color: rgb(1,1,1);
    @include px2rem(font-size, 28);
    @include px2rem(margin-bottom, 32);
    @include px2rem(padding, 0 80);
    text-align: left;
  }
  .thumb-img{
    @include px2rem(width, 668);
    @include px2rem(height, 355);
    margin:0 auto;
    img{
      width:100%;
      height:100%;
    }
  }
  .thumb-line{
    width:px2rem(660);
    border:1px solid #f2f2f2;
    @include px2rem(margin, 36 auto 50);
  }
  .thumb-button{
    width: 100%;
    @include px2rem(height, 100);
    @include px2rem(line-height, 100);
    position: fixed;
    bottom: 0;
    background:rgb(252,131,42);
    text-align:center;
    color:#fff;
    @include px2rem(font-size, 38);
  }
}
</style>
