<template>
  <div class="home">
    <button @click="showpayPanel">点击</button>
    <paypanel v-show="payShow"
              @hidePanel="hidePanel"
              :price=1
              :params="params"
              :elseData="elseData"></paypanel>
    <div class="top">

    </div>
    <div class="list">
      <ul v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="5"
          class="list songs-list"
          @touchstart="touch1"
          @touchend="touch2">
        <song-item v-for="(item,index) in songs"
                   :key="index"
                   :title="item.music_name"
                   :sub_title="item.singer"
                   :song_ID="item.songid"
                   :flags="item.flag"
                   :type="'song'"
                   :origin="'search'"
                   :songindex="index"></song-item>
      </ul>
      <p v-show='is_show'>我是有底线的</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.top {
  @include px2rem(height, 40);
}
</style>
<script>
import songItem from '@/components/app/song_item'
import { http, apis } from '@/libs/interfaces'
import paypanel from '@/components/app/pay_panel'
export default {
  name: '',
  data () {
    return {
      singers: [{ singer: '哈辉', singerhead: 'https://qnktv.ktvdaren.com/singer/103901.jpg', singerid: 103901 }],
      songs: [],
      page: 1,
      type: 'hot',
      is_last: false,
      is_show: false,
      payShow: false,
      params: { openid: '1111', unionid: '111' },
      elseData: { type: 'thumb' }
    }
  },
  components: {
    songItem,
    paypanel
  },
  created () {
    this.promiseAll().then((res) => {
      console.log('333333')
      this.$loading.close()
    })
  },
  methods: {
    getSongList (type, page) {
      if (this.is_last) return
      const params = {
        openid: this.$store.openid,
        unionid: this.$store.unionid,
        p: page
      }
      http.get(apis.top_type + type, { params }).then(res => {
        if (res.data.length < 10) {
          this.is_last = true
          this.is_show = true
        }
        this.songs.push.apply(this.songs, res.data)
        this.page++
      }).catch(e => {
        this.$toast(e)
      })
    },
    loadMore () {
      this.getSongList(this.type, this.page)
    },
    promiseAll () {
      const one = this.test1().then(res => {
        console.log(res)
      })
      const two = this.test2().then(res => {
        console.log(res)
      })
      return Promise.all([one, two, this.getSongList(this.type, this.page)])
    },
    test1 () {
      return new Promise((resolve, reject) => {
        setTimeout(function () {
          resolve('222222')
        }, 2000)
      })
    },
    test2 () {
      return new Promise((resolve, reject) => {
        setTimeout(function () {
          resolve('111111')
        }, 1000)
      })
    },
    check () {
      console.log('check')
    },
    touch1 (e) {
      console.log('start')
    },
    touch2 (e) {
      console.log('222')
      this.is_show = false
    },
    showpayPanel () {
      this.payShow = true
    },
    hidePanel () {
      this.this.payShow = false
    }
  }
}
</script>
