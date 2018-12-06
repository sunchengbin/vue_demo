<template>
  <div class="home">
    <div @click="clickBtn" class="btn">
      <svg-icon class-name="icon" icon-class="vip"/>
      {{localMessage}}
    </div>
    <div class="message">{{ message.text }}{{userInfo.name}}</div>
    <div>{{allName}}</div>
    <input type="text" v-focus v-model="message.text" placeholder="hello"/>
    <!-- <ul @scroll.passive="callback"> -->
    <!-- <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="100">
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul> -->
    <div></div>
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
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
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
  computed: {
    localMessage () {
      return this.$store.state.home.homeInfo.name
    },
    ...mapState({
      userInfo: 'userInfo'
    }),
    ...mapGetters([
      'allName'
    ])
  },
  created () {
    // console.log(this.$store.state.home)
    // console.log(this.localMessage)
    this.$store.dispatch('getActionHomeName')
    this.changeName({
      name: 'ma1110'
    })
    this.changeNameAction({
      name: 'ma22342'
    })
    // this.$store.state.home.dispatch('getActionHomeName')
  },
  mounted () {
    for (let i = 0; i < 50; i++) {
      this.list.push(`this indexof is ${i}`)
    }
  },
  methods: {
    ...mapMutations([
      'changeName'
    ]),
    ...mapActions([
      'changeNameAction'
    ]),
    clickBtn: utils.throttle(function () {
      this.$router.push('/help')
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
