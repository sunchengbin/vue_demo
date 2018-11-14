<template>
  <div class="submit">
    <div class="pic_info">
      <div class="pics">
        <form action=""
              class="fileupload"
              method="POST">
          <span class="upload">+</span>
        </form>
      </div>
    </div>
    <div class="alert_info">
      <p></p>
      <span class="qd">确定</span>
    </div>
    <div class="loading"></div>
    <button class="index_btn"
            id="submit">开始制作</button>
    <div class="mask hide"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      baseParam: {
        policy: "",
        signature: "",
        shareUrl: "//k.ktvsky.com/bar/u/wx/config",
        hostImage: "https://autodynemv.b0.upaiyun.com/",
        localImageData: [],
        localImageUrl: [],
        user_info: {}
      }
    }
  },
  methods: {
    getShare: function (callback_) {
      $.get(baseParam.shareUrl, {
        "url": location.href.split("#")[0]
      }, function (data) {
        callback_(data);
      }, "json");
    },
    getUserInfo: function (openid) {
      $.get('https://coupon.ktvsky.com/vod/user_info', { "openid": openid }, function (res) {
        baseParam['user_info'] = res['data']
      })
    },
    getSignature: function (callback_) {
      $.get("//coupon.ktvsky.com/by/upload", function (data) {
        if (data.errcode != 200) {
          return;
        }
        baseParam.policy = data.upyun[1]
        baseParam.signature = data.upyun[0]
      });
    },
    imgUpLoad: function (localData) {
      var formData = new FormData()
      var blob = sdk_My_wx.dataURItoBlob(localData)
      formData.append("file", blob)
      formData.append("signature", baseParam.signature)
      formData.append("policy", baseParam.policy)
      $.ajax({
        type: "post",
        url: "//v0.api.upyun.com/autodynemv",
        processData: false,
        contentType: false,
        data: formData,
        b64encoded: "on",
        success: function (data) {
          var data = JSON.parse(data);
          if (data.code != 200) {
            sdk_My_wx.alertInfo("图片上传失败");
            return;
          }
          baseParam.localImageUrl.push(data['url'])
          sdk_My_wx.insertImage(data["url"])
        }
      })
    },
    // base64 数据转化为二进制数据格式
    dataURItoBlob: function (data) {
      var dataURI = data.indexOf("base64") >= 0 ? data : ("data:image/png;base64," + data);
      var byteString = atob(dataURI.split(",")[1]);
      var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], {
        type: mimeString
      });
    },
    /*获取参数*/
    getUrlVal: function (name) {
      var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)")
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
