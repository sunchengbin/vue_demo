<template>
  <div class="msgbox-wrapper">
    <div>
      <button @click="show=!show">show</button>
      <transition name="fade">
        <div v-show="show">
          <div class="msgbox-header"
               v-if="title !== ''">
            <div>{{ title }}</div>
          </div>
          <div class="msgbox-content"
               v-if="content !== ''">
            <div>{{ content }}</div>
          </div>
          <div class="msgbox-btns">
            <button :class="cancelButtonClasses"
                    @click="handleAction('cancel')"
                    v-show="showCancelButton">{{ cancelText }}</button>
            <button :class="confirmButtonClasses"
                    @click="handleAction('confirm')"
                    v-show="showConfirmButton">{{ confirmText }}</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      show: false, // 控制message-box组件是否显示
      title: '我是头部',  // 头部内容
      content: '好多内容哦好多内容呐好多内容呀', // 组件的主要显示的内容
      cancelText: '取消', // 取消按钮的内容
      confirmText: '确认', // 确认按钮的内容
      showCancelButton: true, // 控制取消按钮的展示与隐藏
      showConfirmButton: true, // 控制确认按钮的显示与隐藏
      confirmButtonClass: '', // 传递的取消按钮的样式
      cancelButtonClass: '', // 传递的确认按钮的样式
      cncelButtonHighlight: false, // 是否会传递取消按钮的特殊样式class
      confirmButtonHighlight: false, // 是否会传递确认按钮的特殊样式class
    }
  },
  computed: {
    // 计算属性计算取消、确认按钮class名称，此处用两个函数，不用传参数的方法是因为会报错is not a function
    cancelButtonClasses () {
      let classes = 'msgbox-btn msgbox-btn-cancel ' + this.cancelButtonClass
      if (this.cancelButtonHighlight) {
        classes += ' msgbox-cancel-highlight'
      }
      return classes
    },
    confirmButtonClasses () {
      let classes = 'msgbox-btn msgbox-btn-confirm ' + this.confirmButtonClass
      if (this.confirmButtonHighlight) {
        classes += ' msgbox-confirm-highlight'
      }
    }
  },
  methods: {
    handleAction (action) {
      console.log(action)
    }
  }
}
</script>
<style type="scss">
.fade-enter {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.7);
}
.fade-leave-active {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.9);
}
</style>
