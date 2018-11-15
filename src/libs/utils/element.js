// document文档相关操作
const elem = {
  // 获取元素的高度
  getVisibleHeight (el) {
    if (el === window) {
      return document.documentElement.clientHeight
    }
    return el.clientHeight
  },
  // 获取滚动高度
  getScrollTop (el) {
    if (el === window) {
      return Math.max(window.scrollY || 0, document.documentElement.scrollTop)
    }
    return el.scrollTop
  },
  // 获取元素距离文档顶部的距离
  getElementTop (el) {
    if (el === window) {
      return this.getScrollTop(el)
    }
    return el.getBoundingClientRect().top + this.getScrollTop(window)
  }
}

export default elem
