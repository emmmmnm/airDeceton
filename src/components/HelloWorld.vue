<template>
  <div>
    <!--头部区域-->
    <div class="header">
      <!--logo-->
      <span class="logo">公园环境监测</span>
      <!--搜索栏-->
      <div class="search" style="display: inline">
        <el-input inline placeholder="请输入关键字" style="width: 180px"></el-input>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </div>
      <!--菜单导航栏-->
      <div class="nav">
        <ul>
          <li>首页</li>
          <li>环境监测</li>
          <li>公园实景</li>
          <li>提前预约</li>
          <div class="login">
            <el-button type="text" style="color: #fff">登录</el-button>
            <el-button type="text" style="color: #fff">注册</el-button>
          </div>
        </ul>
      </div>
    </div>
    <!--banner区域-->
    <div class="banner">
      <!--占位用的-->
      <div class="zhanwei"></div>
      <div class="banner_left">
        <div style="color: white">
          <span>{{this.airAqi.city + '市'}}</span>
          <el-button type="text">更改城市</el-button>
          <span style="margin-left: 30px">{{this.airAqi.date}}</span>
        </div>
        <div>
          <span style="font-size: 72px;color: #EDC24A;">{{this.airAqi.quality}}</span>
          <span>AQI:</span>
          <span style="color:#EDC24A; "> {{this.airAqi.AQI}}</span>
        </div>
        <div>
          <el-button type="info">首要污染物</el-button>
          <span>颗粒物(PM10)</span>
        </div>
        <div style="margin-top: 12px">
          <el-button type="info"> 健 康 提 示 </el-button>
          <span>空气质量可以接受，但某些污染物可能对极少数异常敏感人群健康有较弱的影响</span>
        </div>
        <div style="margin-top: 12px">
          <span>全国城市排名<span>245</span> 优于全国<span>29.6%</span>的城市</span>
        </div>
        <div>
          <span>截至今日，今年累计蓝天数<span>289</span>天，优良占比<span>70.71%</span></span>
        </div>
      </div>
      <div class="banner_center">
        <div class="aqi">
          <span style="float: left;color: #fff;">城市AQI排名</span>
          <span style="float: right;color: #fff;">更多排名</span>
        </div>
      </div>
      <div class="banner_right">
        <p>生活小贴士</p>
        <p style="text-align: left">
          洪山区今日小雨，出门记得带伞哦！今日有轻度雾霾，记得戴口罩哦！
        </p>
      </div>
    </div>
    <!--内容区域-->
    <div class="content">
      <!--<el-button-group style="float: left;left: 50px">-->
        <!--<el-button type="primary">10</el-button>-->
        <!--<el-button type="primary">20</el-button>-->
        <!--<el-button type="primary">30</el-button>-->
      <!--</el-button-group>-->
      <div class="airQuity">
        <h2>公园指数状况趋势</h2>
        <div id="temp1" style="width: 100%;height: 400px; overflow-x: auto"></div>
        <div id="hum1" style="width: 100%;height: 400px;"></div>
        <div id="illu1" style="width: 100%;height: 400px;"></div>
        <div id="temp2" style="width: 100%;height: 400px;"></div>
        <div id="hum2" style="width: 100%;height: 400px;"></div>
        <div id="illu2" style="width: 100%;height: 400px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {getaqis, getcityrank, getth} from '../api/getaqi'
