<template>
  <div class="home">
    <h1>svg组件的引入</h1>
    <div @click="clickBtn">
      <svg-icon icon-class="vip"/>
    </div>
    <div class="btn">
      {{btnTxt}}
    </div>
    <!-- <toast :visible="showToast" message="ceshi"></toast> -->
  </div>
</template>

<script>
import {
  utils
} from '@/libs/interfaces'
// import toast from '@/components/toast/index.vue'
// import Toast from '@/components/toast/index.js'
export default {
  name: 'home',
  // components: {
  //   toast
  // },
  data () {
    return {
      btnTxt: '按钮'
      // showToast: false
    }
  },
  methods: {
    clickBtn: utils.throttle(function () {
      console.log(this.btnTxt)
      console.log(`now is ${Date.now()}`)
      this.$toast('ceshi')
      // Toast('ceshi')
      // this.showToast = true
    }, 1000)
  }
}
</script>
