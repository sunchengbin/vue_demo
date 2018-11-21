<template>
  <div class="home">
    <div class="head-wrapper">
      <div class="search-bar">
        <p class="search-region" v-on:click="skip('https://vod.ktvsky.com/thunder/search')">
          <span class="search-title">输入歌曲名、歌星名</span>
        </p>
      </div>
      <div class="scanCode">
        <p @click='bindRoom'>绑定包房</p>
      </div>
    </div>
    <div class="banner-wrapper">
      <Swiper>
        <div v-for="(item, index) in banner" :key='index' class='banner-slide' v-on:click="skip(item.route)">
          <img :src="item.imgUrl" alt="">
        </div>
      </Swiper>
    </div>
    <div class="item-nav-wrapper">
      <div class='item-nav'>
        <div class="item-guanming">
          <p>歌曲冠名</p>
        </div>
        <div class="item-thumb">
          <p>为Ta点赞</p>
        </div>
        <div class="item-zhufu">
          <p>霸屏祝福</p>
        </div>
      </div>
      <div class='item-nav'>
        <div class="item-vip">
          <p>会员VIP</p>
        </div>
        <div class="item-mv">
          <p>照片MV</p>
        </div>
        <div class="item-biaoqing">
          <p>魔法表情</p>
        </div>
      </div>
    </div>
    <div class="home-title">点歌分类</div>
    <div class="home-title">歌单分类</div>
    <div class="sort-list">
      <div class="sort-wrapper">
        <div class="sort">
          KTV必点
        </div>
        <div class="sort">
          最热歌曲
        </div>
        <div class="sort">
          情歌对唱
        </div>
        <div class="sort">
          影视金曲
        </div>
      </div>
      <div class="sort-wrapper">
        <div class="sort">
          网络神曲
        </div>
        <div class="sort">
          最新歌曲
        </div>
        <div class="sort">
          粤语歌曲
        </div>
        <div class="sort">
          派对嗨炸
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import {
  util
} from '@/libs/utils'
import weixin from '../libs/app/weixin.js'
import { banner } from '../static/index'
import Swiper from '@/components/common/swiper/index.vue'
import Footer from '@/components/app/footer/footer.vue'

export default {
  name: 'home',
  data () {
    return {
      banner: []
    }
  },
  created () {
    this.banner = banner
  },
  methods: {
    bindRoom () {
      weixin.scanQRCode()
    },
    skip (path) {
      if (path.indexOf('http') >= 0) {
        location.href = path
      } else {
        this.$router.push(path)
      }
      
    }
  },
  mounted () {
  },
  components: {
    Swiper,
    Footer
  }
}
</script>
<style lang="scss" scoped>
.search-bar {
  display: flex;
  align-items: center;
  flex-grow: 1;
  @include px2rem(height, 60);
  @include px2rem(margin, 0 10);
  @include px2rem(border-radius, 2);
  background: #fff;
  .search-title {
    @include px2rem(margin-left, 4);
    @include px2rem(font-size, 28);
    color: #ff7d0e;
  }
}
.banner-wrapper {
  width: 100%;
  @include px2rem(height, 280);
  .banner-slide {
    width: 100%;
    height: 100%;
  }
}
.search-region {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85%;
  height: 100%;
  img {
    @include px2rem(width, 32);
    @include px2rem(height, 32);
  }
}
.item-nav, .sort-wrapper{
  display: flex;
  justify-content: space-around;
  @include px2rem(line-height, 60);
}
.home-title{
  @include px2rem(line-height, 60);
  @include px2rem(padding-left, 30);
  text-align: left;
}
</style>
