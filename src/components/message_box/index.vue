<template>
  <div class="msgbox-wrapper">
    <transition name="fade">
      <div class="msgbox"
           v-show="value">
        <div class="msgbox-title"
             v-if="title !== ''">
          <div class="title">{{ title }}</div>
        </div>
        <div class="msgbox-content"
             v-if="message !== ''"
             :class="title !== ''?'msgbox-content content_pad_yt':'msgbox-content content_pad_nt'">
          <div class="content"
               v-html="message"></div>
          <div class="mint-msgbox-input"
               v-show="showInput">
            <input v-model="inputValue"
                   :placeholder="inputPlaceholder"
                   ref="input">
            <div class="mint-msgbox-errormsg"
                 :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
          </div>
        </div>
        <div class="msgbox-btns">
          <button :class="[ cancelButtonClasses ]"
                  v-show="showCancelButton"
                  @click="handleAction('cancel')">{{ cancelButtonText }}</button>
          <button :class="[ confirmButtonClasses ]"
                  v-show="showConfirmButton"
                  @click="handleAction('confirm')">{{ confirmButtonText }}</button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/babel">
let CONFIRM_TEXT = '确定'
let CANCEL_TEXT = '取消'
export default {
  props: {
    modal: {
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      default: true
    },
    closeOnPressEscape: {
      default: true
    },
    inputType: {
      type: String,
      default: 'text'
    }
  },
  computed: {
    confirmButtonClasses () {
      let classes = 'msgbox-btn msgbox-btn-confirm ' + this.confirmButtonClass
      if (this.confirmButtonHighlight) {
        classes += ' msgbox-confirm-highlight'
      }
      return classes
    },
    cancelButtonClasses () {
      let classes = 'msgbox-btn msgbox-btn-cancel ' + this.cancelButtonClass
      if (this.cancelButtonHighlight) {
        classes += ' mmsgbox-cancel-highlight'
      }
      return classes
    }
  },
  methods: {
    doClose () {
      this.value = false
      this._closing = true
      this.onClose && this.onClose()
      setTimeout(() => {
        if (this.modal && this.bodyOverflow !== 'hidden') {
          document.body.style.overflow = this.bodyOverflow
          document.body.style.paddingRight = this.bodyPaddingRight
        }
        this.bodyOverflow = null
        this.bodyPaddingRight = null
      }, 200)
      this.opened = false
      if (!this.transition) {
        this.doAfterClose()
      }
    },
    handleAction (action) {
      if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
        return
      }
      var callback = this.callback
      this.value = false
      callback(action)
    },
    validate () {
      if (this.$type === 'prompt') {
        var inputPattern = this.inputPattern
        if (inputPattern && !inputPattern.test(this.inputValue || '')) {
          this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!'
          this.$refs.input.classList.add('invalid')
          return false
        }
        var inputValidator = this.inputValidator
        if (typeof inputValidator === 'function') {
          var validateResult = inputValidator(this.inputValue)
          if (validateResult === false) {
            this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!'
            this.$refs.input.classList.add('invalid')
            return false
          }
          if (typeof validateResult === 'string') {
            this.editorErrorMessage = validateResult
            return false
          }
        }
      }
      this.editorErrorMessage = ''
      this.$refs.input.classList.remove('invalid')
      return true
    },
    handleInputType (val) {
      if (val === 'range' || !this.$refs.input) return
      this.$refs.input.type = val
    }
  },
  watch: {
    inputValue () {
      if (this.$type === 'prompt') {
        this.validate()
      }
    },
    value (val) {
      this.handleInputType(this.inputType)
      if (val && this.$type === 'prompt') {
        setTimeout(() => {
          if (this.$refs.input) {
            this.$refs.input.focus()
          }
        }, 500)
      }
    },
    inputType (val) {
      this.handleInputType(val)
    }
  },
  data () {
    return {
      title: '',
      message: '',
      value: '',
      type: '',
      showInput: false,
      inputValue: null,
      inputPlaceholder: '',
      inputPattern: null,
      inputValidator: null,
      inputErrorMessage: '',
      showConfirmButton: true,
      showCancelButton: false,
      confirmButtonText: CONFIRM_TEXT,
      cancelButtonText: CANCEL_TEXT,
      confirmButtonClass: '',
      confirmButtonDisabled: false,
      cancelButtonClass: '',
      editorErrorMessage: null,
      callback: null
    }
  }
}
</script>
<style lang="scss">
.msgbox {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  background: url('./imgs/alert.png') no-repeat;
  background-position: center;
  background-size: cover;
  @include px2rem(width, 500);
  @include px2rem(height, 300);
  border-radius: 3px;
  @include fontSize(16px);
  -webkit-user-select: none;
  overflow: hidden;
  backface-visibility: hidden;
  transition: 0.2s;
  .msgbox-title {
    padding: 15px 0 0;
    .title {
      text-align: center;
      padding-left: 0;
      margin-bottom: 0;
      font-weight: bold;
      color: #333;
    }
  }
  .msgbox-content {
    position: relative;
    .content {
      color: #999;
      margin: 0;
      text-align: center;
      line-height: 36px;
    }
  }
  .content_pad_yt {
    // 当没有title时content的padding
    @include px2rem(padding, 100 10 40);
  }
  .content_pad_nt {
    @include px2rem(padding, 130 50 40);
  }
  .msgbox-btns {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    line-height: 40px;
    .msgbox-btn {
      width: 2.41546rem;
      height: 0.80515rem;
      margin: 0 auto;
      border-radius: 100px;
      line-height: 0.80515rem;
      text-align: center;
    }
    .msgbox-btn-cancel {
      color: #000;
      background: -webkit-gradient(
        linear,
        0 0,
        0 100%,
        from(#d8d4d0),
        to(#a7a3a1)
      );
    }
    .msgbox-btn-confirm {
      background: -webkit-gradient(
        linear,
        0 0,
        0 100%,
        from(#ff8c1a),
        to(#ff6d00)
      );
      color: #fff;
    }
  }
}
.fade-enter {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.7);
}
.fade-leave-active {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.9);
}
</style>
