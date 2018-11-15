<!--
voice组件的使用说明
  1> 在需要的组件引入voice： import voice from '@/components/voice/index'
  2> 注册组件
  3> 使用组件 <voice />
-->

<template>
  <div class="voice"
       @click="closeVoice"
       v-show="isShow">
    <div class="norecognite"
         v-if="!recogniting">
      <h2 class="title">您好, 我可以提供以下服务</h2>
      <div class="voice-serve">
        <h1 class="action">搜歌</h1>
        <p class="guide">您可以这样说：十年</p>
        <ul class="voice-fun">
          <li v-for="item in serve">{{item}}</li>
        </ul>
      </div>
    </div>
    <div v-else
         class="recognitingRemark">
      <img src="./imgs/recording.png"
           alt="">
      <p class="recognitingP">{{press_tip_text}}</p>
    </div>
    <button @touchstart.prevent="startVoice()"
            @touchmove="moveVoice()"
            @touchend.prevent="endVoice()"
            class="voice-btn"></button>
  </div>
</template>

<script>
import Wx from '@/libs/app/weixin'
import queryUrl from '@/libs/base/query'
import http from '@/libs/base/http'
export default {
  name: 'voice',
  data () {
    return {
      serve: ['切歌', '伴唱', '暂停', '播放'],
      recogniting: false,
      voice_resolve: false,
      isShow: true,
      result_list: [],
      result: '',
      openid: 'o3JAqt0Jr9vtoVncMW7ZBnHFvUd',
      unionid: 'o6qE3t8QKr3uYqrgbknYUSE72RiM'
    }
  },
  computed: {
    // 解析语音时显示的文本
    press_tip_text: function () {
      return this.voice_resolve ? '正在识别中...' : '< 松手发指令 >'
    },
  },
  created () {
    // 如果没有缓存语音字典数据，则获取数据
    let self = this
    http.get('https://k.ktvsky.com/bar/u/remote_ctrl/dict')
      .then(function (res) {
        this.result_list = res.data
      }).catch(function (err) {
        console.log('Inside error, fetching product line items failed', err)
      })
  },
  methods: {
    // 关闭语音面板
    closeVoice () {
      this.recogniting = false
      this.isShow = false
    },
    startVoice () {
      // 如果上一段语音没有解析完成，阻止用户发送下一段语音
      if (this.voice_resolve) {
        return
      }
      Wx.startRecord()
      const timeOutEvent = setTimeout(() => {
        this.moveVoice()
      }, 500)
    },
    moveVoice () {
      this.recogniting = true
    },
    endVoice () {
      if (this.voice_resolve) {
        return
      }
      this.voice_resolve = true
      Wx.stopRecord(this)
    },
    // 获取语音转化文本的回调函数
    setWord (word) {
      // 若此回调函数执行，表示已经解析完成，重置解析状态。
      this.voice_resolve = false
      if (typeof word === 'undefined') {
        // 不关闭面板，返回录音前页面
        this.recogniting = false
        return false
      }
      // 语音识别结果
      this.result = word.replace(/。|，/g, '')
      let result = this.result_list[this.result] || this.result
      if (this.result_list[this.result]) {
        let text = this.result_list[this.result]
        this.playControl(text)
      } else {
        // 如果不在词语词典内，则识别为搜索歌曲
        this.closeVoice()
        // 跳转到搜索页，并拼接关键字
        this.$router.push('/thunder/search?q=' + result)
      }
    },
    // 播放控制
    playControl (text) {
      const self = this
      let params = {
        openid: self.openid,
        unionid: self.unionid
      }
      ajax.get('https://k.ktvsky.com/bar/u/remote_ctrl/song/' + text, params)
        .then(res => {
          if (res.errcode === 21001) {
            self.closeVoice()
          } else if (res.errcode === 40003) {
            alert('您未绑定房间，请扫码访问')
          } else {
            alert('出了点小问题，请稍后再试')
          }
        })
        .catch(function (err) {
          console.log('Inside error, fetching product line items failed', err)
        })
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
    position: absolute;
    @include px2rem(bottom, 150);
    @include px2rem(left, 200);
    @include px2rem(width, 350);
    @include px2rem(height, 90);
    background: url('./imgs/voice_btn.png') no-repeat;
    background-size: cover;
    &:active {
      color: red;
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
  .recognitingRemark {
    @include px2rem(margin-top, 350);
    img {
      @include px2rem(width, 660);
      @include px2rem(height, 320);
    }
    .recognitingP {
      @include px2rem(margin-top, 80);
      color: #ff7303;
      @include fontSize(16px);
    }
  }
}
</style>
