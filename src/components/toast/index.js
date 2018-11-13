import Vue from 'vue'
import Index from './index.vue'

const ToastConstructor = Vue.extend(Index)
let toastPool = []

let removeToast = function (e) {
  if (e.target.parentNode) {
    e.target.parentNode.removeChild(e.target)
  }
}

let addToastInstance = (instance) => {
  if (instance) {
    toastPool.push(instance)
  }
}

ToastConstructor.prototype.close = function () {
  this.visible = false
  this.$el.addEventListener('transitionend', removeToast)
  this.closed = true
  addToastInstance(this)
}

let getAnToastInstance = () => {
  if (toastPool.length > 0) {
    const instance = toastPool[0]
    toastPool.splice(0, 1)
    return instance
  }
  return new ToastConstructor({
    el: document.createElement('div')
  })
}

let Toast = (options = {}) => {
  let duration = options.duration || 2000
  let instance = getAnToastInstance()
  instance.closed = false
  clearTimeout(instance.timer)
  instance.timer = null
  instance.message = typeof options === 'string' ? options : options.message
  instance.position = options.position || 'middle'
  instance.className = options.className || ''
  instance.iconClass = options.iconClass || ''

  document.body.appendChild(instance.$el)
  Vue.nextTick(function () {
    instance.visible = true
    instance.$el.removeEventListener('transitionend', removeToast)
    ~duration && (instance.timer = setTimeout(function () {
      if (instance.closed) return
      instance.close()
    }, duration))
  })
  return instance
}

export default Toast