export default {
  name: 'HelloWorld',
  data () {
    return {
      timer: 0,
      airAqi: [],
      park1: [],
      park2: [],
      // 公园一温度
      park1_temp: [],
      // 公园一湿度
      park1_humi: [],
      // 公园一光照
      park1_illu: [],
      // 公园一时间
      park1_date: [],
      // 公园二温度
      park2_temp: [],
      // 公园二湿度
      park2_humi: [],
      // 公园二光照
      park2_illu: [],
      // 公园二时间
      park2_date: []
    }
  },
  methods: {
    drawTem1Chart (data1, data2) {
      this.chartPie = echarts.init(document.getElementById('temp1'))
      this.chartPie.setOption({
        title: {
          text: '公园一温度情况',
          subtext: '数据每5s更新一次',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          // data: ['PM2.5', 'PM10']
          data: data1
        },
        xAxis: {
          type: 'category',
          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          data: data2
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          // data: [820, 932, 901, 934, 1290, 1330, 1320],
          data: data1,
          type: 'line'
        }]
      })
    },
    drawhum1Chart (data1, data2) {
      this.chartPie = echarts.init(document.getElementById('hum1'))
      this.chartPie.setOption({
        title: {
          text: '公园一湿度情况',
          subtext: '数据每5s更新一次',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['PM2.5', 'PM10']
        },
        xAxis: {
          type: 'category',
          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          data: data2
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          // data: [820, 932, 901, 934, 1290, 1330, 1320],
          data: data1,
          type: 'line'
        }]
      })
    },
    drawillu1Chart (data1, data2) {
      this.chartPie = echarts.init(document.getElementById('illu1'))
      this.chartPie.setOption({
        title: {
          text: '公园一光照情况',
          subtext: '数据每5s更新一次',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['PM2.5', 'PM10']
        },
        xAxis: {
          type: 'category',
          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          data: data2
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          // data: [820, 932, 901, 934, 1290, 1330, 1320],
          data: data1,
          type: 'line'
        }]
      })
    },
    drawTem2Chart (data1, data2) {
      this.chartPie = echarts.init(document.getElementById('temp2'))
      this.chartPie.setOption({
        title: {
          text: '公园二温度情况',
          subtext: '数据每5s更新一次',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['PM2.5', 'PM10']
        },
        xAxis: {
          type: 'category',
          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          data: data2
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          // data: [820, 932, 901, 934, 1290, 1330, 1320],
          data: data1,
          type: 'line'
        }]
      })
    },
    drawhum2Chart (data1, data2) {
      this.chartPie = echarts.init(document.getElementById('hum2'))
      this.chartPie.setOption({
        title: {
          text: '公园二湿度情况',
          subtext: '数据每5s更新一次',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['PM2.5', 'PM10']
        },
        xAxis: {
          type: 'category',
          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          data: data2
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          // data: [820, 932, 901, 934, 1290, 1330, 1320],
          data: data1,
          type: 'line'
        }]
      })
    },
    drawillu2Chart (data1, data2) {
      this.chartPie = echarts.init(document.getElementById('illu2'))
      this.chartPie.setOption({
        title: {
          text: '公园二光照情况',
          subtext: '数据每5s更新一次',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['PM2.5', 'PM10']
        },
        xAxis: {
          type: 'category',
          data: data2
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: data1,
          type: 'line'
        }]
      })
    },
    _getaqi () {
      const param = {
        city: 'wuhan',
        key: '0dc8bef2e35ff0cecee65d2e0a357fd6'
      }
      getaqis(param).then((res) => {
        if (res && res.statuage === 200) {
          console.log(res.data.result[0].citynow)
          this.airAqi = res.data.result[0].citynow
        } else {
          this.$message({
            type: 'waring',
            message: res.status
          })
        }
      })
    },
    _getcityrank () {
      getcityrank().then((res) => {
        // const airstr = res.data
        // console.log(airstr[0])
        // const newstr = airstr.slice(9, airstr.length - 1)
        // const arr = newstr.split('}')
        // const reg = /^\{(.*?)/gm
        // const arr1 = reg.exec(airstr)
        // console.log(arr1)
        // console.log(newstr}
        // console.log(arr)
        // for (let i = 0; i < 10; i++) {
        //   this.airAqi.push(arr[i])
        // }
        // console.log(this.airAqi)
      })
    },
    _getth () {
      getth().then((res) => {
        const data = res.data.result
        // this.park1_date = data.group1.dateList.reverse().slice(0, 10)
        // this.park1_temp = data.group1.tempList.reverse().slice(0, 10)
        // this.park1_humi = data.group1.humiList.reverse().slice(0, 10)
        // this.park1_illu = data.group1.illuList.reverse().slice(0, 10)
        // this.park2_date = data.group2.dateList.reverse().slice(0, 10)
        // this.park2_temp = data.group2.tempList.reverse().slice(0, 10)
        // this.park2_humi = data.group2.humiList.reverse().slice(0, 10)
        // this.park2_illu = data.group2.illuList.reverse().slice(0, 10)
        this.park1_date = data.group1.dateList.slice(0, 10)
        this.park1_temp = data.group1.tempList.slice(0, 10)
        this.park1_humi = data.group1.humiList.slice(0, 10)
        this.park1_illu = data.group1.illuList.slice(0, 10)
        this.park2_date = data.group2.dateList.slice(0, 10)
        this.park2_temp = data.group2.tempList.slice(0, 10)
        this.park2_humi = data.group2.humiList.slice(0, 10)
        this.park2_illu = data.group2.illuList.slice(0, 10)
        for (let i = 0; i < this.park1_date.length; i++) {
          this.park1_date[i] = this.park1_date[i].split(' ')[1]
        }
        for (let i = 0; i < this.park2_date.length; i++) {
          this.park2_date[i] = this.park2_date[i].split(' ')[1]
        }
        this.drawTem1Chart(this.park1_temp, this.park1_date)
        this.drawhum1Chart(this.park1_humi, this.park1_date)
        this.drawillu1Chart(this.park1_illu, this.park1_date)
        this.drawTem2Chart(this.park2_temp, this.park2_date)
        this.drawhum2Chart(this.park2_humi, this.park2_date)
        this.drawillu2Chart(this.park2_illu, this.park2_date)
      })
    }
  },
  mounted () {
    // this._getth()
    this._getaqi()
    // this._getcityrank()
    if (this.timer) {
      clearInterval()
    } else {
      this.timer = setInterval(() => {
        this._getth()
      }, 5000)
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  width: 100%;
  height: 122px;
  background: url("../../static/imgs/bj.png") no-repeat;
  background-position: -20px 0;
  background-size: 100%;
  position: relative;
}
.header .nav{
  width: 100%;
  height: 50px;
  background-color: #5d91e0;
  position: absolute;
  bottom: 0;
}
.nav>ul{
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  padding: 0;
}
.nav>ul>li{
  padding: 0;
  list-style: none;
  float: left;
  width: 110px;
  height: 50px;
  margin: 0 10px;
  box-sizing: border-box;
  text-align: center;
  line-height: 50px;
  border-bottom: 2px solid transparent;
}
.nav>ul>li:hover{
  border-bottom: 2px solid black;
}
.header .logo{
  font-size: 30px;
  font-family: "微软雅黑";
  color: white;
  position: absolute;
  left: 45px;
  line-height: 75px;
  user-select: none;
}
.header .search{
  width: 254px;
  height: 34px;
  position: absolute;
  right: 50px;
  line-height: 75px;
  display: inline;
}
.header .login{
  width: 200px;
  height: 50px;
  float: right;
  color: #000;
  text-align: center;
  line-height: 50px;
  right: 50px;
}
  .banner{
    width: 100%;
    height: 445px;
    background: url("../../static/imgs/banner.png") no-repeat;
  }
  .zhanwei{
    width: 10%;
    height: 100%;
    float: left;
  }
  .banner .banner_left{
    width: 50%;
    height: 100%;
    float: left;text-align: left;
    user-select: none;
  }
.banner .banner_center{
  width: 20%;
  height: 100%;
  background:rgba(0,0,0,0.2);
  float: left;
}
.banner_center .aqi{
  width: 100%;
  height: 50px;
  border-bottom: 1px solid white;
  line-height: 50px;
}
.banner .banner_right{
  width: 20%;
  height: 100%;
  float: left;
  background-color: #3de4da;
  color: white;
}
.content{
  width: 100%;
  /*height: 500px;*/
}
  .content .airQuity{
    width: 80%;
    height: 400px;
    margin: 0 auto;
  }
</style>
