<template>
  <div class="container-box">
    <div class="top">
      <div @click="changeQuery">{{query}}</div>
      <div v-for="list in lists" v-bind:key="list">
        {{list}}
      </div>
    </div>
    <div class="bottom">
      footer
    </div>
  </div>
</template>
<script>
export default {
  props: ['query'],
  data () {
    return {
      message: 'search',
      lists: []
    }
  },
  methods: {
    changeQuery () {
      this.$router.push({
        name: 'search',
        query: {
          q: 'change'
        }
      })
      // this.$router.push({
      //   name: 'index'
      // })
    }
  },
  beforeRouteUpdate (to, from, next) {
    console.log(1)
    console.log(to.query.q)
    console.log(this.query)
    this.$loading.close()
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('leave')
    next()
  },
  mounted () {
    for (let i = 0; i < 50; i++) {
      this.lists.push(`this list is ${i}`)
    }
    this.$loading.close()
  }
}
</script>
<style lang="scss" scoped>
.container-box {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .top {
    flex-grow: 1;
    overflow-y: scroll;
  }
  .bottom {
    flex-grow: 0;
    @include px2rem(min-height, 80);
    @include px2rem(line-height, 80);
    background-color: red;
  }
}
</style>
