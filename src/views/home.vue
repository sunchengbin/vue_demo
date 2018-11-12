<template>
  <div class="home">
    <h1>svg组件的引入</h1>
    <div @click="clickBtn">
      <svg-icon icon-class="vip" />
    </div>
    <div class="btn">
      {{btnTxt}}
    </div>
    <!-- <MessageBox /> -->
    <Footer />
  </div>
</template>

<script>
import {
  utils
} from '@/libs/interfaces'
import Footer from '@/components/footer/footer'
export default {
  name: 'home',
  data () {
    return {
      btnTxt: '按钮'
    }
  },
  components: {
    Footer
  },
  created () {
    this.$toast('ceshi')
    // this.$messageBox.alert('操作成功', '')
  },
  methods: {
    clickBtn () {
      // this.$messageBox.alert('操作成功', '')
      this.$messageBox.setDefaults({ confirmButtonText: '去冠名呀', cancelButtonText: '继续点歌' })
      this.$messageBox.confirm('要去冠名吗？', '').then(confirm => {
        console.log(confirm)
      }).catch(cancel => {
        console.log(cancel)
      })
      // this.$messageBox.close()
      // this.$messageBox.prompt(' ', '请输入姓名').then(({ value }) => {
      //   if (value) {
      //     this.$messageBox.alert(`你的名字是 ${value}`, '输入成功');
      //   }
      // });

    }
  }
}
</script>

<style lang="scss">
.home {
  height: 100%;
}
</style>

