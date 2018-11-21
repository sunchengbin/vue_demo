<template>
  <div class="citys">
    <ul class="detail_city">
      <li class="leftCity"
          v-for="(item, index) in citys"
          :key="index">
        <span class="city-title"
              :id="`mubiao`+index">{{item.letter}}</span>
        <ul class="item-box">
          <li class="city-item"
              v-for="(city,idx) in item.citys"
              @click="clickCity(city)"
              :key="idx">{{city}}</li>
        </ul>
      </li>
    </ul>
    <div class="rightCity">
      <span>区县热门</span>
      <ul>
        <li v-for="(item, index) in citys"
            :key="index">
          <a :href="`#mubiao`+index">{{item.letter}}</a>
        </li>
      </ul>
    </div>
    <div class="tip-box"
         v-show="tipAppear">{{tipTxt}}</div>
  </div>
</template>

<script>
import CityPlugin from '@/libs/utils/city.js'
import {
  apis,
  chttp
} from '@/libs/interfaces'

export default {
  components: {},
  data () {
    return {
      citys: [],
      ktv_id: 1,
      tipAppear: false,
      tipTxt: '',
      openid: 'o3JAqt0Jr9vtoVncMW7ZBnHFvUd'
    }
  },
  created () {
    this.ktv_id = 1
    chttp.get(apis.dpCity, {
      params: { openid: this.openid }
    }).then(res => {
      this.citys = CityPlugin.formatCitys(res.all_city)
    }).catch(err => {
      this.$toast(err)
    })
  },
  methods: {
    clickCity (city) {
      localStorage.setItem('city', city)
      this.$router.push({
        name: 'reserve'
      })
    }
  }
}
</script>

<style lang="scss">
.citys {
  background: #fff;
  @include px2rem(margin-top, 10);
  @include px2rem(padding, 15);
  .tip-box {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background-color: #acd6ff;
    color: #ffffff;
    @include fontSize(40px);
    text-align: center;
    line-height: 60px;
    /*z-index: -1;*/
  }
  .leftCity,
  .city-item {
    display: block;
    border-bottom: 1px solid #dedede;
    overflow-y: auto;
    &:last-child {
      border-bottom: none;
    }
  }
  .city-item {
    @include px2rem(height, 74);
    @include px2rem(line-height, 74);
  }
  .rightCity {
    @include px2rem(width, 60);
    color: #d85750;
    text-align: center;
    position: fixed;
    @include px2rem(top, 180);
    right: 0;
    overflow-y: auto;
    @include fontSize(14px);
    li {
      display: block;
      @include px2rem(height, 28);
      a {
        color: #d85750;
      }
    }
  }
}
</style>
