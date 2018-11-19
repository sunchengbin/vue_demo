<template>
  <div class="home"
       @click.stop="closePad">
    <div class="container">
      <div class="pad">
        <!--歌曲控制-->
        <div class="play-control">
          <div class="skip"
               @click.stop="operation('next')">
            <img src="./static/skip.png"
                 alt="">
            <p>切歌</p>
          </div>
          <ul class="playing-control">
            <li @click.stop="operation('ctoggle')">
              <img src="./static/original.png"
                   alt="">
              <p>原唱 / 伴唱</p>
            </li>
            <li @click.stop="operation('control', score)">
              <img src="./static/score.png"
                   alt="">
              <p>评分</p>
            </li>
            <li @click.stop="operation('ptoggle')">
              <img src="./static/play.png"
                   alt="">
              <p>播放 / 暂停</p>
            </li>
            <li @click.stop="operation('reset')">
              <img src="./static/replay.png"
                   alt="">
              <p>重唱</p>
            </li>
          </ul>
        </div>
        <!--音量控制-->
        <ul class="sound-control">
          <li>
            <p @click.stop="operation('mmic', 0)">
              <img src="./static/minus.png"
                   alt="">
            </p>
            <span>麦克</span>
            <p @click.stop="operation('mmic', 1)">
              <img src="./static/plus.png"
                   alt="">
            </p>
          </li>
          <li>
            <p @click.stop="operation('mvol', 0)">
              <img src="./static/minus.png"
                   alt="">
            </p>
            <span>音响</span>
            <p @click.stop="operation('mvol', 1)">
              <img src="./static/plus.png"
                   alt="">
            </p>
          </li>
        </ul>
      </div>
      <ul class="value-entries">
        <li v-for="(item, index) in entries"
            :key="index"
            @click.stop="jump(item.route)">
          <img :src="item.icon"
               alt="">
          <span class="name">{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { http, apis } from '@/libs/interfaces'
export default {
  name: '',
  data () {
    return {
      score: 0,
      entries: [
        {
          name: '霸屏祝福',
          icon: require('../../../imgs/icon/zhufu_entry_icon.png'),
          route: 'zhufu'
        },
        {
          name: '特权赠送',
          icon: require('../../../imgs/icon/charge_entry_icon.png'),
          route: 'charge'
        },
        {
          name: '霸屏表白',
          icon: require('../../../imgs/icon/biaobai_entry_icon.png'),
          route: 'biaobai'
        }
      ]
    }
  },
  computed: {
    // show_pad: function () {
    //   return this.$store.state.show_play_control
    // },
    loading () {
      return this.$store.state.is_loading
    },
    openid () {
      return this.$store.state.openid
    },
    unionid () {
      return this.$store.state.unionid
    },
    is_bind () {
      return this.$store.state.bind_status
    }
  },
  methods: {
    closePad () {
      this.$emit('hideControlpad')
    },
    // 远程控制
    operation (text, num) {
      if (this.loading) {
        return
      }
      const self = this
      self.$loading.open()
      let type = num || 0
      let params = {
        openid: this.openid,
        unionid: this.unionid,
        type: type
      }
      http.get(apis.play + text, params)
        .then(res => {
          if (res.errcode === 21001) {
            // 切换评分状态
            if (text === 'control') {
              self.score = (self.score === 1) ? 0 : 1
            }
            // 弹出反馈框
            self.$toast('操作成功')
          } else if (res.errcode === 40003) {
            this.$store.commit('SHOW_ALERT_MODAL', '您未绑定房间，请扫描房间二维码')
          } else {
            this.$store.commit('SHOW_ALERT_MODAL', '出了点小问题，请稍后再试')
          }
          self.$loading.close()
        }).catch(e => {
        })
    },
    jump (path) {
      if (path === 'charge') {
        this.$router.push('/thunder/charge')
        return
      }
      if (!this.is_bind) {
        this.$store.commit('SHOW_ALERT_MODAL', '请扫码绑定房台')
        return
      }
      if (path === 'zhufu') {
        window.location.href = 'http://coupon.ktvsky.com/ktv/order/occupyb?p=banner&action=10&openid=' + this.openid + '&unionid=' + this.unionid
      } else if (path === 'biaobai') {
        window.location.href = 'http://coupon.ktvsky.com/ktv/order/occupyb?p=banner&action=12&openid=' + this.openid + '&unionid=' + this.unionid
      }
    }
  },
  components: {}
}
</script>
<style lang="scss" scoped>
@keyframes lift-in {
  0% {
    @include px2rem(bottom, -600);
    bottom: remOld(-600);
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
    background: rgba(0, 0, 0, 0.2);
  }
}

.home {
  z-index: 4000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  animation: backOpacity 0.5s;
}

.container {
  position: absolute;
  bottom: 0;
  animation: lift-in 0.5s;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.pad {
  /*width: 100%;*/
  @include px2rem(padding, 24 36);
  @include px2rem(margin, 0 16 16);
  border-radius: 10px;
  background: #fff;
}

.play-control {
  display: flex;
  @include px2rem(margin-bottom, 16);
  .skip {
    @include px2rem(margin-right, 56);
    text-align: center;
    line-height: 2.5;
    img {
      @include px2rem(width, 156);
      @include px2rem(height, 244);
    }
  }
  .playing-control {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    img {
      @include px2rem(width, 200);
      @include px2rem(height, 78);
    }
    p {
      text-align: center;
      line-height: 2.5;
    }
  }
}

.sound-control {
  display: flex;
  justify-content: space-between;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include fontSize(12px);
  }
  span {
    @include px2rem(margin, 0 50);
    flex-grow: 1;
  }
  img {
    @include px2rem(width, 84);
    @include px2rem(height, 84);
  }
}

.value-entries {
  display: flex;
  justify-content: space-between;
  @include px2rem(margin, 0 16 16);
  @include px2rem(padding, 24);
  border-radius: 10px;
  background: #fff;
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    @include px2rem(width, 208);
    @include px2rem(height, 52);
    @include px2rem(border-radius, 100);
    background-image: linear-gradient(-45deg, #ff4a46 0%, #ff826e 100%);
    box-shadow: 0 4px 8px 0 rgba(255, 0, 0, 0.35);
    img {
      @include px2rem(margin-top, 1);
      @include px2rem(width, 52);
      @include px2rem(height, 52);
    }
    .name {
      @include fontSize(14px);
      font-family: NotoSansHans-Medium;
      color: #fff;
    }
  }
}
</style>
