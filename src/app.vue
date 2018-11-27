<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
// import Vue from 'vue'
import { utils } from './libs/interfaces'
import weixin from './libs/app/weixin'
export default {
  created () {
    const loading = document.getElementById('loading')
    loading.style.display = 'none'
    // this.getOpenID()
    // weixin.getOpenID('thunder/home', { type: this.$store.state.vod_type })
  },
  methods: {
    // 获取用户openIid和unionid

    getOpenID () {
      // 用户openid，只跟当前公众号相关
      let openid = utils.util.getUrlPrem('openid') || utils.cookie.getCookie()
      // 用户unionid，用户唯一ID，不随公众号变化
      let unionid = utils.util.getUrlPrem('unionid') || utils.cookie.getCookie('tunionid')
      let type = this.$store.state.vod_type
      if (!openid || !unionid || unionid === 'null') {
        let redirectUrl = weixin.wxLoginUrl('thunder/home', type)
        const isWxWebView = weixin.isWxWebView()
        if (isWxWebView) {
          window.location.replace(redirectUrl)
        }
      } else {
        this.saveOpenid(openid, unionid)
      }
    },
    saveOpenid (openid, unionid) {
      this.$store.commit('SAVE_OPENID', openid)
      this.$store.commit('SAVE_UNIONID', unionid)
    }
  }
}
</script>

<style lang="scss">
#app {
  text-align: center;
  height: 100%;
}
#nav {
  @include px2rem(padding, 30);
  a {
    font-weight: bold;
    &.router-link-exact-active {
      color: $active_font_color;
    }
  }
}
</style>
