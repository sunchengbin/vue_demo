<template>
  <div class="search">
    <div class="left_icon"
         v-if="hasName=='reserve'">
      <div class="name"
           @click="toAdress()"
           v-if="hasName=='reserve'">{{city}}</div>
      <!-- <img src="../../icons/foster_b.png" alt=""> -->
    </div>
    <form action="javaScript:;">
      <input v-if="hasName=='reserve'"
             id="search"
             v-model="key"
             placeholder="搜索KTV"
             class="searchInp searchInp1"
             @click="searchKTV()">
      <input v-else
             v-focus
             v-model="key"
             @keyup.enter="show($event)"
             name='search'
             ref="input1"
             type="search"
             :placeholder="hasName=='adress' ? '城市名/拼音' : '附近热搜KTV'"
             class="searchInp searchInp2"
             @click="searchKTV()">
      <p v-show="false">{{setKey}}
      </p>
      <img src="@/imgs/reserve/guanbi.png"
           class="close-btn"
           v-show="key !== ''"
           @click="clearKeyWords">
      <!--<button @click="btn()" v-if="hasName!='reserve'" v-show="false">搜索</button>-->
    </form>
  </div>
</template>

<script>
// import { dpStore } from "@/service/getData";
// import { getWxAppid } from "@/service/getData";
// import { cookie } from "vux";

export default {
  components: {},
  data () {
    return {
      key: this.$route.query.key || '',
      city: localStorage.getItem('city')
        ? localStorage.getItem('city')
        : '北京',
      openid: '',
      ktv_id: 1
    }
  },
  computed: {
    setKey: function () {
      this.$emit('key', this.key)
      return this.key
    }
  },
  props: ['hasName'],
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  },
  created () {
    // getWxAppid(this.ktv_id).then(res => {
    //   let openid = cookie.get('GZH_openid_3_' + this.ktv_id + '_' + res.appid)
    //   this.openid = openid
    // })
  },

  methods: {
    clearKeyWords () {
      this.key = ''
    },
    show (e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode === 13) {
        this.btn()
      };
    },
    toAdress () {
      this.$router.push({
        name: 'adress'
      })
    },
    searchKTV () {
      if (this.hasName !== 'adress') {
        this.$router.push({
          name: 'searchKTV'
        })
      }
    },
    btn () {
      //   dpStore(1, 10, "北京", "", this.key, this.openid).then(res => {
      //     console.log(res);
      //   });
      if (this.hasName !== 'adress') {
        this.$router.push({
          name: 'reserve',
          query: {
            key: this.key
          }
        })
      } else {
        localStorage.setItem('city', this.key)
        this.$router.push({
          name: 'reserve'
        })
      }
      //   this.$emit("filterStore", this.store);
    }
  }
}
</script>

<style lang="scss">
.search {
  @include fontSize(15px);
  border-bottom: 1px solid #f2f2f2;
  background: #fff;
  @include px2rem(height, 55);
  @include px2rem(line-height, 50);
  @include px2rem(padding-bottom, 20);
  .left_icon {
    @include px2rem(width, 115);
    @include px2rem(height, 50);
    background: url('../../imgs/reserve/foster_b.png') no-repeat right center;
    @include px2rem(background-size, 25 15);
    background-position: 97% 57%;
    .name {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      // padding-top: 8px;
      @include fontSize(15px);
      color: #666;
      text-align: left;
      @include px2rem(width, 85);
      @include px2rem(max-width, 100);
      @include px2rem(margin-left, 15);
      @include px2rem(line-height, 55);
    }
  }
  input {
    position: absolute;
    @include fontSize(15px);
    background: url('../../imgs/reserve/sousuo.png') no-repeat left;
    background-position: 3%;
    @include px2rem(background-size, 25);
    @include px2rem(height, 65);
    @include px2rem(padding-left, 15);
    @include px2rem(right, 30);
    @include px2rem(top, 80);
  }
  input::-webkit-search-cancel-button {
    display: none;
  }
  .close-btn {
    position: absolute;
    @include px2rem(top, 20);
    @include px2rem(right, 20);
    @include px2rem(width, 20);
  }
  .searchInp {
    outline: none;
    border-radius: 0.06rem;
    border: none;
    @include px2rem(text-indent, 30);
    @include px2rem(border-radius, 6);
    box-shadow: 0px 0px 10px 5px #f0f0f0;
  }
  .searchInp::-webkit-input-placeholder {
    color: #666;
  }
  .searchInp1 {
    @include px2rem(width, 570);
  }
  .searchInp2 {
    @include px2rem(margin-left, 15);
    @include px2rem(width, 700);
    @include px2rem(height, 55);
    @include px2rem(text-indent, 34);
  }
  button {
    position: absolute;
    @include px2rem(padding-top, 15);
  }
}
</style>
