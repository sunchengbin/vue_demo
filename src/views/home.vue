<template>
  <div class="home">
    <h1>svg组件的引入</h1>
    <div @click="clickBtn">
      <svg-icon icon-class="vip" />
    </div>
    <div class="btn">
      {{btnTxt}}
    </div>
    <!-- <loading message="数据加载中" /> -->
    <!-- <toast message='警告'></toast> -->
    <paypanel v-show="payShow"
              @hidePanel="hidePanel"
              :price="price"></paypanel>
  </div>
</template>

<script>
import {
  utils
} from '@/libs/interfaces'
import Toast from '@/components/toast'
import loading from '@/components/loading'
import paypanel from '@/components/pay_panel'
export default {
  name: 'home',
  data () {
    return {
      btnTxt: '按钮',
      payShow: false,
      price: 200
    }
  },
  methods: {
    clickBtn: utils.throttle(function () {
      console.log(this.btnTxt)
      console.log(`now is ${Date.now()}`)
      this.payPanelShow()
      Toast({
        message: '操作成功',
        iconName: 'vip',
        position: 'bottom'
        // toastSvg: 'toast-Icon'
      })
    }, 1000),
    payPanelShow () {
      this.payShow = true
    },
    hidePanel () {
      this.payShow = false
    }

  },
  mounted () {
    // Toast()
    loading.open()
    setTimeout(function () {
      loading.close()
    }, 2000)
  },
  components: {
    // loading
    paypanel
  }
}
</script>
<style lang="scss" scoped>
</style>
