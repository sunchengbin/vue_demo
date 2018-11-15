<template>
  <transition name="toast-pop">
    <div class="toast" v-show="visible" :class="customClass">
      <div class="icon-box" v-if="iconClass !== ''">
        <svg-icon class-name="icon" :icon-class="iconClass"/>
      </div>
      <div class="text">{{ message }}</div>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
  .toast {
    position: fixed;
    max-width: 80%;
    @include px2rem(border-radius, 10);
    @include px2rem(padding, 10 15);
    background: $dialog_bg_color;
    color: $write_font_color;
    box-sizing: border-box;
    z-index: 1000;
    transition: opacity .3s linear;
    display: flex;
    .icon-box, .text {
      display: flex;
      align-items: center;
      @include fontSize(12px);
    }
    .icon-box {
      flex-grow: 0;
      .icon {
        @include px2rem(width, 40);
        @include px2rem(height, 40);
        @include px2rem(margin-right, 10);
      }
    }
    .text {
      flex-grow: 1;
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
