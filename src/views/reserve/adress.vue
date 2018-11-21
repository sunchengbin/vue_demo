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
              style="font-family:'中黑体'">{{city}}</span>
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
// import { cookie } from "vux";
// import { dpCity, getWxAppid, getWxConfig } from "@/service/getData";
import CityPlugin from '@/libs/utils/city.js'

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
    dpCity('').then(res => {
      this.cityList = CityPlugin.formatCitys(res.all_city)
    })
    this.ktv_id = 1
    getWxAppid(this.ktv_id).then(res => {
      let openid = cookie.get('GZH_openid_3_' + this.ktv_id + '_' + res.appid)
      this.openid = openid
    }).then(res => {
      dpCity(this.openid).then(res => {
        this.hot_city = res.hot_city
        this.history_city = res.history_city
      })
    })
  },
  methods: {
    search (city, location) {
      localStorage.setItem('city', city)
      this.$router.push({
        path: 'reserve?ktv_id=1'
      })
    },
    clickCity (city) {
      localStorage.setItem('city', city)
      this.$router.push({
        path: '/reserve?ktv_id=1'
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
      @include px2rem(padding, 12 0);
      .location_txt {
        color: #666;
        @include fontSize(12px);
      }
      img {
        width: 0.13rem;
        height: 0.15rem;
        @include px2rem(width, 13);
        @include px2rem(height, 15);
        vertical-align: middle;
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
      @include px2rem(width, 10);
      @include px2rem(height, 36);
      border: 1px solid #dedede;
      @include px2rem(border-radius, 4);
      text-align: center;
      @include px2rem(line-height, 36);
      @include px2rem(margin, 10 10 0 0);
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
