/*
 * 防抖（以最后一次事件的触发时间， 为起始时间去不断推移事件的执行）
 * 应用场景（例如：避免快速点击造成的多次提交、降低input检索频次）
 */
function debounce (callback, wait = 300) {
  let timeout, timestamp, context, args
  function laterFn () {
    let laster = Date.now() - timestamp
    if (laster < wait) {
      timeout = setTimeout(laterFn, wait - laster)
    } else {
      clearTimeout(timeout)
      timeout = null
      callback.apply(context, args)
      context = args = null
    }
  }
  return function () {
    context = this
    args = arguments
    timestamp = Date.now()
    if (!timeout) {
      timeout = setTimeout(laterFn, wait)
    }
  }
}
export default debounce
