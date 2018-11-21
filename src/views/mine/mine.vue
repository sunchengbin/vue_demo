<template>
  <div class="mine">
    <header>
      <!-- <img :src="headImg"
           alt=""> -->
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542805624867&di=7db30f5a268419f486360d265be30cb2&imgtype=0&src=http%3A%2F%2Fg-ec4.images-amazon.com%2Fimages%2FG%2F28%2Fcn-legacy%2Ft%2Fthss1102751.JPG" />
      <!-- <p>{{user_name}}</p> -->
      <p class="userName">笑哈哈
        <!-- <span>{{isVip ? 'vip' : ''}}</span> -->
        <span class="isVip">vip</span>
      </p>
    </header>
    <section>
      <ul>
        <appre />
      </ul>
    </section>
    <section class="myContent">
      <ul>
        <li v-for="item in myContent"
            :key="item.id"
            @click="toMyContent(item.routeName)">
          <svg-icon icon-class="zhufu_icon" />
          <p>{{item.name}}</p>
        </li>
      </ul>
    </section>
    <foot-bar current-page="首页" />
  </div>
</template>

<script>
import appre from '@/components/app/appreciation/appreciation'
export default {
  data () {
    return {
      myContent: [
        {
          id: 1,
          src: 'zhufu_icon',
          name: '我的会员',
          routeName: 'myVip'
        },
        {
          id: 2,
          src: 'zhufu_icon',
          name: '我的钱包',
          routeName: 'money'
        },
        {
          id: 3,
          src: 'zhufu_icon',
          name: '我的账单',
          routeName: 'bill'
        }
      ]
    }
  },
  components: {
    appre
  },
  computed: {
    headImg () {
      return this.$store.state.user_img
    },
    userName () {
      return this.$store.state.user_name
    },
    isVip () {
      return this.$store.state.is_vip
    }
  },
  methods: {
    toMyContent (routeName) {
      this.$router.push({
        name: 'myVip'
      })
    }
  }
}
</script>

<style lang="scss">
.mine {
  background: #eee;
  @include fontSize(16px);
  header {
    background: yellow;
    @include px2rem(height, 280);
    img {
      @include px2rem(width, 120);
      @include px2rem(height, 120);
      @include px2rem(margin-top, 25);
      @include px2rem(border-radius, 100);
    }
    .userName {
      @include px2rem(margin-top, 10);
      .isVip {
        color: red;
      }
    }
  }
  .myContent {
    @include px2rem(margin-top, 5);
    background: #fff;
    @include px2rem(padding, 20);
    ul {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
