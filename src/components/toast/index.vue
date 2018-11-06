<template>
  <transition name="toast-pop">
    <div class="toast" v-show="visible" :class="customClass" :style="{ 'padding': iconClass === '' ? '10px' : '20px' }">
      <svg-icon class-name="icon" :icon-class="iconClass" v-if="iconClass !== ''"/>
      <span class="text" :style="{ 'padding-top': iconClass === '' ? '0' : '10px' }">{{ message }}</span>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
  .toast {
    position: fixed;
    max-width: 80%;
    @include px2rem(border-radius, 10);
    background: rgba(0, 0, 0, 0.7);
    color: $write_font_color;
    box-sizing: border-box;
    text-align: center;
    z-index: 1000;
    transition: opacity .3s linear;
    // .icon { }
    .text {
      @include fontSize(12px);
      display: block;
      text-align: center;
    }
  }
  .placetop {
    top: 50px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .placemiddle {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .placebottom {
    bottom: 50px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .toast-pop-enter-active, .toast-pop-leave-active {
    transition: .5s;
  }
  .toast-pop-enter, .toast-pop-leave-to {
    opacity: 0;
  }
  .toast-pop-enter-to, .toast-pop-leave {
    opacity: 1;
  }
</style>
<script>
export default {
  props: {
    message: String,
    className: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'middle'
    },
    iconClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: true
    }
  },
  computed: {
    customClass () {
      console.log(this.position)
      var classes = []
      switch (this.position) {
        case 'top':
          classes.push('placetop')
          break
        case 'bottom':
          classes.push('placebottom')
          break
        default:
          classes.push('placemiddle')
      }
      classes.push(this.className)
      return classes.join(' ')
    }
  }
}
</script>
