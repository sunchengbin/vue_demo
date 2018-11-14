<template>
  <div class="upload">
    <form action=""
          class="fileupload"
          method="POST"
          ref="upload">
      <span class="upload"></span>
      <input name="file"
             type="file"
             class="file"
             @change="upLoadPic($event)">
      <input type="hidden"
             class="policy"
             name="policy"
             v-model="upyun.policy">
      <input type="hidden"
             class="signature"
             name="signature"
             v-model="upyun.signature">
    </form>
  </div>
</template>
<script>
import http from '@/libs/base/http.js'

export default {
  data () {
    return {
      upyun: { // 上传参数
        policy: '',
        signature: ''
      },
      imgArr: []
    }
  },
  created () {
    http.get('https://coupon.ktvsky.com/by/upload', {}).then(res => {
      this.upyun.policy = res.upyun[1]
      this.upyun.signature = res.upyun[0]
    })
  },
  props: ['imgUrl'],
  methods: {
    // 上传图片
    upLoadPic (event) {
      let that = this
      event.preventDefault()
      let size = event.target.files[0].size,
        type = event.target.files[0].type.indexOf('image'),
        formData = new FormData(this.$refs.upload)
      http.post('https://v0.api.upyun.com/autodynemv', formData).then(res => {
        console.log(res)
        let url = 'https://autodynemv.b0.upaiyun.com/' + JSON.parse(res)['url']
        console.log(url)
        that.myImgUrl = url
      }).catch(err => {
        console.log(err)
      })
    }
  },
  watch: {
    imgUrl (val) {
      this.myImgUrl = val
    },
    myImgUrl (val) {
      this.$emit('on-result-change', val)
    }
  }
}

</script>
<style lang="scss" scoped>
.upload {
  font-size: 0.14rem;
  .fileupload {
    position: relative;
    width: 100%;
    @include px2rem(height, 100);
    background: url('./imgs/upload.png') no-repeat;
    background-size: 20%;
    background-position: center;
    .file {
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      margin: 0.03rem;
    }
  }
}
</style>
