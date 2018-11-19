<template>
  <transition name="pop">
    <div class="toast"
         v-show="visible"
         :class="costomClass"
         :style="{'padding':iconName===''?'0.5em':'1em'}">
      <svg-icon :iconClass='Icon'
                :className='toastSvg'
                v-show="iconName!==''" />
      <span>{{message}}</span>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'toast',
  props: {
    message: String,
    className: {// 样式
      type: String,
      default: ''
    },
    iconName: {// 图标信息
      type: String,
      default: ''
    },
    position: {// 位置
      type: String,
      default: ''
    },
    toastSvg: {
      type: String,
      default: 'toast-svg'
    }
  },
  data () {
    return {
      visible: false
    }
  },
  computed: {
    costomClass () {
      let classes = ''
      switch (this.position) {
        case 'top':
          classes += 'placeTop '
          break
        case 'bottom':
          classes += 'placeBottom '
          break
        default:
          classes += 'placeMiddle '
      }
      classes += this.className
      return classes
    },
    Icon () {
      if (this.iconName) {
        return this.iconName
      }
      return ''
    }

  }
}
</script>
<style lang="scss" scoped>
.toast {
  position: fixed;
  max-width: 80%;
  @include px2rem(border-radius, 10);
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  @include fontSize(16px);
  box-sizing: border-box;
  text-align: center;
  z-index: 1000;
  // opacity: 0;
  transition: opacity 0.5s linear;
  .toast-svg {
    @include px2rem(width, 40);
    @include px2rem(height, 40);
    vertical-align: middle;
    @include px2rem(margin-right, 10);
  }
}

.placeTop {
  @include px2rem(top, 50);
  left: 50%;
  transform: translate(-50%, 0);
}
.placeBottom {
  @include px2rem(bottom, 50);
  left: 50%;
  transform: translate(-50%, 0);
}
.placeMiddle {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.pop-enter,
.pop-leave-active {
  opacity: 0;
}
</style>
