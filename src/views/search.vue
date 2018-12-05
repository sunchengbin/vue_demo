<template>
  <div>
    <div @click="changeQuery">{{query}}</div>
  </div>
</template>
<script>
export default {
  props: ['query'],
  data () {
    return {
      message: 'search'
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
    this.$loading.close()
  }
}
</script>
