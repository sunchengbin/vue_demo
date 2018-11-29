<template>
  <div class="home">
    <div class="head-wrapper">
      <div class="search-bar">
        <p class="search-region"
           v-on:click="skip('https://vod.ktvsky.com/thunder/search')">
          <span class="search-title">输入歌曲名、歌星名</span>
        </p>
      </div>
      <div class="scanCode">
        <p @click='bindRoom'>绑定包房</p>
      </div>
    </div>
    <div class="banner-wrapper">
      <Swiper>
        <div v-for="(item, index) in swiperSlides"
             :key='index'
             class='banner-slide'
             v-on:click="skip(item.route)">
          <img :src="item.imgUrl"
               alt="">
        </div>
      </Swiper>
    </div>
    <ul class="item-nav-wrapper">
      <li v-for='(item, index) in indexNav'
          :key='index'
          v-on:click="skip(item.url)">{{item.key}}</li>
    </ul>
    <div class="home-title">点歌分类</div>
    <div class="order-service">
      <div v-on:click="skip('https://vod.ktvsky.com/thunder/top/hot')">歌名点歌</div>
      <div v-on:click="skip('https://vod.ktvsky.com/thunder/classify_singer')">歌手点歌</div>
      <div v-on:click="skip('https://vod.ktvsky.com/thunder/ordered')">已点点歌</div>
    </div>
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
    <play-control />
    <Footer></Footer>
  </div>
</template>
<script>
import weixin from '../libs/app/weixin.js'
import Footer from '@/components/app/footer/footer.vue'
import { swiperSlides } from '@/components/common/swiper/static'
import { indexNav } from '../static/index.js'
import playControl from '@/components/app/play_control'
export default {
  name: 'home',
  data () {
    return {
      swiperSlides: swiperSlides,
      indexNav: indexNav,
      obj: {
        a: 1
      }
    }
  },
  created () {
    console.log(this.obj, 111111)
    // var Book = {
    //   name: 'vue权威指南'
    // }
    // console.log(Book.name, 222222)
    var Book = {}
    var name = ''
    Object.defineProperty(Book, 'name', {
      set: (value) => {
        name = value
        console.log('你取了一个书名叫做' + value)
      },
      get: () => {
        return '《' + name + '》'
      }
    })
    Book.name = 'vue权威指南'
    console.log(Book.name)
    console.log(Book)
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
    },
    payPanelShow () {
      this.payShow = true
    },
    hidePanel () {
      this.payShow = false
    }
  },
  mounted () {
  },
  components: {
    Footer,
    playControl
  }
}
</script>
<style lang="scss" scoped>
.head-wrapper {
  display: flex;
  align-items: center;
}
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
.mint-swipe {
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
.item-nav-wrapper,
.sort-wrapper,
.order-service {
  display: flex;
  justify-content: space-around;
  @include px2rem(line-height, 60);
}
.item-nav-wrapper {
  flex-wrap: wrap;
  li {
    width: 33.3%;
  }
}
.home-title {
  @include px2rem(line-height, 60);
  @include px2rem(padding-left, 30);
  text-align: left;
}
</style>
