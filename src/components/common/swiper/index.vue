<template>
  <div class="mint-swipe">
    <div class="mint-swipe-items-wrap" ref="wrap">
      <slot></slot>
    </div>
    <div class="mint-swipe-indicators" v-show="showIndicators">
      <div class="mint-swipe-indicator"
        v-for="(page, $index) in pages"
        v-bind:key="$index"
        :class="{ 'is-active': $index === index }"></div>
    </div>
  </div>
</template>

<script>
import { once, addClass, removeClass } from './util.js'
export default {
  name: 'Swiper',
  created () {
    this.dragState = {} // 拖动时存储拖动状态
  },
  data () {
    return {
      ready: false,
      dragging: false,
      userScrolling: false,
      animating: false,
      index: 0, // 当前显示的轮播的索引index
      pages: [], // swipeItem子组件的DOM数组
      timer: null,
      reInitTimer: null,
      noDrag: false,
      isDone: false
    }
  },
  props: {
    speed: {
      type: Number, // 动画的速度
      default: 300
    },
    defaultIndex: { // 默认第一次显示的图片的索引index
      type: Number,
      default: 0
    },
    auto: { // 自动播放间隔时间
      type: Number,
      default: 3000
    },
    continuous: { // 是否循环播放
      type: Boolean,
      default: true
    },
    showIndicators: { // 是否显示indicators
      type: Boolean,
      default: true
    },
    noDragWhenSingle: { // 只有一个图片的时候不允许拖拽
      type: Boolean,
      default: true
    },
    prevent: { // 是否在 touchstart 事件触发时阻止事件的默认行为。设为 true 可提高运行在低版本安卓浏览器时的性能
      type: Boolean,
      default: false
    },
    stopPropagation: { // 是否在 touchstart 事件触发时阻止冒泡。
      type: Boolean,
      default: false
    }
  },
  watch: {
    index (newIndex) { // 监听器，如果index发生变化，就触发change自定义事件
      this.$emit('change', newIndex)
    }
  },
  methods: {
    swipeItemCreated () { // swipeItem调用，新的swipeItem创建后更新pages数组
      if (!this.ready) return
      clearTimeout(this.reInitTimer)
      this.reInitTimer = setTimeout(() => {
        this.reInitPages()
      }, 100)
    },
    swipeItemDestroyed () { // swipeItem调用，新的swipeItem销毁后更新pages数组
      if (!this.ready) return
      clearTimeout(this.reInitTimer)
      this.reInitTimer = setTimeout(() => {
        this.reInitPages()
      }, 100)
    },
    rafTranslate (element, initOffset, offset, callback, nextElement) {
      let ALPHA = 0.88
      this.animating = true // 正在动画标识变为true
      var _offset = initOffset // 用户滑动偏移量
      var raf = 0
      function animationLoop () {
        if (Math.abs(_offset - offset) < 0.5) { // 如果用户已经基本上滑动完了，那么就不用再滑动了
          this.animating = false
          _offset = offset // 用户滑动的偏移直接等于一页的宽度
          element.style.webkitTransform = ''
          if (nextElement) {
            nextElement.style.webkitTransform = ''
          }
          // 上面是取消element和nextElement上的平移动画
          cancelAnimationFrame(raf) // 取消一个先前通过调用window.requestAnimationFrame()方法添加到计划中的动画帧请求.
          if (callback) {
            callback()
          }
          return
        }
        _offset = ALPHA * _offset + (1.0 - ALPHA) * offset
        element.style.webkitTransform = `translate3d(${_offset}px, 0, 0)` // element移动出边界看不到
        if (nextElement) {
          nextElement.style.webkitTransform = `translate3d(${_offset - offset}px, 0, 0)` // nextElement刚好移动到中间成为当前轮播图
        }
        raf = requestAnimationFrame(animationLoop.bind(this)) // requestAnimationFrame方法告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画
      }
      animationLoop.call(this)
    },
    translate (element, offset, speed, callback) {
      if (speed) { // 如果传递了speed则动画是有时间过渡的
        this.animating = true // 正在进行动画标识变为true
        element.style.webkitTransition = '-webkit-transform ' + speed + 'ms ease-in-out'
        setTimeout(() => {
          element.style.webkitTransform = `translate3d(${offset}px, 0, 0)`
        }, 50)
        var called = false
        var transitionEndCallback = () => {
          if (called) return
          called = true
          this.animating = false // 正在进行动画标识变为false
          element.style.webkitTransition = '' // 清空动画样式
          element.style.webkitTransform = '' // 清空动画样式
          if (callback) { // 如果有回调就执行回调
            callback.apply(this, arguments)
          }
        }
        once(element, 'webkitTransitionEnd', transitionEndCallback) // 给对象绑定一个webkitTransitionEnd事件，在过渡动画结束后调用
        setTimeout(transitionEndCallback, speed + 100) //  webkitTransitionEnd maybe not fire on lower version android.
      } else { // 没有传递speed的动画是立即执行的
        element.style.webkitTransition = ''
        element.style.webkitTransform = `translate3d(${offset}px, 0, 0)`
      }
    },
    reInitPages () { // 获取子组件DOM元素存入this.pages
      var children = this.$refs.wrap.children // this.$refs.wrap.children是swipeItem组件
      this.noDrag = children.length === 1 && this.noDragWhenSingle // 如果只有一张图且设置了noDragWhenSingle为true，就设置this.noDrag为true，只有一张图的时候不允许拖动
      var pages = []
      var intDefaultIndex = Math.floor(this.defaultIndex)
      var defaultIndex = (intDefaultIndex >= 0 && intDefaultIndex < children.length) ? intDefaultIndex : 0
      this.index = defaultIndex // 根据用户传入的defaultIndex计算出默认一开始显示的图片的索引，然后把它赋值给this.index
      for (let i = 0; i < children.length; i++) {
        pages.push(children[i]) // 循环swipeItem子组件数组，将子组件的根DOM元素存入pages数组
        removeClass(children[i], 'is-active') // 移除子组件上的active样式
        if (i === defaultIndex) { // 给当前显示的子组件添加active样式
          addClass(children[i], 'is-active')
        }
      }
      this.pages = pages // this.pages是swipeItem子组件的汇总数组
    },
    doAnimate (towards, options) { // 切换轮播动画
      var children = this.$refs.wrap.children
      if (children.length === 0) return // 如果没有轮播图，直接retrun
      if (!options && children.length < 2) return // 如果只有一张图且没有options轮播状态参数，就return
      var prevPage, nextPage, currentPage, pageWidth, offsetLeft, speedX
      // prevPage前一页轮播的DOM，nextPage下一页轮播的DOM，currentPage当前轮播图的DOM，pageWidth轮播图的宽度,offsetLeft触摸滑动的距离，speedX触摸滑动的速度
      var speed = this.speed || 300 // 动画速度
      var index = this.index // 当前索引
      var pages = this.pages // swipeItem的DOM数组
      var pageCount = pages.length // 轮播图数量
      if (!options) {
        pageWidth = this.$el.clientWidth // 轮播图的宽度
        currentPage = pages[index] // 当前轮播图的DOM
        prevPage = pages[index - 1] // 前一页轮播的DOM
        nextPage = pages[index + 1] // 下一页轮播的DOM
        if (this.continuous && pages.length > 1) { // 用户设置了循环播放
          if (!prevPage) {
            prevPage = pages[pages.length - 1] // 循环播放的时候，如果没有前一页那么前一页就是数组里最后一页
          }
          if (!nextPage) {
            nextPage = pages[0] // 循环播放的时候，如果没有下一页那么下一页就是数组里的第一页
          }
        }
        if (prevPage) { // 前一页归位且display:block
          prevPage.style.display = 'block'
          this.translate(prevPage, -pageWidth)
        }
        if (nextPage) { // 下一页归位且display:block
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
      var oldPage = children[index] // 旧的current轮播DOM
      if (towards === 'prev') { // 翻到前一页
        if (index > 0) {
          newIndex = index - 1 // 计算出新的current轮播的索引
        }
        if (this.continuous && index === 0) {
          newIndex = pageCount - 1 // 如果循环，而且是第一页，那么新的一页就是最后一页
        }
      } else if (towards === 'next') { // 翻到下一页
        if (index < pageCount - 1) {
          newIndex = index + 1 // 计算出新的current轮播的索引
        }
        if (this.continuous && index === pageCount - 1) {
          newIndex = 0 // 如果循环，而且到最后一页了，那么新的一页就是第一页
        }
      }
      var callback = () => {
        if (newIndex !== undefined) {
          var newPage = children[newIndex]
          removeClass(oldPage, 'is-active')
          addClass(newPage, 'is-active')
          this.index = newIndex // 将active类名换到当前页身上，这样oldPage就会display:none
        }
        if (this.isDone) {
          this.end() // 触发end事件
        }
        // 前一页和后一页的display样式都回归默认状态
        if (prevPage) {
          prevPage.style.display = ''
        }
        if (nextPage) {
          nextPage.style.display = ''
        }
      }
      setTimeout(() => {
        if (towards === 'next') { // 方向是下一页
          this.isDone = true
          this.before(currentPage) // 触发before事件
          if (speedX) { // 如果是用户滑动就执行rafTranslate
            this.rafTranslate(currentPage, offsetLeft, -pageWidth, callback, nextPage)
          } else { // 自动轮播调用translate
            this.translate(currentPage, -pageWidth, speed, callback) // 当前页移动到左边
            if (nextPage) {
              this.translate(nextPage, 0, speed) // 下一页移动到中间变成当前页
            }
          }
        } else if (towards === 'prev') { // 方向是前一页
          this.isDone = true
          this.before(currentPage) // 触发before事件
          if (speedX) { // 如果是用户滑动就执行rafTranslate
            this.rafTranslate(currentPage, offsetLeft, pageWidth, callback, prevPage)
          } else { // 自动轮播调用translate
            this.translate(currentPage, pageWidth, speed, callback) // 当前页移动到右边
            if (prevPage) {
              this.translate(prevPage, 0, speed) // 前一页移动到中间变成当前页
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
    next () { // 每过this.auto时间就执行next()方法切换轮播
      this.doAnimate('next')
    },
    prev () {
      this.doAnimate('prev')
    },
    before () {
      this.$emit('before', this.index) // 触发before事件
    },
    end () {
      this.$emit('end', this.index) // 触发end事件
    },
    doOnTouchStart (event) {
      if (this.noDrag) return // 如果只有一张图且用户设置不允许拖动，就return
      var element = this.$el // element是swipe的DOM元素
      var dragState = this.dragState // 拖拽状态
      var touch = event.touches[0] // TouchEvent.touches获取到touch事件的触点，一根手指就只有一个，两根手指就两个，此处获取第一个触点
      dragState.startTime = new Date() // 拖拽起始时间
      dragState.startLeft = touch.pageX // 记下拖拽起始的时候x轴坐标
      dragState.startTop = touch.pageY // 记下拖拽起始的时候y轴坐标
      dragState.startTopAbsolute = touch.clientY // 触点相对于可见视区上沿的y坐标
      dragState.pageWidth = element.offsetWidth // swipe盒子宽度
      dragState.pageHeight = element.offsetHeight // swipe盒子高度
      var prevPage = this.pages[this.index - 1] // 前一页对应的swipeItem组件
      var dragPage = this.pages[this.index] // 当前页对应的swipeItem组件
      var nextPage = this.pages[this.index + 1] // 下一页对应的swipeItem组件
      if (this.continuous && this.pages.length > 1) { // 如果设置了循环播放，没有前一页前一页就是最后一页，没有后一页后一页就是第一页
        if (!prevPage) {
          prevPage = this.pages[this.pages.length - 1]
        }
        if (!nextPage) {
          nextPage = this.pages[0]
        }
      }
      // 将前一页，当前页，后一页对应的DOM元素存入this.dragState
      dragState.prevPage = prevPage
      dragState.dragPage = dragPage
      dragState.nextPage = nextPage
      if (dragState.prevPage) {
        dragState.prevPage.style.display = 'block'
      }
      if (dragState.nextPage) {
        dragState.nextPage.style.display = 'block'
      }
    },
    doOnTouchMove (event) {
      if (this.noDrag) return // 如果只有一张图且用户设置不允许拖动，就return
      var dragState = this.dragState // 拖拽状态
      var touch = event.touches[0] // 触点
      dragState.speedX = touch.pageX - dragState.currentLeft // 一瞬间x轴移动偏移量用来计算速度
      dragState.currentLeft = touch.pageX // 拖拽移动后当前的x轴坐标
      dragState.currentTop = touch.pageY // 拖拽移动后当前y轴坐标
      dragState.currentTopAbsolute = touch.clientY // 拖拽移动后触点相对于可见视区上沿的y坐标
      var offsetLeft = dragState.currentLeft - dragState.startLeft // 当前x轴移动的总偏移
      var offsetTop = dragState.currentTopAbsolute - dragState.startTopAbsolute // 当前y轴移动总偏移
      var distanceX = Math.abs(offsetLeft) // x轴移动距离绝对值
      var distanceY = Math.abs(offsetTop) // y轴移动距离绝对值
      // 判断用户滑动是否是为了切换轮播，如果不是就说明用户滑动是为了操作其他元素，就return
      if (distanceX < 5 || (distanceX >= 5 && distanceY >= 1.73 * distanceX)) {
        this.userScrolling = true
        return
      } else {
        // 如果的确是为了操作轮播，那么就阻止touch默认行为
        this.userScrolling = false
        event.preventDefault()
      }
      // 根据x轴的偏移判断出轮播的方向
      offsetLeft = Math.min(Math.max(-dragState.pageWidth + 1, offsetLeft), dragState.pageWidth - 1)
      // 根据滑动的方向来移动当前页dragPage，下一页nextPage或者上一页prevPage
      // 如果偏移小于0，说明从右往左滑动，方向next，nextPage的滑动距离刚好是偏移加上swipe宽度，因为这时候偏移是负数
      // 如果偏移大于0，说明从左往右滑动，方向prev，prevPage的滑动距离刚好是偏移减去swipe宽度，因为这时候偏移是正数
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
      var children = this.$refs.wrap.children // 如果只有一张图且用户设置不允许拖动，就return
      if (this.noDrag) return // 拖拽状态
      var dragState = this.dragState // 拖拽花费的时间
      var dragDuration = new Date() - dragState.startTime
      var towards = null // 拖拽方向置空
      var offsetLeft = dragState.currentLeft - dragState.startLeft // 拖动的x轴偏移量
      var offsetTop = dragState.currentTop - dragState.startTop // 拖动y轴偏移量
      var pageWidth = dragState.pageWidth // swipe宽度
      var index = this.index // 当前轮播索引
      var pageCount = this.pages.length // 轮播图数量
      if (dragDuration < 300) { // 如果拖动花费时间小于300毫秒
        let fireTap = Math.abs(offsetLeft) < 5 && Math.abs(offsetTop) < 5 // 如果x轴和y轴的移动距离都小于5
        if (isNaN(offsetLeft) || isNaN(offsetTop)) {
          fireTap = true
        }
        if (fireTap) {
          // children[this.index].$emit('tap') // 当移动距离很小的时候，说明是点击事件，就触发swipeItem组件的tap事件
        }
      }
      if (dragDuration < 300 && dragState.currentLeft === undefined) return
      if (dragDuration < 300 || Math.abs(offsetLeft) > pageWidth / 2) {
        towards = offsetLeft < 0 ? 'next' : 'prev' // 判断方向
      }
      if (!this.continuous) { // 如果用户设置了不能循环，且到了开头或者结尾，那就方向为null
        if ((index === 0 && towards === 'prev') || (index === pageCount - 1 && towards === 'next')) {
          towards = null
        }
      }
      if (children.length < 2) { // 如果只有一张图，方向为null
        towards = null
      }
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
    initTimer () { // 初始化自动切换轮播的定时器
      if (this.auto > 0 && !this.timer) { // auto是自动切换轮播的间隔时间
        this.timer = setInterval(() => {
          if (!this.continuous && (this.index >= this.pages.length - 1)) { // 如果设置continuous为false，则不循环切换，到最后一页就会停止
            return this.clearTimer()
          }
          if (!this.dragging && !this.animating) {
            this.next()
          }
        }, this.auto)
      }
    },
    clearTimer () { // 清除自动切换定时器
      clearInterval(this.timer)
      this.timer = null
    }
  },
  destroyed () { // 实例被销毁时调用
    if (this.timer) { // 清除自动切换定时器
      this.clearTimer()
    }
    if (this.reInitTimer) {
      clearTimeout(this.reInitTimer)
      this.reInitTimer = null
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.ready = true
      this.initTimer() // 初始化自动切换定时器
      this.reInitPages(this.$el) // 获取子组件DOM元素存入this.pages
      var element = this.$el
      // 以下为swipeDOM元素添加touch事件
      element.addEventListener('touchstart', (event) => {
        if (this.prevent) event.preventDefault() // 如果用户设置了就阻止默认行为
        if (this.stopPropagation) event.stopPropagation() // 如果用户设置了就阻止冒泡
        if (this.animating) return // 如果正在进行切换动画就return
        this.dragging = true // this.dragging正在拖拽标识变为true
        this.userScrolling = false
        this.doOnTouchStart(event)
      })
      element.addEventListener('touchmove', (event) => {
        if (!this.dragging) return
        if (this.timer) this.clearTimer() // 用户开始拖拽后清除掉自动切换的定时器
        this.doOnTouchMove(event)
      })
      element.addEventListener('touchend', (event) => {
        if (this.userScrolling) { // 如果用户的touch不是为了操作了轮播图，就回归初始状态
          this.dragging = false
          this.dragState = {}
          return
        }
        if (!this.dragging) return
        this.initTimer() // 拖拽结束后重新开启自动切换定时器
        this.doOnTouchEnd(event)
        this.dragging = false // this.dragging正在拖拽标示变为false
      })
    })
  }
}
</script>
<style lang='scss' scoped>
  .mint-swipe {
    overflow: hidden;
    position: relative;
    .mint-swipe-items-wrap {
      position: relative;
      overflow: hidden;
      height: 100%;
      & > div {
        position: absolute;
        transform: translateX(-100%);
        width: 100%;
        height: 100%;
      }
      .is-active {
        display: block;
        transform: none;
      }
    }
    .mint-swipe-indicators {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      .is-active {
        background: #fff;
      }
    }
    .mint-swipe-indicator {
      width: 8px;
      height: 8px;
      display: inline-block;
      border-radius: 100%;
      background: #000;
      opacity: 0.2;
      margin: 0 3px;
    }
  }
</style>
