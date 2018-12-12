import axios from 'axios'

// 获取aqi的接口
export function getaqis (params) {
  return axios({
    method: 'GET',
    url: '/environment/air/cityair',
    dataType: 'jsonp',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params
  })
}

// 获取城市排名的接口

export function getcityrank () {
  return axios({
    method: 'GET',
    url: '/aqi/cityrank.json?callback=cityrank&_=1437026960327'
  })
}
// 获取实时的温度和湿度

export function getth () {
  return axios({
    methods: 'GET',
    url: 'http://123.206.49.156:8889/squirrel/message/time',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
