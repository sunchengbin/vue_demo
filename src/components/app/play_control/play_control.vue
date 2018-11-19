<template>
  <div class="play-control">
    <p class="control-btn"
       @click="showPad">
      遥控
    </p>
    <control-pad v-show="show_pad"
                 @hideControlpad='hideControlpad'></control-pad>
  </div>
</template>
<script>
import controlPad from './control_pad'
export default {
  name: '',
  data () {
    return {
      show_pad: false
    }
  },
  methods: {
    showPad () {
      this.show_pad = true
    },
    hideControlpad () {
      this.show_pad = false
    }
  },
  components: {
    controlPad
  },
  directives: {
    // 拖动按钮实现
    // drag: {
    //     bind: function (el) {
    //         let oDiv = el;   //当前元素
    //         let self = this;  //上下文
    //         oDiv.ontouchstart(function (e) {
    //             //鼠标按下，计算当前元素距离可视区的距离
    //             let disX = e.clientX - oDiv.offsetLeft;
    //             let disY = e.clientY - oDiv.offsetTop;

    //             document.ontouchmove(function (e) {
    //                 //通过事件委托，计算移动的距离
    //                 let l = e.clientX - disX;
    //                 let t = e.clientY - disY;
    //                 //移动当前元素
    //                 oDiv.style.left = l + 'px';
    //                 oDiv.style.top = t + 'px';
    //             });
    //             document.ontouchend(function (e) {
    //                 document.onmousemove = null;
    //                 document.onmouseup = null;
    //             });
    //         });
    //     }
    // }
  }
}
</script>
<style lang="scss" scoped>
.control-btn {
  z-index: 1000;
  position: fixed;
  top: 75%;
  @include px2rem(right, 30);
  display: flex;
  justify-content: center;
  align-items: center;
  @include px2rem(width, 100);
  @include px2rem(height, 100);
  border-radius: 100%;
  @include fontSize(14px);
  background-image: linear-gradient(
    -180deg,
    rgba(250, 217, 97, 0.7) 0%,
    rgba(247, 107, 28, 0.8) 100%
  );
  box-shadow: 0 1px 4px 0 rgba(255, 118, 0, 0.3);
  color: #fff;
}
</style>
