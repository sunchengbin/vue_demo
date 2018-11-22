<!--
使用说明：
  1> 在要应用的组件引入 import bottomEntry from '@/components/footer/bottom_entry'
  2> 注册组件
  3> 应用 <bottomEntry />
-->
<template>
  <div class="bottom_entry">
    <ul class="entries">
      <li v-for="(item, index) in entries"
          @click.stop="jump(item.route)"
          :key="index">
        <img :src="item.icon"
             alt="">
        <span class="name">{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import COMMON from './static'
import COMMONURL from '@/libs/base/common'
export default {
  name: '',
  computed: {
    openid () {
      return 'o3JAqt0Jr9vtoVncMW7ZBnHFvUd'
    },
    unionid () {
      return 'o6qE3t8QKr3uYqrgbknYUSE72RiM'
    },
    is_bind () {
      return true
    }
  },
  data () {
    return {
      entries: COMMON.entry
    }
  },
  methods: {
    jump (path) {
      if (path === 'charge') {
        this.$router.push('/thunder/charge')
        return
      }
      if (!this.is_bind) {
        Vue.$toast('请扫码绑定房台')
        return
      }
      if (path === 'zhufu') {
        window.location.href = COMMONURL.realmName + '?p=banner&action=10&openid=' + this.openid + '&unionid=' + this.unionid
      } else if (path === 'biaobai') {
        window.location.href = COMMONURL.realmName + '?p=banner&action=12&openid=' + this.openid + '&unionid=' + this.unionid
      }
    }
  },
  components: {}
}
</script>
<style lang="scss" scoped>
.bottom_entry {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.entries {
  display: flex;
  @include px2rem(margin, 0 18 18);
  justify-content: space-between;
  @include px2rem(padding, 15);
  @include px2rem(border-radius, 5);
  box-shadow: 2px 5px 8px 5px #ddd;
  background: #fff;
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    @include px2rem(height, 60);
    @include px2rem(width, 200);
    @include px2rem(border-radius, 100);
    background-image: linear-gradient(-45deg, #ff4a46 0%, #ff826e 100%);
    box-shadow: 0 2px 4px 0 rgba(255, 0, 0, 0.35);
    img {
      @include px2rem(width, 50);
      @include px2rem(height, 50);
      @include px2rem(margin-top, 5);
    }
    .name {
      @include px2rem(font-size, 28);
      font-family: NotoSansHans-Medium;
      color: #fff;
    }
  }
}
</style>
