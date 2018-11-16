<!--
swiper组件的使用说明：
  1> 在main.js中引入组件：import Swiper from '@/components/swiper/swiper'
                        import SwipeItem from '@/components/swiper/swiper_item'
  2> 注册并挂载组件：      Vue.component(Swiper.name, Swiper)
                        Vue.component(SwipeItem.name, SwipeItem)
  3> 在需要的地方引入组件，例如以下几种引入方式：
        以速度5s匀速：    <swiper :auto="5000">
                          <swiper-item :class="'slide'+(index+1)"
                                        v-for="(item,index) in swiperSlides"
                                        :key="index">
                            <img :src="item.classdetailbigimage"
                                  alt="">
                          </swiper-item>
                        </swiper>

        是否显示小圆圈：  添加属性  :show-indicators="false"
        不自动播放：     添加属性  :auto="0"
        默认第一张图片：  添加属性  :defaultIndex="1"
        。。。
-->

<template>
  <div class="swiper">
    <div class="swiper-items-wrap">
      <slot></slot>
    </div>
    <div class="swiper-indicators"
         v-show="showIndicators">
      <div class="swipe-indicator"
           v-for="(page,$index) in pages"
           :class="{'is-active' : $index === index}"
           :key="$index"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'swiper',
  created () {
    this.dragState = {}
  },
  data () {
    return {
      ready: false,
      dragging: false,
      userScrolling: false,
      animating: false,
      index: 0,
      pages: [], // 轮播元素数组
      timer: null,
      reInitTimer: null,
      noDrag: false, // 不轮播
      isDone: false
    }
  },
  props: {
    speed: {
      type: Number,
      default: 300
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    auto: {
      type: Number,
      default: 0
    },
    continuous: {
      type: Boolean,
      default: true
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    noDragWhenSingle: {
      type: Boolean,
      default: true
    },
    prevent: {
      type: Boolean,
      default: false
    },
    stopPropagation: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    index (newIndex) {
      this.$emit('change', newIndex)
    }
  },
  mounted () {
    this.ready = true
    this.initTimer()
    this.reInitPages()
    var element = this.$el
    element.addEventListener('touchstart', (event) => {
      if (this.prevent) event.preventDefault()
      if (this.stopPropagation) event.stopPropagation()
      if (this.animating) return
      this.dragging = true
      this.userScrolling = false
      this.doOnTouchStart(event)
    })
    element.addEventListener('touchmove', (event) => {
      if (!this.dragging) return
      if (this.timer) this.clearTimer()
      this.doOnTouchMove(event)
    })
    element.addEventListener('touchend', (event) => {
      console.log(this.userScrolling)
      if (this.userScrolling) {
        this.dragging = false
        this.dragState = {}
        return
      }
      if (!this.dragging) return
      this.initTimer()
      this.doOnTouchEnd(event)
      this.dragging = false
    })
  },
  methods: {
    swipeItemCreated () {
      if (!this.ready) return
      clearTimeout(this.reInitTimer)
      this.reInitTimer = setTimeout(() => {
        this.reInitPages()
      }, 100)
    },
    swipeItemDestroyed () {
      if (!this.ready) return
      clearTimeout(this.reInitTimer)
      this.reInitTimer = setTimeout(() => {
        this.reInitPages()
      }, 100)
    },
    reInitPages () {
      // 此函数初始化生成轮播图元素
      var children = this.$children
      this.noDrag = children.length === 1 && this.noDragWhenSingle
      var pages = []
      var intDefaultIndex = Math.floor(this.defaultIndex)
      var defaultIndex = (intDefaultIndex >= 0 && intDefaultIndex < children.length) ? intDefaultIndex : 0
      this.index = defaultIndex
      children.forEach((child, index) => {
        pages.push(child.$el)
      })
      this.pages = pages
    },
    doAnimate (towards, options) { // towards:上一张还是下一张；options:各种操作
      // 此函数让轮播图有动画轮播效果
      if (this.$children.length === 0) return
      if (!options && this.$children.length < 2) return
      var prevPage, nextPage, currentPage, pageWidth, offsetLeft, speedX
      var speed = this.speed || 300
      var index = this.index
      var pages = this.pages
      var pageCount = pages.length
      if (!options) {
        pageWidth = this.$el.clientWidth
        currentPage = pages[index]
        prevPage = pages[index - 1]
        nextPage = pages[index + 1]
        if (this.continuous && pages.length > 1) {
          if (!prevPage) {
            prevPage = pages[pages.length - 1]
          }
          if (!nextPage) {
            nextPage = pages[0]
          }
        }
        if (prevPage) {
          prevPage.style.display = 'block'
          this.translate(prevPage, -pageWidth)
        }
        if (nextPage) {
          nextPage.style.display = 'block'
          this.translate(nextPage, pageWidth)
        }
      } else {
        prevPage = options.prevPage
        currentPage = options.currentPage
        nextPage = options.nextPage
        pageWidth = options.pageWidth
        offsetLeft = options.offsetLeft
        speedX = options.speedX
      }
      var newIndex
      // var oldPage = this.$children[index].$el
      if (towards === 'prev') {
        if (index > 0) {
          newIndex = index - 1
        }
        if (this.continuous && index === 0) {
          newIndex = pageCount - 1
        }
      } else if (towards === 'next') {
        if (index < pageCount - 1) {
          newIndex = index + 1
        }
        if (this.continuous && index === pageCount - 1) {
          newIndex = 0
        }
      }
      var callback = () => {
        if (newIndex !== undefined) {
          // var newPage = this.$children[newIndex].$el
          this.index = newIndex
        }
        if (this.isDone) {
          this.end()
        }
        // if (prevPage) {
        //   prevPage.style.display = ''
        // }
        // if (nextPage) {
        //   nextPage.style.display = ''
        // }
      }
      setTimeout(() => {
        if (towards === 'next') {
          this.isDone = true
          this.before(currentPage)
          if (speedX) {
            this.rafTranslate(currentPage, offsetLeft, -pageWidth, callback, nextPage)
          } else {
            this.translate(currentPage, -pageWidth, speed, callback)
            if (nextPage) {
              this.translate(nextPage, 0, speed)
            }
          }
        } else if (towards === 'prev') {
          this.isDone = true
          this.before(currentPage)
          if (speedX) {
            this.rafTranslate(currentPage, offsetLeft, pageWidth, callback, prevPage)
          } else {
            this.translate(currentPage, pageWidth, speed, callback)
            if (prevPage) {
              this.translate(prevPage, 0, speed)
            }
          }
        } else {
          this.isDone = false
          this.translate(currentPage, 0, speed, callback)
          if (typeof offsetLeft !== 'undefined') {
            if (prevPage && offsetLeft > 0) {
              this.translate(prevPage, pageWidth * -1, speed)
            }
            if (nextPage && offsetLeft < 0) {
              this.translate(nextPage, pageWidth, speed)
            }
          } else {
            if (prevPage) {
              this.translate(prevPage, pageWidth * -1, speed)
            }
            if (nextPage) {
              this.translate(nextPage, pageWidth, speed)
            }
          }
        }
      }, 10)
    },
    translate (element, offset, speed, callback) {
      // 此函数定义轮播的转换方式
      if (speed) {
        this.animating = true
        element.style.webkitTransition = '-webkit-transform ' + speed + 'ms ease-in-out'
        setTimeout(() => {
          element.style.webkitTransform = `translate3d(${offset}px, 0, 0)`
        }, 50)
        var called = false
        var transitionEndCallback = () => {
          if (called) return
          called = true
          this.animating = false
          // element.style.webkitTransition = ''
          // element.style.webkitTransform = ''
          if (callback) {
            callback.apply(this, arguments)
          }
        }
        setTimeout(transitionEndCallback, speed + 100)
      } else {
        element.style.webkitTransition = ''
        element.style.webkitTransform = `translate3d(${offset}px, 0, 0)`
      }
    },
    rafTranslate (element, initOffset, offset, callback, nextElement) {
      let ALPHA = 0.88
      this.animating = true
      var _offset = initOffset
      var raf = 0
      function animationLoop () {
        if (Math.abs(_offset - offset) < 0.5) {
          this.animating = false
          _offset = offset
          // element.style.webkitTransform = ''
          if (nextElement) {
            // nextElement.style.webkitTransform = ''
          }
          cancelAnimationFrame(raf)
          if (callback) {
            callback()
          }
          return
        }
        _offset = ALPHA * _offset + (1.0 - ALPHA) * offset
        element.style.transform = `translate3d(${_offset}px, 0, 0)`
        if (nextElement) {
          nextElement.style.webkitTransform = `translate3d(${_offset - offset}px, 0, 0)`
        }
        raf = requestAnimationFrame(animationLoop.bind(this))
      }
      animationLoop.call(this)
    },
    doOnTouchStart (event) {
      if (this.noDrag) return
      var element = this.$el
      var dragState = this.dragState
      var touch = event.touches[0]
      dragState.startTime = new Date()
      dragState.startLeft = touch.pageX
      dragState.startTop = touch.pageY
      dragState.startTopAbsolute = touch.clientY
      dragState.pageWidth = element.offsetWidth
      dragState.pageHeight = element.offsetHeight
      var prevPage = this.$children[this.index - 1]
      var dragPage = this.$children[this.index]
      var nextPage = this.$children[this.index + 1]
      if (this.continuous && this.pages.length > 1) {
        if (!prevPage) {
          prevPage = this.$children[this.$children.length - 1]
        }
        if (!nextPage) {
          nextPage = this.$children[0]
        }
      }
      dragState.prevPage = prevPage ? prevPage.$el : null
      dragState.dragPage = dragPage ? dragPage.$el : null
      dragState.nextPage = nextPage ? nextPage.$el : null
      if (dragState.prevPage) {
        dragState.prevPage.style.display = 'block'
      }
      if (dragState.nextPage) {
        dragState.nextPage.style.display = 'block'
      }
    },
    doOnTouchMove (event) {
      if (this.noDrag) return
      var dragState = this.dragState
      var touch = event.touches[0]
      dragState.speedX = touch.pageX - dragState.currentLeft
      dragState.currentLeft = touch.pageX
      dragState.currentTop = touch.pageY
      dragState.currentTopAbsolute = touch.clientY
      var offsetLeft = dragState.currentLeft - dragState.startLeft
      var offsetTop = dragState.currentTopAbsolute - dragState.startTopAbsolute
      var distanceX = Math.abs(offsetLeft)
      var distanceY = Math.abs(offsetTop)
      if (distanceX < 5 || (distanceX >= 5 && distanceY >= 1.73 * distanceX)) {
        this.userScrolling = true
        return
      } else {
        this.userScrolling = false
        event.preventDefault()
      }
      offsetLeft = Math.min(Math.max(-dragState.pageWidth + 1, offsetLeft), dragState.pageWidth - 1)
      var towards = offsetLeft < 0 ? 'next' : 'prev'
      if (dragState.prevPage && towards === 'prev') {
        this.translate(dragState.prevPage, offsetLeft - dragState.pageWidth)
      }
      this.translate(dragState.dragPage, offsetLeft)
      if (dragState.nextPage && towards === 'next') {
        this.translate(dragState.nextPage, offsetLeft + dragState.pageWidth)
      }
    },
    doOnTouchEnd () {
      console.log(this.noDrag, 'doOnTouchEnd')
      if (this.noDrag) return
      var dragState = this.dragState
      var dragDuration = new Date() - dragState.startTime
      var towards = null
      var offsetLeft = dragState.currentLeft - dragState.startLeft
      var offsetTop = dragState.currentTop - dragState.startTop
      var pageWidth = dragState.pageWidth
      var index = this.index
      var pageCount = this.pages.length
      if (dragDuration < 300) {
        let fireTap = Math.abs(offsetLeft) < 5 && Math.abs(offsetTop) < 5
        if (isNaN(offsetLeft) || isNaN(offsetTop)) {
          fireTap = true
        }
        if (fireTap) {
          this.$children[this.index].$emit('tap')
        }
      }
      if (dragDuration < 300 && dragState.currentLeft === undefined) return
      if (dragDuration < 300 || Math.abs(offsetLeft) > pageWidth / 2) {
        towards = offsetLeft < 0 ? 'next' : 'prev'
      }
      if (!this.continuous) {
        if ((index === 0 && towards === 'prev') || (index === pageCount - 1 && towards === 'next')) {
          towards = null
        }
      }
      if (this.$children.length < 2) {
        towards = null
      }
      console.log(this.dragState)
      this.doAnimate(towards, {
        offsetLeft: offsetLeft,
        pageWidth: dragState.pageWidth,
        prevPage: dragState.prevPage,
        currentPage: dragState.dragPage,
        nextPage: dragState.nextPage,
        speedX: dragState.speedX
      })
      this.dragState = {}
    },
    before () {
      this.$emit('before', this.index)
    },
    prev () {
      this.doAnimate('prev')
    },
    next () {
      this.doAnimate('next')
    },
    end () {
      this.$emit('end', this.index)
    },
    initTimer () {
      if (this.auto > 0 && !this.timer) {
        this.timer = setInterval(() => {
          if (!this.continuous && (this.index >= this.pages.length - 1)) {
            return this.clearTimer()
          }
          if (!this.dragging && !this.animating) {
            this.next()
          }
        }, this.auto)
      }
    },
    clearTimer () {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  destroyed () {
    if (this.timer) {
      this.clearTimer()
    }
    if (this.reInitTimer) {
      clearTimeout(this.reInitTimer)
      this.reInitTimer = null
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  overflow: hidden;
  position: relative;
  @include px2rem(height, 300);
  .swiper-items-wrap {
    position: relative;
    overflow: hidden;
    height: 100%;
    > div {
      position: absolute;
      top: 8%;
      left: 5%;
      transform: translateX(-100%);
      @include px2rem(width, 680);
      @include px2rem(height, 260);
      overflow: hidden;
      display: none;
      &:active {
        display: block;
        transform: none;
      }
    }
    img {
      @include px2rem(border-radius, 10);
    }
  }
  .swiper-indicators {
    position: absolute;
    @include px2rem(bottom, 35);
    left: 50%;
    transform: translateX(-50%);
  }
  .swipe-indicator {
    @include px2rem(width, 15);
    @include px2rem(height, 15);
    display: inline-block;
    border-radius: 100%;
    background: #000;
    opacity: 0.2;
    @include px2rem(margin, 0 10);
    &:active {
      background: #fff;
    }
  }
  .is-active {
    opacity: 1;
    background: #ff6d00;
  }
}
</style>
