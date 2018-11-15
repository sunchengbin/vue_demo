import Vue from 'vue'
function initFocus () {
  Vue.directive('focus', {
    inserted (el) {
      el.focus()
    }
  })
}
export default initFocus
