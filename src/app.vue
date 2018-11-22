<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  text-align: center;
  height: 100%;
}
#nav {
  @include px2rem(padding, 30);
  a {
    font-weight: bold;
    &.router-link-exact-active {
      color: $active_font_color;
    }
  }
}
</style>

<script>
export default {
  created () {
    let loading = document.getElementById('loading')
    setTimeout(() => {
      if (loading) {
        document.body.removeChild(loading)
      }
    }, 0)
  }
}
</script>
