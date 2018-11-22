<!--
上传图片的使用说明：
  <1> 在所需组件引入upload：import Upload from '@/components/upload/upload'
  <2> 注册组件
  <3> 使用组件：<Upload />
-->

<template>
  <div class="upload">
    <ul class="upload_imgs"
        v-if="imgArr.length">
      <li v-for="(item,index) in imgArr"
          :key="index"
          class="upload_img">
        <img :src="item" />
        <span class="delete"
              @click="deleteImg(index)"></span>
      </li>
    </ul>
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
import {
  apis,
  chttp
} from '@/libs/interfaces'
import COMMONURL from '@/libs/base/common'
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
    /* eslint-disable */
    chttp.get(apis.upload).then(res => {
      this.upyun.policy = res.upyun[1]
      this.upyun.signature = res.upyun[0]
    }).catch(err => {
      Vue.$toast('上传错误')
    })
    /* eslint-enable */
  },
  props: ['imgUrl'],
  methods: {
    // 上传图片
    upLoadPic (event) {
      let that = this
      event.preventDefault()
      // let size = event.target.files[0].size
      // let type = event.target.files[0].type.indexOf('image')
      let formData = new FormData(this.$refs.upload)
      chttp.post('https://v0.api.upyun.com/autodynemv', formData).then(res => {
        console.log('正常2', res)
        let url = 'https://autodynemv.b0.upaiyun.com/' + res['url']
        that.myImgUrl = url
        this.imgArr.push(that.myImgUrl)
        console.log(this.imgArr)
      }).catch(err => {
        console.log('异常2', err)
      })
    },
    deleteImg (index) {
      this.imgArr.splice(index, 1)
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
  text-align: left;
  .upload_imgs {
    display: inline-block;
    .upload_img {
      @include px2rem(width, 150);
      @include px2rem(height, 150);
      display: inline-block;
      @include px2rem(margin-left, 10);
      border: 1px solid #ccc;
      position: relative;
      img {
        @include px2rem(width, 150);
        @include px2rem(height, 150);
      }
      .delete {
        display: inline-block;
        position: absolute;
        @include px2rem(top, -15);
        @include px2rem(right, -12);
        @include px2rem(width, 30);
        @include px2rem(height, 30);
        background: url('./imgs/delete.png');
        @include px2rem(background-size, 30);
        z-index: 1000;
      }
    }
  }
  .fileupload {
    position: relative;
    @include px2rem(width, 150);
    @include px2rem(height, 150);
    @include px2rem(margin-left, 10);
    background: url('./imgs/upload.png') no-repeat;
    background-size: 100%;
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
