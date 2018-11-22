<template>
  <div class="home">
    <div class="top">

    </div>
    <div class="list">
      <ul v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="5"
          class="list songs-list">
        <song-item v-for="(item,index) in songs"
                   :key="item.songid"
                   :title="item.music_name"
                   :sub_title="item.singer"
                   :song_ID="item.songid"
                   :flags="item.flag"
                   :type="'song'"
                   :origin="'search'"
                   :songindex="index"></song-item>
      </ul>
      <p v-show='is_last'>我是有底线的</p>
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
export default {
  name: '',
  data () {
    return {
      singers: [{ singer: '哈辉', singerhead: 'https://qnktv.ktvdaren.com/singer/103901.jpg', singerid: 103901 }],
      songs: [],
      page: 1,
      type: 'hot',
      is_last: false

    }
  },
  components: {
    songItem
  },
  created () {
    // this.getSongList(this.type, this.page)
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
        }
        this.songs.push.apply(this.songs, res.data)
        this.page++
      }).catch(e => {
        this.$toast(e)
      })
    },
    loadMore () {
      this.getSongList(this.type, this.page)
    }
  }
}
</script>
