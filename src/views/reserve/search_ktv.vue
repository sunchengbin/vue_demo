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
import {
  apis,
  chttp
} from '@/libs/interfaces'

export default {
  components: { Search },
  data () {
    return {
      hasName: 'searchKTV',
      store: [],
      ktv_id: 1,
      openid: 'o3JAqt0Jr9vtoVncMW7ZBnHFvUd&unionid'
    }
  },
  created () {
    this.ktv_id = 1
    // _hmt.push(['_trackEvent', '点评网搜索ktv', '进入页面', 'gzh_searchKTV'])
    let data = {
      openid: this.openid,
      city: this.city
    }
    chttp.get(apis.hotStore, {
      params: data
    }).then(res => {
      this.store = res.store
    }).catch(err => {
      this.$toast(err)
    })
  },
  methods: {
    search (ktv) {
      this.$router.push({
        name: 'reserve',
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
    text-align: left;
    @include px2rem(padding, 20 45);
    .hot_ktvs,
    .hot_ktv {
      list-style: none;
    }
    .hot_ktv {
      display: inline-block;
      background: #dededa;
      @include px2rem(border-radius, 3);
      @include px2rem(margin, 20 20 0 0);
      @include px2rem(width, 95);
      @include px2rem(height, 55);
      @include px2rem(line-height, 55);
      text-align: center;
      span {
        color: #333;
        @include fontSize(14px);
      }
    }
  }
}
</style>
