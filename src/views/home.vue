<template>
  <div class="home">
    <search-bar></search-bar>
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
    <ul class="list"
        v-show="singers.length>0">
      <song-item v-for="(item) in singers"
                 :key="item.singerid"
                 :singer_ID="item.singerid"
                 :title="item.singer"
                 :imgs="item.singerhead"
                 :type="'singer'"
                 :is_search="true"></song-item>
    </ul>
    <ul class="list songs-list">
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
    <play-control />>
  </div>
</template>

<script>
import {
  utils
} from '@/libs/interfaces'
import paypanel from '@/components/pay_panel'
import searchBar from '@/components/search_bar'
import songItem from '@/components/song_item'
import playControl from '@/components/play_control'
export default {
  name: 'home',
  data () {
    return {
      btnTxt: '按钮',
      payShow: false,
      price: 200,
      singers: [{ singer: '哈辉', singerhead: 'https://qnktv.ktvdaren.com/singer/103901.jpg', singerid: 103901 }],
      songs: [{ songid: 7654282, music_name: '刘哈哈与大先生', flag: ['MV', '国语'], singer: '刘心', played: 0 }]
    }
  },
  methods: {
    clickBtn: utils.throttle(function () {
      console.log(this.btnTxt)
      console.log(`now is ${Date.now()}`)
      this.payPanelShow()
      this.$toast({
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
    const self = this
    self.$toast('操作失败')
    // self.$loading.open()
    // setTimeout(function () {
    //   self.$loading.close()
    // }, 2000)
  },
  components: {
    // loading
    paypanel,
    searchBar,
    songItem,
    playControl
  }
}
</script>
<style lang="scss" scoped>
</style>
