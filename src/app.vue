<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/reserve">广场</router-link> |
      <router-link to="/mine">我的</router-link> |
      <router-link to="/songlist">Songlist</router-link>
    </div>
    <transition name="fade">
      <router-view />
    </transition>
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
