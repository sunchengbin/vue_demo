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
// import Search from "./search";
// import Pinyin from "pinyin";
// import { cookie } from "vux";
import CityPlugin from '@/libs/utils/city.js'
// import { dpCity, getWxAppid } from "@/service/getData";

export default {
  components: {},
  data () {
    return {
      citys: [],
      openid: '',
      ktv_id: 1,
      tipAppear: false,
      tipTxt: ''
    }
  },
  created () {
    this.ktv_id = 1
    getWxAppid(this.ktv_id).then(res => {
      let openid = cookie.get('GZH_openid_3_' + this.ktv_id + '_' + res.appid)
      this.openid = openid
    }).then(res => {
      dpCity(this.openid).then(res => {
        this.citys = CityPlugin.formatCitys(res.all_city)
        // this.citys = CityPlugin.formatCitys(this.citys);
        // console.log(this.citys);
      })
    })
  },
  methods: {
    // clickLeter(letter) {
    //   this.tipTxt = letter;
    //   this.tipAppear = true;
    //   setTimeout(()=> {
    //     this.tipAppear=false;
    //   },500)
    // },
    clickCity (city) {
      localStorage.setItem('city', city)
      this.$router.push({
        path: '/reserve?ktv_id=1'
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
    @include px2rem(height, 44);
    @include px2rem(line-height, 44);
  }
  .rightCity {
    @include px2rem(width, 40);
    color: #d85750;
    text-align: center;
    position: fixed;
    @include px2rem(top, 80);
    right: 0;
    overflow-y: auto;
    @include fontSize(14px);
    li {
      display: block;
      @include px2rem(height, 18);
      height: 0.18rem;
      a {
        color: #d85750;
      }
    }
  }
}
</style>
