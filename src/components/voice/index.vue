<template>
  <div class="voice">
    <h2 class="title">您好, 我可以提供以下服务</h2>
    <div class="voice-serve">
      <h1 class="action">搜歌</h1>
      <p class="guide">您可以这样说：十年</p>
      <ul class="voice-fun">
        <li v-for="item in serve">{{item}}</li>
      </ul>
    </div>
    <button @touchstart.prevent="startVoice()"
            @touchmove="moveVoice()"
            @touchend="endVoice()"
            class="voice-btn"
            ref="recogniting"></button>
  </div>
</template>

<script>
import Wx from '@/libs/app/weixin'
export default {
  name: 'voice',
  data () {
    return {
      serve: ['切歌', '伴唱', '暂停', '播放'],
      recogniting: false
    }
  },
  methods: {
    startVoice () {
      Wx.startRecord()
      const timeOutEvent = setTimeout(() => {
        this.moveVoice()
      }, 500)
    },
    moveVoice () {
      console.log('moveVoice')
    },
    endVoice () {
      console.log('endVoice')
      Wx.stopRecord(this)
    }
  }
}
</script>

<style lang="scss" scoped>
.voice {
  height: 100%;
  z-index: 1000;
  position: absolute;
  width: 100%;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  .title,
  .voice-fun {
    @include fontSize(24px);
  }
  .title {
    @include px2rem(margin, 300 0 100);
  }
  .action {
    @include fontSize(40px);
    color: rgb(248, 191, 28);
  }
  .guide {
    @include fontSize(16px);
    @include px2rem(margin-bottom, 34);
  }
  .voice-fun {
    li {
      @include px2rem(margin-bottom, 34);
    }
  }
  .voice-btn {
    @include px2rem(width, 350);
    @include px2rem(height, 90);
    @include px2rem(margin-top, 100);
    background: url('./imgs/voice_btn.png') no-repeat;
    &:active {
      background-position: bottom;
    }
  }
  .fade-enter {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.7);
  }
  .fade-leave-active {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.9);
  }
}
</style>
