<template>
  <footer>
    <ul class="foot-bar">
      <li v-for="item in footIcons"
          :key="item.id"
          @click="handleClick(item.routeTo||'/thunder/home')">
        <svg-icon v-if="item.name"
                  :icon-class="currentPage === item.name ? item.activeSrc : item.defaultSrc"
                  class-name="side" />
        <img v-else
             src="./imgs/charge_icon.png"
             alt=""
             class="center">
        <p v-if="item.name">{{item.name}}</p>
      </li>
    </ul>
  </footer>
</template>

<script>
import footIcons from './static'

export default {
  name: 'foot-bar',
  props: {
    // 当前页，用以改变底部icon样式
    currentPage: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      footIcons: footIcons
    }
  },
  methods: {
    handleClick (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.center {
  @include px2rem(width, 90);
  @include px2rem(height, 90);
  @include px2rem(margin-top, 16);
}
svg.side {
  @include px2rem(width, 50);
  @include px2rem(height, 50);
  @include px2rem(margin-top, 16);
}
.foot-bar {
  z-index: 1000;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding-bottom: constant(safe-area-inset-bottom);
  border-top: 1px solid rgba(131, 131, 131, 0.2);
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    &:nth-child(2) {
      svg.icon {
        @include fontSize(50px);
      }
    }
  }
}
</style>
