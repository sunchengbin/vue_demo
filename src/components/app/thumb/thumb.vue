<template>
  <div class="thumb-control" v-if='!like'>
    <div class="control-btn tada" style='touch-action: none;' @click="thumbClick">
      <div class="VueStar">
        <div class="VueStar__ground">
          <div class="VueStar__icon" :class="AnimateClass" :style='{color:ColorValue}'>
            <img src="./static/like.png" />
          </div>
          <div class="VueStar__decoration" :class="{ 'VueStar__decoration--active':active}"></div>
        </div>
      </div>
    </div>
    <div class='thumb-toast' v-if='toastShow'>
      <p>猛戳小心心</p>
      <p>为Ta点赞吧</p>
    </div>
  </div>
</template>
<script>
import debounce from '@/libs/utils/debounce'
import { chttp, apis } from '@/libs/interfaces'
export default {
  name: '',
  data () {
    return {
      toastShow: false,
      timer: null,
      active: false,
      toggleAnimate: false,
      toggleColor: false,
      animate: 'animated rubberBand'
    }
  },
  computed: {
    openid () {
      return this.$store.state.openid
    },
    unionid () {
      return this.$store.state.unionid
    },
    // 判断绑定房台码状态
    is_bind () {
      return this.$store.state.bind_status
    },
    // 判断点赞支付与否
    thumb_pay () {
      return this.$store.state.thumb.thumb_pay
    },
    AnimateClass () {
      return this.toggleAnimate ? this.animate : ''
    },
    ColorValue () {
      return this.toggleColor ? this.color : ''
    },
    roomid () {
      return this.$store.state.thumb.roomid
    },
    // 判断新老版本无限点赞 老版本：1 新版本：2
    like () {
      return this.$store.state.like
    }
  },
  methods: {
    thumbClick () {
      this.$router.push('/thumb?p=heart&roomid=' + this.roomid)
      if (!this.is_bind) {
        this.$store.commit('SHOW_ALERT_MODAL', '请扫码绑定房台')
        return
      }
      let params = {
        openid: this.openid,
        unionid: this.unionid,
        roomid: this.roomid
      }
      debounce(() => {
        let count = 2000
        if (this.timer === null) {
          this.timer = new Date().getTime()
        } else {
          count = new Date().getTime() - this.timer
        }
        if (count < 800) return
        this.thumbAnimate()
        this.timer = new Date().getTime()
        chttp.get(apis.send_like, params)
          .then(res => {
            this.$store.commit('THUMB_PAYED', res.is_pay)
            if (res.is_pay !== 1) {
              this.$router.push('/thunder/thumb?p=heart&roomid=' + this.roomid)
              return false
            }
          }).catch(function (err) {
            console.log(err)
          })
      }, 0)()
    },
    thumbAnimate () {
      this.toggleAnimate = true
      this.active = true
      setTimeout(() => {
        this.toggleAnimate = false
        this.active = false
      }, 800)
    }
  },
  created () {
    if (this.thumb_pay) {
      this.toastShow = true
      setTimeout(() => {
        this.toastShow = false
      }, 3000)
    }
  },
  mounted () {
    this.$store.commit('CLOSE_PAY_PANEL')
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../css/base/_animation.scss";
  .thumb-control{
    @include px2rem(width, 200);
    @include px2rem(height, 200);
    position:fixed;
    top: 60%;
    @include px2rem(right, -20);
    img{
      @include px2rem(width, 126);
      @include px2rem(height, 118);
    }
    .VueStar__ground, .control-btn {
      @include px2rem(width, 200);
      @include px2rem(height, 200);
    }
    .thumb-toast{
      @include px2rem(width, 446);
      @include px2rem(height, 272);
      @include px2rem(padding-left, 126);
      @include px2rem(padding-top, 48);
      background:url('./static/toast_bg.png');
      background-size:100% 100%;
      position:absolute;
      @include px2rem(top, -230);
      @include px2rem(right, 40);
      p{
        color:#fff;
        @include px2rem(font-size, 42);
        font-weight:bold;
      }
    }
  }
  .VueStar{
    position: absolute;
  }
  .VueStar__ground {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  .VueStar__icon {
    z-index: 888;
  }
  .VueStar__decoration {
    @include px2rem(width, 100);
    @include px2rem(height, 100);
    position: absolute;
    left: 48px;
    top: 45px;
    background-position: 0 0;
    transition: background-position 0.8s steps(25);
    transition-duration: 0s;
    transform: scale(2);
    &--active {
      transition-duration: 0.8s;
      background-position: -2500px 0;
    }
  }
  .VueStar__decoration--active{
    -webkit-transition-duration:0.8s;
    transition-duration:0.8s;
    background-position:-2500px 0;
  }
</style>
