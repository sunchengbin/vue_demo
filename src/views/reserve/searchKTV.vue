<template>
  <div class="searchKTV">
    <Search :hasName="hasName" />
    <div class="hot_search">
      <p>热门搜索</p>
      <ul class="hot_ktvs">
        <li v-for="(item,index) in store"
            :key="index"
            class="hot_ktv"
            @click="search(item)">
          <span>{{item}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Search from './search'
// import { dpHotCity, getWxAppid } from "@/service/getData";
// import { cookie } from "vux";

export default {
  components: { Search },
  data () {
    return {
      hasName: 'searchKTV',
      store: [],
      openid: '',
      ktv_id: 1
    }
  },
  created () {
    this.ktv_id = 1
    // _hmt.push(['_trackEvent', '点评网搜索ktv', '进入页面', 'gzh_searchKTV'])
    getWxAppid(this.ktv_id).then(res => {
      let openid = cookie.get('GZH_openid_3_' + this.ktv_id + '_' + res.appid)
      this.openid = openid
    }).then(res => {
      dpHotCity(this.openid, this.city).then(res => {
        this.store = res.store
      })
    })
  },
  methods: {
    search (ktv) {
      this.$router.push({
        path: '/reserve?ktv_id=1',
        query: {
          key: ktv
        }
      })
    }
  }
}
</script>

<style lang="scss">
.searchKTV {
  @include fontSize(15px);
  color: #666;
  .hot_search {
    @include px2rem(padding, 20 15);
    .hot_ktvs,
    .hot_ktv {
      list-style: none;
    }
    .hot_ktv {
      display: inline-block;
      background: #dededa;
      @include px2rem(border-radius, 3);
      @include px2rem(margin, 10 10 0 0);
      @include px2rem(width, 55);
      @include px2rem(height, 30);
      @include px2rem(line-height, 30);
      text-align: center;
      span {
        color: #333;
        @include fontSize(14px);
      }
    }
  }
}
</style>
