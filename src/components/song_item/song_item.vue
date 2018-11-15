<template>
  <li class="list-item"
      @click.stop="handleClick">
    <div class="singer-img"
         v-if="type==='singer'">
      <img :src="imgs"
           alt="">
    </div>
    <p class="songindex"
       v-else>
      {{songindex>=10?(songindex+1):"0"+(songindex+1)}}
    </p>
    <div class="info">
      <p class="title"
         v-if="title">
        <span class="music-name">
          {{title}}
        </span>
      </p>
      <p v-if="sub_title">
        <span class="singer-name">
          {{sub_title}}
          <span v-for="(flag, index) in flags"
                :key="index"
                class="flag">
            {{flag}}
          </span>
        </span>
      </p>
    </div>
    <div class="right-arrow"
         v-if="is_search && type==='singer'">
      <img src="./images/arrow_right_grey.png"
           alt="">
    </div>
    <div class="song-status"
         v-if="showPlayStatus"
         @click.stop="setTop">
      <img src="./images/playing.gif"
           class="playing"
           alt=""
           v-if="played === 2">
      <img src="./images/set_top.png"
           class="played"
           alt=""
           v-if="played === 1 || order_index === 1">
    </div>
  </li>
</template>
<script>
/*
  * title: 主标题，一般显示为歌曲名，如果用于显示歌星列表，此处为歌星名
  * img: 歌星头像
  * songindex: 歌曲编号
  * sub_title: 副标题，当用于显示歌曲列表，此处为歌星名，否则隐藏
  * flags: 歌曲标签
  * song_ID: 歌曲ID
  * singer_ID: 歌星ID
  * is_scored: 该歌曲是否带有评分功能
  * played: 歌曲播放状态 0:未点，1:已点，2:正在播放
  * type: 为点击事件服务，如果type为singer歌手 则点击该组件跳转到歌星详情列表
  *                    如果type为song歌曲 则点击该组件时为点播歌曲
  *                    如果type为ordered已点 则点击该组件不做反应
  *                    如果type为record录音 则点击该组件进入录音分享界面
  * is_search: 搜索页面歌手右侧箭头显示，其他页面歌星右侧无此箭头
  * order_index: 已点列表专用，获取歌曲顺序
  * origin: 必传，获取点歌标识信息，后端搜集数据用
  * */
import { http, apis } from '@/libs/interfaces'
export default {
  name: 'song_item',
  data () {
    return {}
  },
  props: {
    Index: [String, Number],
    songindex: Number,
    title: String,
    sub_title: String,
    flags: Array,
    is_search: Boolean,
    played: Number,
    song_ID: [String, Number],
    singer_ID: [String, Number],
    type: {
      type: String,
      default: 'song'
    },
    imgs: {
      type: String,
      default: './images/head.png'
    },
    order_index: Number,
    origin: String,
    record_id: Number
  },
  computed: {
    showPlayStatus () {
      return this.played === 1 || this.played === 2
    }
  },
  methods: {
    handleClick () {
      // 当点击歌手时，跳转到歌手详情页，此处title为歌手名字,跳转到歌手歌曲列表
      if (this.type === 'singer') {
        this.$router.push('/thunder/singer/' + this.title)
      }
      // 当点击歌曲时，应为点歌功能，此处title为歌曲名字，sub_title为歌手名字，此时为点歌
      if (this.type === 'song') {
        this.orderSong()
      }
      // 点击录音列表的歌曲，跳转录音播放
      if (this.type === 'record') {
        this.$router.push('/thunder/customer/recordShare/' + this.record_id)
      }
    },
    // 点歌功能
    orderSong () {
      if (this.loading) {
        return
      }
      const self = this
      self.$loading.open()
      let openid = self.$store.state.openid
      let unionid = self.$store.state.unionid
      let params = {
        musicname: self.title,
        openid: openid,
        unionid: unionid,
        songid: self.song_ID,
        origin: self.origin
      }
      http.post(apis.list, params).then(res => {
        self.$loading.close()
        if (res.errcode === 21001) {
          self.$store.commit('SAVE_RAISE_SONGNAME', self.title)
          self.$store.commit('SAVE_RAISE_SONGID', self.song_ID)
          self.allow_raise ? self.$store.commit('SHOW_RAISE_SONG') : self.$store.commit('SHOW_FEEDBACK')// messageBox
        }
      }).catch(e => {
        self.$loading.close()
        self.allow_raise ? self.$store.commit('SHOW_RAISE_SONG') : self.$store.commit('SHOW_FEEDBACK')
      })
    },
    setTop () {
      if (this.type !== 'ordered' || this.played !== 1) {
        return
      }
      let self = this
      self.$loading.open()
      let openid = self.$store.state.openid
      let unionid = self.$store.state.unionid
      let params = {
        openid: openid,
        mno: self.song_ID,
        mindex: self.order_index,
        unionid: unionid
      }
      http.get(apis.top, params).then(res => {
        if (res.errcode === 21001) {
          self.$emit('setTop')
          self.$loading.close()
        } else {
          self.$toast({ message: '置顶失败' })
          self.$loading.close()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.list-item {
  display: flex;
  align-items: center;
  @include px2rem(padding, 41 0 41 63);
  border-bottom: 1px solid #eee;
  background: #fff;
}

.singer-img {
  display: flex;
  @include px2rem(margin-right, 61);
  align-items: center;
  img {
    @include px2rem(height, 180);
    @include px2rem(width, 180);
  }
}

.songindex {
  opacity: 0.4;
  @include px2rem(margin-right, 30);
}

.info {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  p {
    display: flex;
    align-items: center;
    @include px2rem(padding-right, 20);
    color: #000;
    @include fontSize(16px);
  }
  .title {
    @include px2rem(margin-bottom, 20);
  }
}

.music-name {
  display: flex;
  align-items: center;
}

.singer-name {
  opacity: 0.4;
}

.flag {
  @include px2rem(margin-left, 20);
  // @include px2rem(padding, 3 4);
  color: #ee7a31;
  @include fontSize(12px);
  font-weight: 700;
  // @include px2rem(line-height, );
  border: 2px solid #ee7a31;
}

.right-arrow {
  display: flex;
  align-items: center;
  @include px2rem(margin-right, 60);
}

.song-status {
  display: flex;
  justify-content: center;
  align-items: center;
  @include px2rem(width, 166);
  @include px2rem(height, 84);
  @include px2rem(margin-right, 60);
  .playing {
    @include px2rem(width, 46);
    @include px2rem(height, 40);
  }
  .played {
    @include px2rem(width, 166);
    @include px2rem(height, 84);
  }
}
</style>
