<template>
  <div class="adress">
    <search :hasName="hasName"
            @key="setKey" />
    <div class="city"
         v-show="!key">
      <div class="location"
           id="container">
        <img src="@/imgs/reserve/dingwei.png"
             alt="">
        <span @click="search(city,true)"
              style="font-family:'中黑体'">{{city}}北京</span>
        <span class="location_txt">GPS定位</span>
      </div>
      <div class="history">
        <p class="active_title">历史访问城市</p>
        <ul>
          <li class="h_city"
              v-for="(item,index) in history_city"
              :key="index"
              @click="search(item)">{{item}}</li>
        </ul>
      </div>
      <div class="hot_city">
        <p class="active_title">热门城市</p>
        <ul>
          <li class="h_city"
              v-for="(item,index) in hot_city"
              :key="index"
              @click="search(item)">{{item}}</li>
        </ul>
      </div>
    </div>
    <City v-show="!key" />
    <div class="city-filter"
         v-if="key">
      <span class="city-title">搜索结果</span>
      <ul class="city-lists"
          v-if="cityFilterList.length > 0">
        <li class="list-item"
            v-for="(item, index) in cityFilterList"
            :key="index"
            @click="clickCity(item.cityName)">{{item.cityName}}</li>
      </ul>
      <div class="no-data"
           v-else>抱歉，没有搜索结果哦！</div>
    </div>
  </div>
</template>

<script>
import Search from './search'
import City from './city'
import CityPlugin from '@/libs/utils/city.js'
import {
  apis,
  chttp
} from '@/libs/interfaces'

export default {
  components: { Search, City },
  data () {
    return {
      hasName: 'adress',
      history_city: [],
      hot_city: [],
      openid: '',
      ktv_id: 1,
      city: localStorage.getItem('location_city'),
      key: '',
      cityFilterList: [],
      cityList: [] // 初始城市数据
    }
  },
  created () {
    chttp.get(apis.dpCity).then(res => {
      this.cityList = CityPlugin.formatCitys(res.all_city)
      this.hot_city = res.hot_city
      this.history_city = res.history_city
    }).catch(err => {
      this.$toast(err)
    })
  },
  methods: {
    search (city, location) {
      localStorage.setItem('city', city)
      this.$router.push({
        name: 'reserve'
      })
    },
    clickCity (city) {
      localStorage.setItem('city', city)
      this.$router.push({
        name: 'reserve'
      })
    },
    setKey (newVal) {
      this.key = newVal
      this.cityFilterList = CityPlugin.searchCitys(this.cityList, this.key)
    }
  }
}
</script>

<style lang="scss">
.adress {
  text-align: left;
  @include fontSize(16px);
  color: #333;
  background: #f2f2f2;
  .active_title {
    @include fontSize(13px);
  }
  ul,
  li {
    list-style: none;
  }
  li {
    display: inline-block;
  }
  .city {
    @include px2rem(padding, 0 15 15);
    background: #fff;
    .location {
      @include fontSize(16px);
      border-bottom: 1px solid #dedede;
      @include px2rem(padding, 18 0);
      .location_txt {
        color: #666;
        @include fontSize(12px);
        @include px2rem(margin-left, 10);
      }
      img {
        width: 0.13rem;
        height: 0.15rem;
        @include px2rem(width, 25);
        @include px2rem(height, 30);
        vertical-align: middle;
        @include px2rem(margin-right, 10);
      }
    }
    p {
      color: #666;
    }
    .history {
      @include px2rem(padding, 20 0);
    }
    .h_city {
      @include fontSize(14px);
      @include px2rem(width, 180);
      @include px2rem(height, 66);
      border: 1px solid #dedede;
      @include px2rem(border-radius, 8);
      text-align: center;
      @include px2rem(line-height, 66);
      @include px2rem(margin, 20 20 0 0);
      vertical-align: middle;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .city-filter {
    width: 100%;
    .city-lists {
      background: #ffffff;
      .list-item {
        @include px2rem(padding-left, 10);
        @include px2rem(line-height, 36);
        @include px2rem(border-bottom, 10);
        display: block;
        &:last-child {
          border-bottom: none;
        }
      }
    }
    .no-data {
      @include px2rem(padding-top, 20);
      @include px2rem(line-height, 30);
      @include fontSize(18px);
      text-align: center;
    }
  }
}
</style>
