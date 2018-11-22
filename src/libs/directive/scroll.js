/*
* 全局无限滚动
* 用例:
* <ul
*  v-infinite-scroll = "loadMore"
*  infinite-scroll-immediate-check = ""
*  若为真，指令被绑定到元素上后，会立即检查是否需要执行加载方法。对于初始状态内容无法填满容器有用。默认false
*  infinite-scroll-disabled = ""  // 如果为true,无限滚动不被触发。默认false
*  infinite-scroll-distance = "20"  // 滚动距离阀值,默认0
* >
* </ul>
* export default {
*   methods: {
*     loadMore () {}
*   }
* }
*/

import Vue from 'vue'
import utils from '../utils'
const ctx = '@scroll'

// 获取样式的方法
const getComputedStyle = Vue.prototype.$isServer ? {} : window.getComputedStyle

const getScrollEventTarget = function (el) {
  let currentNode = el
  while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
    const overflowY = getComputedStyle(currentNode).overflowY
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode
    }
    currentNode = currentNode.parentNode
  }
  return window
}

const doCheck = function (force) {
  const _this = this
  const scrollEventTarget = _this.scrollEventTarget
  const el = _this.el
  const distance = _this.distance

  if (force !== true && _this.disabled) return
  const scrollTop = utils.elem.getScrollTop(scrollEventTarget)
  const bottom = scrollTop + utils.elem.getVisibleHeight(scrollEventTarget)

  let shouldTrigger = false

  if (scrollEventTarget === el) {
    shouldTrigger = scrollEventTarget.scrollHeight - bottom <= distance
  } else {
    const elBottom = utils.elem.getElementTop(el) - utils.elem.getElementTop(scrollEventTarget) + el.offsetHeight + scrollTop
    shouldTrigger = bottom + distance >= elBottom
  }

  if (shouldTrigger && _this.expression) {
    _this.expression(_this)
  }
}

const doBind = function () {
  if (this.binded) return
  this.binded = true
  const _this = this
  const el = _this.el
  _this.scrollEventTarget = getScrollEventTarget(el)
  _this.scrollListener = utils.debounce(doCheck.bind(_this), 500)
  _this.scrollEventTarget.addEventListener('scroll', _this.scrollListener)
  const disableExpr = el.getAttribute('infinite-scroll-disabled')
  let disabled = false
  if (disableExpr) {
    _this.vm.$watch(disableExpr, function (value) {
      _this.disabled = value
      if (!value && _this.immediateCheck) {
        doCheck.call(_this)
      }
    })
    disabled = Boolean(_this.vm[disableExpr])
  }
  _this.disabled = disabled

  // 滚动阀值限制，限制滚动去执行
  let distanceExpr = el.getAttribute('infinite-scroll-distance')
  let distance = 0
  if (distanceExpr) {
    distance = Number(_this.vm[distanceExpr] || distanceExpr)
    if (isNaN(distance)) {
      distance = 0
    }
  }
  _this.distance = distance

  // 绑定到dom后，是否要立即执行数据加载
  const immediateCheckExpr = el.getAttribute('infinite-scroll-immediate-check')
  let immediateCheck = true
  if (immediateCheckExpr) {
    immediateCheck = Boolean(_this.vm[immediateCheckExpr])
  }
  if (immediateCheck) {
    doCheck.call(_this)
  }

  const eventName = el.getAttribute('infinite-scroll-listen-for-event')
  if (eventName) {
    _this.vm.$on(eventName, function () {
      doCheck.call(_this)
    })
  }
}

const isAttached = function (el) {
  let currentNode = el.parentNode
  while (currentNode) {
    if (currentNode.tagName === 'HTML') {
      return true
    }
    if (currentNode.nodeType === 11) {
      return false
    }
    currentNode = currentNode.parentNode
  }
  return false
}

const scrollOptions = {
  bind (el, binding, vnode) {
    el[ctx] = {
      el,
      vm: vnode.context,
      expression: binding.value
    }
    const args = arguments

    function cb () {
      el[ctx].vm.$nextTick(function () {
        if (isAttached(el)) {
          doBind.call(el[ctx], args)
        }
        el[ctx].bindTryCount = 0

        function tryBind () {
          if (el[ctx].bindTryCount > 10) return
          el[ctx].bindTryCount++
          if (isAttached(el)) {
            doBind.call(el[ctx], args)
          } else {
            setTimeout(tryBind, 50)
          }
        }
        tryBind()
      })
    }
    if (el[ctx].vm._isMounted) {
      cb()
      return
    }
    el[ctx].vm.$on('hook:mounted', cb)
  },
  unbind (el) {
    if (el[ctx] && el[ctx].scrollEventTarget) {
      el[ctx].scrollEventTarget.removeEventListener('scroll', el[ctx].scrollListener)
    }
  }
}

function install () {
  if (!Vue.prototype.$isServer) {
    Vue.directive('infinite-scroll', scrollOptions)
  }
}
export default install
