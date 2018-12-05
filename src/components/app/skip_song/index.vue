<template>
  <div class="skip"
        @click.stop="operation('next')">
    <img src="../play_control/static/skip.png"
          alt="">
  </div>
</template>
<script>
import { http, apis } from '@/libs/interfaces'
export default {
  name: '',
  props: {
    containerShow: Boolean
  },
  computed: {
    openid () {
      return this.$store.state.openid || 'o3JAqt0Jr9vtoVncMW7ZBnHFvUd'
    },
    unionid () {
      return this.$store.state.unionid || 'o6qE3t8QKr3uYqrgbknYUSE72RiM'
    },
    is_bind () {
      return this.$store.state.bind_status
    }
  },
  methods: {
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
      console.log(params)
      http.get(apis.play + text, { params: params })
        .then(res => {
          // 切换评分状态
          if (text === 'control') {
            self.score = (self.score === 1) ? 0 : 1
          }
          // 弹出反馈框
          self.$toast('操作成功')
          self.$loading.close()
        }).catch(e => {
          self.$loading.close()
          self.$messageBox.alert(e, '')
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.skip {
  text-align: center;
  line-height: 2.5;
  position: fixed;
  @include px2rem(right, 30);
  @include px2rem(bottom, 120);
  img {
    @include px2rem(width, 100);
    @include px2rem(height, 100);
  }
}
</style>
