const thumb = {
  state: {
    thumb_pay: false,
    thumb_toast: false,
    fee: 100,
    entry: '',
    roomid: ''
  },
  mutations: {
    THUMB_PAYED (state, isPay) {
      state.thumb_pay = isPay
      // state.thumb_toast = isPay
    },
    THUMB_ENTRY (state, entry) {
      state.entry = entry
    },
    THUMB_ROOMID (state, roomid) {
      state.roomid = roomid
    }
  }
}

export default thumb
