<template>
  <div class="reserve">
    <search :hasName="hasName" />
    <ul class="ktv_list">
      <li v-for="(item,index) in store"
          class="ktv_li"
          :key="index"
          @click="openGzh(item.url)">
        <div class="ktv_tu">
          <img :src="item.img"
               alt=""
               class="ktv_img">
        </div>
        <div class="rigth">
          <p class="name">{{item.name}}</p>
          <rater v-model="item.remark_score"
                 slot="value"
                 active-color="#fa4f45"
                 :font-size="16"
                 disabled></rater>
          <span class="count">{{item.remark_count}}条</span>
          <span v-if="item.is_wgw"
                class="isMR">
            <img src="@/imgs/reserve/reserveSv.png"
                 alt="">
            <img src="@/imgs/reserve/reserveMb.png"
                 alt="">
          </span>
          <div class="address">
            <span class="adds">{{item.address}}
              <span class="dis">{{item.distance}}</span>
            </span>
          </div>
        </div>
        <!--<p class="remark">-->
        <!--欢迎👏-->
        <!--</p>-->
      </li>
    </ul>
    <div class="footer">
      <p class="shuaxin"
         @click="refresh()">
        <span v-show="showTitle">点击刷新更多
          <img src="@/imgs/reserve/shuaxin.png"
               class="img_icon1"
               alt="">
        </span>
        <span v-show="!showTitle">没有更多内容了
          <img src="@/imgs/reserve/meiyoule.png"
               class="img_icon2"
               alt="">
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import Search from './search'
// import { Rater } from "vux";
// import { dpStore, getWxAppid, getWxConfig } from "@/service/getData";
import Wx from '@/libs/app/weixin'

export default {
  components: { Search },
  data () {
    return {
      hasName: 'reserve',
      isRefresh: true,
      showTitle: true,
      showLoad: true, // 显示加载动画
      key: this.$route.query.key || '',
      city: localStorage.getItem('city') ? localStorage.getItem('city') : '北京',
      store: [],
      openid: '',
      p: 1,
      ps: 20,
      ktv_id: 1,
      longitude: '',
      latitude: '',
      location_city: localStorage.getItem('location_city') || ''
    }
  },
  beforeRouteEnter (to, from, next) {
    var u = navigator.userAgent
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    // XXX: 修复iOS版微信HTML5 History兼容性问题
    if (isiOS && to.path !== location.pathname) {
      // 此处不可使用location.replace
      location.assign(to.fullPath)
    } else {
      next()
    }
  },
  created () {
    let that = this
    // _hmt.push(['_trackEvent', '点评网首页', '进入页面', 'gzh_reserve'])
    Wx.getLocation(that)
  },
  methods: {
    openGzh (url) {
      // const ktv_id = url.split("ktv_id=")[1];
      location.href = url
    },
    filterStore (store) {
      this.store = store
    },
    refresh () {
      if (!this.isRefresh) {
        return
      }
      this.showLoad = true
      this.p++
      dpStore(this.p, this.ps, this.city, this.latitude, this.longitude,
        this.location_city, this.key ? this.key : '', this.openid).then(res => {
        if (res.store.length < this.ps) {
          this.isRefresh = false
          this.showTitle = !this.showTitle
        }
        // res.store.forEach(item=>{
        //   this.store.push(item);
        //   this.showLoad = false;
        // })
        this.store = this.store.concat(res.store)
        this.showLoad = false
      })
    }

  }
}
</script>

<style lang="scss">
.reserve {
  @include fontSize(15px);
  background: #f2f2f2;
  .ktv_list {
    li {
      @include px2rem(margin-top, 10);
      background: #fff;
      @include px2rem(height, 60);
      &:first-of-type {
        margin-top: 0;
      }
      .remark {
        @include px2rem(padding-left, 15);
      }
    }
    .ktv_li {
      display: flex;
      border-bottom: 1px solid #f2f2f2;
      @include px2rem(height, 129);
      .ktv_tu {
        @include px2rem(padding, 15);
        img {
          @include px2rem(width, 99);
          @include px2rem(height, 99);
        }
      }
      .rigth {
        @include px2rem(padding-top, 15);
        width: 65%;
        /*margin-left: 0.3rem;*/
        .isMR {
          @include px2rem(margin-left, 10);
          img {
            @include px2rem(width, 50);
          }
        }
        .vux-rater {
          text-align: left;
          display: inline-block;
          line-height: normal;
          @include px2rem(margin, 0 0 5);
          a.vux-rater-box {
            color: #dedede;
            margin-right: 1px !important;
            width: 16px !important;
          }
        }
        .name {
          font-family: '平方中黑';
          @include fontSize(20px);
          color: #333;
          @include px2rem(height, 55);
          @include px2rem(line-height, 26);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .count {
          color: #999;
          @include fontSize(11px);
          display: block;
          display: inline-block;
          vertical-align: top;
          @include px2rem(padding-top, 5);
        }
        .address {
          color: #666;
          @include fontSize(14px);
          // padding: .08rem 0.05rem 0 0;
          overflow: hidden;
          .adds {
            @include fontSize(14px);
            color: #666;
          }
          .dis {
            // color: #999;
            @include px2rem(margin-left, 10);
          }
          .address_title {
            display: inline-block;
            /*margin-top: 0.03rem;*/
          }
          .isMR {
            float: right;
            @include px2rem(margin-right, 15);
            img {
              @include px2rem(width, 50);
            }
          }
        }
      }
    }
  }
  .footer {
    width: 100%;
    position: relative;
    bottom: 0;
    @include fontSize(15px);
    @include px2rem(padding, 10);
    color: #999999;
    text-align: center;
    vertical-align: middle;
    .shuaxin {
      span {
        .img_icon1 {
          @include px2rem(width, 15);
          @include px2rem(height, 15);
          vertical-align: middle;
        }
        .img_icon2 {
          @include px2rem(width, 50);
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
