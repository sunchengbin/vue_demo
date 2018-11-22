<template>
  <!--搜索模块-->
  <div class="search-tab">
    <div class="head-bar">
      <img class="vip-icon"
           :src="vip_icon"
           @click="jump('/thunder/myvip')">
      <div class="search-bar">
        <p class="search-region"
           @click="jump('/thunder/search')">
          <img src="./images/search.png"
               alt="">
          <span class="search-title">输入歌曲名、歌星名</span>
        </p>
        <span class="vertical-line"></span>
        <p class="voice-region"
           @click="showVoice">
          <img src="./images/voice_ctrl.png"
               alt="">
        </p>
      </div>
      <img class="ordered-icon"
           src="./images/ordered_icon.png"
           @click="jump('/thunder/ordered')"
           alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {}
  },
  computed: {
    is_vip () {
      return false
    },
    vip_icon () {
      return this.is_vip ? require('./images/my_vip_icon.png') : require('./images/open_vip_icon.png')
    }
  },
  methods: {
    jump (path) {
      this.$router.push(path)
    },
    showVoice () {
      this.$store.commit('OPEN_THUNDER_VOICE')
    }
  }
}
</script>
<style lang="scss" scoped>
.search-tab {
  z-index: 100;
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  @include px2rem(height, 84);
  background-image: linear-gradient(
    -90deg,
    #ff8c1a 0%,
    #ff7d0e 39%,
    #ff6d00 100%
  );
}

.head-bar {
  display: flex;
  align-items: center;
  @include px2rem(padding, 0 20);
  width: 100%;
  .vip-icon {
    @include px2rem(width, 84);
    @include px2rem(height, 52);
    pointer-events: auto;
  }
  .ordered-icon {
    @include px2rem(width, 72);
    @include px2rem(height, 48);
    pointer-events: auto;
  }
  .search-bar {
    display: flex;
    align-items: center;
    flex-grow: 1;
    @include px2rem(height, 60);
    @include px2rem(margin, 0 20);
    border-radius: 2px;
    background: #fff;
    .search-title {
      @include px2rem(margin-left, 0 20);
      @include fontSize(14px);
      color: #ff7d0e;
    }
  }
  .search-region {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 85%;
    height: 100%;
    img {
      @include px2rem(width, 32);
      @include px2rem(height, 32);
    }
  }
  .vertical-line {
    background: #cccccc;
    border-radius: 1px;
    @include px2rem(width, 2);
    @include px2rem(height, 24);
  }
  .voice-region {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    height: 100%;
    img {
      @include px2rem(width, 24);
      @include px2rem(height, 32);
    }
  }
}
</style>
