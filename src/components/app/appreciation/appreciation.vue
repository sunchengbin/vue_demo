<template>
  <div class="appreciation">
    <ul class="appre">
      <li v-for="(item,index) in appre"
          :key="index"
          @click="toAppre(item.routeName)">
        <svg-icon icon-class="zhufu_icon" />
        <p>{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import appre from './static'
export default {
  data () {
    return {
      appre: appre.appre
    }
  },
  created () {
    console.log(this.appre)
  },
  methods: {
    toAppre (routeName) {
      this.$router.push({
        name: routeName
      })
    }
  }
}
</script>

<style lang="scss">
.appreciation {
  @include px2rem(margin-bottom, 20);
  .appre {
    display: flex;
    @include px2rem(padding, 30 40 40);
    justify-content: space-around;
    @include fontSize(14px);
    background: #fff;
  }
}
</style>
