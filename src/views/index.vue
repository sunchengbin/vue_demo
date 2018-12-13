<template>
  <div class="home">
    <div class="head-wrapper">
      <div class="vip-icon">
        <img
          :src="vip_icon"
          @click="skip('https://vod.ktvsky.com/thunder/myvip?p=top')">
      </div>
      <div class="search-bar">
        <p class="search-region"
          @click="skip('https://vod.ktvsky.com/thunder/search')">
          <img src="../imgs/index/search.png"
            alt="">
          <span class="search-title">输入歌曲名、歌星名</span>
        </p>
        <span class="vertical-line"></span>
        <p class="voice-region"
          @click="showVoice">
          <img src="../imgs/index/voice_ctrl.png"
            alt="">
        </p>
      </div>
      <div class="ordered-icon">
        <img
          src="../imgs/index/ordered_icon.png"
          @click="skip('https://vod.ktvsky.com/thunder/ordered')"
          alt="">
      </div>
    </div>
    <div class="banner-wrapper">
      <Swiper v-if="swiperSlides.length">
        <SwiperItem v-for="(item, index) in swiperSlides"
          :key='index'
          class='banner-slide'>
            <img :src="item.classdetailbigimage"
              alt=""
              @click="skip(item.route)">
        </SwiperItem>
      </Swiper>
    </div>
    <ul class="item-nav-wrapper">
      <li v-for='(item, index) in indexNav'
        :key='index'
        @click="skip(item.url)">
        <div class="img-box">
          <svg-icon
            :icon-class="item.svg"/>
        </div>
        <p>{{item.key}}</p>
      </li>
    </ul>
    <div class="order-service">
      <p class="order-head">
        <span class="vertical-line"></span>
        <span class="title">点歌服务</span>
      </p>
      <ul class="top-list">
        <li v-for="(item,index) in topLists"
          :key="index">
          <router-link :to="item.routeTo">
            <p class="top-img">
              <img :src="item.src"
                alt="">
            </p>
          </router-link>
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
    <skip-song></skip-song>
    <thumb-control></thumb-control>
    <play-control />
    <Voice ref="voice"/>
    <Footer currentPage='首页'></Footer>
  </div>
