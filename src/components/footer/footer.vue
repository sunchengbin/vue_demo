<template>
  <footer class="footer">
    <ul>
      <li v-for="item in footerIcon"
          :key="item.id"
          @click="handleClick(item.routeTo||'/thunder/home')">
        <p>
          <!--针对当前页面，改变底部导航icon的样式-->
          <SvgIcon :icon-class="current_page == item.name||(index===2 && open_voice) ? item.activeSrc : item.defaultSrc"
                   :class-name="!item.name ? 'center' : 'side'" />
        </p>
        <p v-if="item.name">{{item.name}}</p>
      </li>
    </ul>
  </footer>
</template>

<script>
import footerIcon from './static'
import SvgIcon from '../svg_icon/svg'

export default {
  name: 'footer',
  props: {
    // 当前页，用以改变底部icon样式
    current_page: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      footerIcon: footIcons,
    }
  },
  methods: {
    handleClick (path) {
      this.$router.push(path);
    }
  }

}
</script>

<style lang="scss" scoped>
svg.center {
  width: 1.2rem;
  height: 1.2rem;
  margin-top: 0.2rem;
}
svg.side {
  width: 0.8rem;
  height: 0.8rem;
}
.foot-bar {
  z-index: 1000;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
  /*height: remOld(210);*/
  padding: remOld(22) remOld(60) 0;
  padding-bottom: constant(safe-area-inset-bottom);
  border-top: 1px solid rgba(131, 131, 131, 0.2);
  // background: $background2;
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    &:nth-child(2) {
      svg.icon {
        font-size: 50px;
        margin-top: 2px;
      }
    }
  }
  img {
    width: remOld(62);
    height: remOld(62);
  }
  li:nth-child(2) {
    margin-top: remOld(-26);
    img {
      width: remCalc(147/3);
      height: remCalc(153/3);
    }
  }
}
</style>
