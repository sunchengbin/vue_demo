<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/help">Help</router-link> |
      <router-link to="/index">index</router-link> |
      <router-link to="/reserve">广场</router-link> |
      <router-link to="/mine">我的</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('getUserInfo')
  }
}
</script>


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
