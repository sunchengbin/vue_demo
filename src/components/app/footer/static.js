
const COMMON = {
  footIcons: [
    {
      id: 1,
      defaultSrc: 'home_icon',
      name: '首页',
      activeSrc: 'home_icon_active',
      routeName: 'index'
    },
    {
      id: 2,
      defaultSrc: 'my_icon',
      name: '',
      activeSrc: 'my_icon',
      routeName: 'about'
    },
    {
      id: 3,
      defaultSrc: 'my_icon',
      name: '我的',
      activeSrc: 'my_icon_active',
      routeName: 'mine'
    }
  ],
  entry: [
    {
      name: '霸屏祝福',
      icon: require('./imgs/zhufu_entry_icon.png'),
      route: 'zhufu'
    },
    {
      name: '特权赠送',
      icon: require('./imgs/charge_entry_icon.png'),
      route: 'charge'
    },
    {
      name: '霸屏表白',
      icon: require('./imgs/biaobai_entry_icon.png'),
      route: 'biaobai'
    }
  ]
}

export default COMMON
