<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  min-height: 100vh;
}
#nav {
  text-align: center;
  @include px2rem(padding, 30);
  a {
    font-weight: bold;
    &.router-link-exact-active {
      color: $active_font_color;
    }
  }
}
</style>
