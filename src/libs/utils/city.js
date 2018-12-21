/*
import pinyinlite from 'pinyinlite/index_full';

// 初始化城市数据格式
function initCitys() {
    let cityArr = [];
    for (let i = 0; i < 26; i++) {
        let obj = {};
        obj.letter = String.fromCharCode(65 + i);
        obj.citys = [];
        cityArr.push(obj);
    }
    return cityArr;
};

// 获取城市拼音第一个字母
function getFirstLetter(str) {
    return pinyinlite(str)[0][0].charAt(0).toUpperCase();
};

// 全拼
function getFullPinyin(str) {
    let fullPinyin = '',
        nStr = str.replace(/\s/, '');
    for (let txt of nStr) {
        // 空白字符不加拼音
        fullPinyin += pinyinlite(txt)[0][0];
    }
    // console.log(fullPinyin, 'fullPinyin')
    return fullPinyin;
};

// 简拼
function getJPinyin(str) {
    let jPinyin = '',
        nStr = str.replace(/\s/, '');
    for (let txt of nStr) {
        jPinyin += pinyinlite(txt)[0][0].charAt(0);
    }
    return jPinyin;
};

// 城市数据添加拼音
function addPinyin(citys) {
    let pyCitys = [];
    // 格式化城市数据
    for (let i = 0, len = citys.length; i < len; i++) {
        let cityItem = {};
        cityItem.cityName = citys[i].busNumber ? citys[i] + ' ' + citys[i] : citys[i];
        cityItem.fullPinyin = getFullPinyin(cityItem.cityName);
        cityItem.jPinyin = getJPinyin(cityItem.cityName);
        pyCitys.push(cityItem);
    }
    return pyCitys;
};

const ScityPlugin = {
    // 格式化城市数据
    formatCitys: function (cityL) {
        let cityArr = initCitys();
        console.log(cityArr, 1111)
        for (let i = 0, len = cityL.length; i < len; i++) {
            // 将城市数据(citys)按A-Z的顺序放入initCitys中
            // 获取城市拼音首字母的ASCII编码(charCodeAt()),并减去65(A的编码)
            let _index = getFirstLetter(cityL[i]).charCodeAt() - 65;
            if (_index >= 0 && _index < 26) {
                cityArr[_index].citys.push(cityL[i]);
            }
        }
        console.log(cityArr, 222)
        // 如果citys中的数据为空，过滤掉(用js的filter()方法)
        return cityArr.filter(val => {
            let len = val.citys.length;
            return len > 0;
        });
    },
    searchCitys: function (citys, keyWords) {
        let newCitys=[];
        citys.forEach(item=>{
          var names=item.citys;
          names.forEach(it=>{
            let city={};
            city.cityName=it;
            newCitys.push(city);
          })
        })
        return addPinyin(newCitys).filter(val => {
            return val.cityName.indexOf(keyWords) > -1 || val.fullPinyin.indexOf(keyWords.toLowerCase()) > -1 || val.jPinyin.indexOf(keyWords.toLowerCase()) > -1;
        });
      }
    // searchCitys: function (citys, keyWords) {
    //     return addPinyin(citys).filter(val => {
    //         return val.cityName.indexOf(keyWords) > -1 || val.fullPinyin.indexOf(keyWords.toLowerCase()) > -1 || val.jPinyin.indexOf(keyWords.toLowerCase()) > -1;
    //     });
    // }
};

export default ScityPlugin;
*/
import pinyinlite from 'pinyinlite/index_full'

// 初始化城市数据格式
function initCitys () {
  let cityArr = []
  for (let i = 0; i < 26; i++) {
    let obj = {}
    obj.letter = String.fromCharCode(65 + i)
    obj.citys = []
    cityArr.push(obj)
  }
  return cityArr
};

// 获取城市拼音第一个字母
function getFirstLetter (str) {
  return pinyinlite(str)[0][0].charAt(0).toUpperCase()
};

// 全拼
function getFullPinyin (str) {
  // console.log("str",str)
  let fullPinyin = ''
  let nStr = str.replace(/\s/, '')
  for (let txt of nStr) {
    // 空白字符不加拼音
    fullPinyin += pinyinlite(txt)[0][0]
  }
  // console.log(fullPinyin, 'fullPinyin')
  return fullPinyin
};

// 简拼
function getJPinyin (str) {
  let jPinyin = ''
  let nStr = str.replace(/\s/, '')
  for (let txt of nStr) {
    jPinyin += pinyinlite(txt)[0][0].charAt(0)
  }
  return jPinyin
};

// 城市数据添加拼音
function addPinyin (citys) {
  let pyCitys = []
  // 格式化城市数据
  for (let i = 0, len = citys.length; i < len; i++) {
    let cityItem = {}
    cityItem.cityName = citys[i].busNumber ? citys[i].cityName + ' ' + citys[i].busNumber : citys[i].cityName
    cityItem.fullPinyin = getFullPinyin(cityItem.cityName)
    cityItem.jPinyin = getJPinyin(cityItem.cityName)
    pyCitys.push(cityItem)
  }
  return pyCitys
};

const ScityPlugin = {
  // 格式化城市数据
  formatCitys: function (cityL) {
    let cityArr = initCitys()
    for (let i = 0, len = cityL.length; i < len; i++) {
      // 将城市数据(citys)按A-Z的顺序放入initCitys中
      // 获取城市拼音首字母的ASCII编码(charCodeAt()),并减去65(A的编码)
      let _index = getFirstLetter(cityL[i]).charCodeAt() - 65
      if (_index >= 0 && _index < 26) {
        cityArr[_index].citys.push(cityL[i])
      }
    }
    // console.log(cityArr, 222)
    // 如果citys中的数据为空，过滤掉(用js的filter()方法)
    return cityArr.filter(val => {
      let len = val.citys.length
      return len > 0
    })
  },
  searchCitys: function (citys, keyWords) {
    let newCitys = []
    citys.forEach(item => {
      var names = item.citys
      names.forEach(it => {
        let city = {}
        city.cityName = it
        newCitys.push(city)
      })
    })
    return addPinyin(newCitys).filter(val => {
      return val.cityName.indexOf(keyWords) > -1 || val.fullPinyin.indexOf(keyWords.toLowerCase()) > -1 || val.jPinyin.indexOf(keyWords.toLowerCase()) > -1
    })
  }
}

export default ScityPlugin
