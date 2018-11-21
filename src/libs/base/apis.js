const apis = {
  login: '/v1/login',
  initWx: '/v1/wx',
  deviceUrl: '/stb/device',
  funcUrl: '/stb/func',
  mv: '/vod/mv',
  pay: '/vod/pay', // 购买
  vip: '/vod/vip', // vip 信息
  theme: '/vod/theme', // 主题
  emoji: '/vod/emoji', // 表情
  group: '/vod/emoji/group', // 弹幕分组
  user_mv: '/vod/user/mv',
  user_info: '/vod/user_info',
  'upload_songs': '/u/upload/songs', // 录音列表
  'upload_song': '/u/upload/song', // 单个录音
  search: '/bar/u/remote_ctrl/search', // 搜索
  list: '/bar/u/remote_ctrl/song/list', // 列表
  top: '/bar/u/remote_ctrl/song/listtop', // 置顶
  play: '/bar/u/remote_ctrl/song/', // 播放控制
  dict: '/bar/u/remote_ctrl/dict', // 语音字典
  config: '/bar/u/wx/config', // 配置
  top_type: '/bar/u/remote_ctrl/top/',
  like: '/bar/u/remote_ctrl/song/like',
  singer_list: '/bar/u/remote_ctrl/song/getsingerlist' // 歌星列表
}
export default apis
