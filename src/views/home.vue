<template>
  <div class="home">
    <h1>svg组件的引入</h1>
    <div @click="clickBtn" class="btn">
      <svg-icon class-name="icon" icon-class="vip"/>
    </div>
    <div class="message">{{ message.text }}</div>
    <input type="text" v-focus v-model="message.text" placeholder="hello"/>
    <!-- <ul @scroll.passive="callback"> -->
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="100">
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .home {
    text-align: center;
    ul {
      @include px2rem(height, 500);
      // overflow-y: scroll;
    }
  }
</style>
<script>
import {
  utils,
  http
} from '@/libs/interfaces'
import vue from 'vue'
export default {
  name: 'home',
  data () {
    return {
      btnTxt: '按钮',
      message: {},
      list: [],
      loading: false
    }
  },
  mounted () {
    for (let i = 0; i < 50; i++) {
      this.list.push(`this indexof is ${i}`)
    }
  },
  methods: {
    clickBtn: utils.throttle(function () {
      http.get('/').then(res => {
        console.log(res)
      })
      vue.set(this.message, 'text', 'hello world')
    }, 1000),
    loadMore () {
      console.log(1)
      this.loading = true
      setTimeout(() => {
        this.list.push(`this indexof is ${this.list.length + 1}`)
        this.loading = false
      }, 1000)
    }
  }
}
</script>