</template>
<script>
import weixin from '../libs/app/weixin'
import Footer from '@/components/app/footer/footer'
import SkipSong from '@/components/app/skip_song/index'
import PlayControl from '@/components/app/play_control'
import ThumbControl from '@/components/app/thumb/thumb'
import Swiper from '@/components/common/swiper/index'
import SwiperItem from '@/components/common/swiper/swiper_item'
import Voice from '@/components/app/voice/index'
import { chttp, http, apis } from '@/libs/interfaces'
import { indexNav, roomLists } from '../static/index'
export default {
  name: 'home',
  data () {
    return {
      swiperSlides: [],
      indexNav: indexNav,
      topLists: roomLists
    }
  },
  computed: {
    // 判断绑定房台码状态
    is_bind () {
      return this.$store.state.bind_status
    },
    // 判断用户是否是VIP
    is_vip () {
      return this.$store.state.is_vip
    },
    // 左上角vipicon展示
    vip_icon () {
      return this.is_vip
        ? require('../imgs/index/my_vip_icon.png')
        : require('../imgs/index/open_vip_icon.png')
    },
    // 主宰功能判断，根据这个判断当前包房是否支持主宰：0:不可使用，1:可以使用
    zhuzai_version () {
      return this.$store.state.zhuzai_version
    },
    // 表情功能判断，根据这个判断当前包房是否支持表情：0:不可使用，1:可以使用
    emoji_version () {
      return this.$store.state.emoji_version
    },
    // 气氛功能判断，根据这个判断当前包房是否支持气氛：0:不可使用，1:可以使用
    atm_version () {
      return this.$store.state.atm_version
    },
    // 照片MV功能判断，根据这个判断当前包房是否支持照片MV：0:不可使用，1:可以使用
    mv_version () {
      return this.$store.state.mv_version
    },
    // 判断机顶盒是雷石还是雷客，雷石：thunder、雷客：leike
    vod_type () {
      return this.$store.state.vod_type
    },
    // 判断新老版本霸屏 老版本：1 新版本：2
    ba () {
      return this.$store.state.ba
    }
  },
  created () {
    this.getBanner()
    this.$loading.close()
    console.log('created')
  },
  methods: {
    bindRoom () {
      weixin.scanQRCode()
    },
    showVoice () {
      this.$refs.voice.showVoice()
    },
    getBanner () {
      chttp.get(apis.home)
        .then(res => {
          this.swiperSlides = res.swiperSlides
        })
    },
    skip (path) {
      if (path.indexOf('http') >= 0) {
        location.href = path
        return
      }
      let p = path || '/thunder/home?openid=' + this.openid + '&unionid=' + this.unionid
      this.$router.push(p)
    },
    payPanelShow () {
      this.payShow = true
    },
    hidePanel () {
      this.payShow = false
    },
    operation () {
      if (this.loading) {
        return
      }
      const self = this
      self.$loading.open()
      let params = {
        openid: this.openid,
        unionid: this.unionid,
        type: 0
      }
      http.get(apis.play + 'next', { params: params })
        .then(res => {
          // 弹出反馈框
          self.$toast('操作成功')
          self.$loading.close()
        }).catch(e => {
          self.$loading.close()
          self.$messageBox.alert(e, '')
        })
    }
  },
  mounted () {
    this.$loading.close()
    console.log('mounted')
  },
  components: {
    Footer,
    PlayControl,
    ThumbControl,
    SkipSong,
    Swiper,
    SwiperItem,
    Voice
  }
}
</script>
<style lang="scss" scoped>
.head-wrapper {
  @include px2rem(height, 100);
  display: flex;
  align-items: center;
  @include px2rem(padding, 0 20);
  background-image: linear-gradient(
    -90deg,
    #ff8c1a 0%,
    #ff7d0e 39%,
    #ff6d00 100%
  );
  .vip-icon {
    @include px2rem(width, 84);
    @include px2rem(height, 52);
  }
  .ordered-icon {
    @include px2rem(width, 72);
    @include px2rem(height, 48);
  }
}
.search-bar {
  display: flex;
  align-items: center;
  flex-grow: 1;
  @include px2rem(height, 60);
  @include px2rem(margin, 0 20);
  @include px2rem(border-radius, 2);
  background: #fff;
  .search-title {
    @include px2rem(margin-left, 4);
    @include px2rem(font-size, 28);
    color: #ff7d0e;
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
  .vertical-line {
    background: #cccccc;
    border-radius: 1px;
    width: 1px;
    @include px2rem(height, 24);
  }
  .voice-region {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    height: 100%;
    img {
      @include px2rem(width, 24);
      @include px2rem(height, 32);
    }
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
.item-nav-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  li {
    width: 25%;
    @include px2rem(height, 160);
  }
  .img-box {
    display: flex;
    justify-content: center;
    align-items: center;
    @include px2rem(height, 80);
    @include px2rem(margin-top, 10);
  }
  p {
    color: #333;
    @include px2rem(margin-top, 15);
    @include px2rem(font-size, 28);
  }
}
.banner-wrapper{
  touch-action: none;
}
.order-service {
  @include px2rem(padding, 24);
  background: #fff;
  .order-head {
    display: flex;
    align-items: center;
    @include px2rem(margin-bottom, 24);
    .vertical-line {
      @include px2rem(width, 6);
      @include px2rem(height, 28);
      @include px2rem(margin-right, 12);
      background: #ff8c1a;
    }
    .title {
      @include px2rem(font-size, 28);
      line-height: 1;
    }
  }
  .top-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @include px2rem(margin-bottom, 96);
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
     @include px2rem(margin-bottom, 120);
    }
    img {
      @include px2rem(width, 340);
      @include px2rem(height, 160);
    }
  }
}
</style>
