<template>

    <div class="ssyw-container panelcontainer">
      <div class="paneltitlebg">
        <el-row style="width: 100%; height: 100%">
          <el-col :span="6"><p class="paneltitle">实时业务</p></el-col>
          <el-col :span="18">
            <el-row>
              <el-col :span="8"
                ><div
                  v-bind:class="[tab == 1 ? 'tabact' : 'tabdefa']"
                  @click="handleClick(1)"
                >
                  集中运营
                </div></el-col
              >
              <el-col :span="8"
                ><div
                  v-bind:class="[tab == 2 ? 'tabact' : 'tabdefa']"
                  @click="handleClick(2)"
                >
                  网厅掌厅
                </div></el-col
              >
              <el-col :span="8"
                ><div
                  v-bind:class="[tab == 3 ? 'tabact' : 'tabdefa']"
                  @click="handleClick(3)"
                >
                  移动展业
                </div></el-col
              >
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="rmctc-chart-1">
        <!-- <Right-Chart-1 /> -->

        <div class="rad-card">
          <div class="card-content-box">
            <el-row>
              <el-col :span="5"><img :src="tabIMG[tab]" alt="" /></el-col>
              <el-col :span="19">
                <el-row class="ssywbox">
                  <el-col :span="9">
                    <p class="ssyw-c1">
                      {{ boxdata.realTimebusinessTotalCount }}
                    </p>
                    <p class="ssyw-c2">实时业务总量</p>
                    <p
                      v-bind:class="[
                        boxdata.compareBusinessCount > 0
                          ? 'ssyw-c3up'
                          : 'ssyw-c3down',
                      ]"
                    >
                      <span>昨日</span
                      >{{ boxdata.compareBusinessCount | changeUDStyle }}
                    </p>
                  </el-col>
                  <el-col :span="9">
                    <p class="ssyw-c1">
                      {{ boxdata.averageDealTime }}<span>S</span>
                    </p>
                    <p class="ssyw-c2">平均办理耗时</p>
                    <p
                      v-bind:class="[
                        boxdata.compareAverageDealTime > 0
                          ? 'ssyw-c3up'
                          : 'ssyw-c3down',
                      ]"
                    >
                      <span>昨日</span
                      >{{ boxdata.compareAverageDealTime | changeUDStyle }}
                    </p>
                  </el-col>
                  <el-col :span="6">
                    <p class="ssyw-c1">
                      {{ boxdata.successRate | Rate2Number }}<span>%</span>
                    </p>
                    <p class="ssyw-c2">成功率</p>
                    <p
                      v-bind:class="[
                        boxdata.compareSuccessRate > 0
                          ? 'ssyw-c3up'
                          : 'ssyw-c3down',
                      ]"
                    >
                      <span>昨日</span
                      >{{ boxdata.compareSuccessRate | changeUDStyle }}
                    </p>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="rad-card">
          <div class="titlebox">子类业务实时数量TOP5</div>

          <div id="myChart" :style="{ width: '100%', height: '90%' }"></div>
        </div>
        <div class="rad-card">
          <div class="titlebox">子类业务办理耗时TOP5</div>
          <div id="myChart1" :style="{ width: '100%', height: '90%' }"></div>
        </div>
      </div>

      <div class="horn lb"></div>
      <div class="horn rb"></div>

      <!-- <dv-border-box-4 class="rmctc-chart-2" :reverse="true">

                <Right-Chart-2 />

              </dv-border-box-4> -->
    </div>

</template>

<script>
export default {
  data() {
    return {
      loading: false,
      tab: 1, //openSource,
      serachDate: "",
      openSource: "",
      tabIMG: [
        "",
        require("./img/tab/tab-01.png"),
        require("./img/tab/tab-02.png"),
        require("./img/tab/tab-03.png"),
      ],
      boxdata: {
        realTimebusinessTotalCount: 1000, //实时业务数
        compareBusinessCount: -300, // 相对于昨日的业务办理量，大于0标识新增，小于0标识减少
        averageDealTime: 1000, //平均办理耗时
        compareAverageDealTime: 500, //相对于昨日的业务办理耗时，大于0标识新增，小于0标识减少
        successRate: 0.98, //成功率
        compareSuccessRate: -0.05, //相对于昨日的成功率，大于0标识新增，小于0标识减少
      },
      subBusinessList: [],
      subBusinessTime: [],
      sssl: {
        type: [
          "t科创板开",
          "t创业板开",
          "t港股通开",
          "t增开证券账",
          "t退市整理股",
        ],
        last: [2800, 2893, 2704, 2278, 1099],
        today: [2901, 2550, 2408, 2001, 1845],
      },
      blhs: {
        type: [
          "t科创板开",
          "t创业板开",
          "t港股通开",
          "t增开证券账",
          "t退市整理股",
        ],
        last: [42, 42, 42, 42, 42],
        today: [42, 42, 42, 42, 42],
      },
    };
  },

  components: {},
  filters: {
    Rate2Number: function (value) {
      return value < 0 ? -value * 100 : value * 100;
    },
    changeUDStyle: function (value) {
      if (value < 1) {
        if (value > 0) {
          return `${value * 100}%↑`;
        } else if (value < 0 && Math.abs(value) > 1) {
          return `${-value}↓`;
        } else {
          return `${-value * 100}%↓`;
        }
      } else {
        return `${value}↑`;
      }
    },
  },
  created() {
    // this.init();
    // if(this.openSource!==''&&this.serachDate!==''){
    //   this.getDataFromESB();
    // }
    this.getDataFromESB();
  },
  mounted() {
    if(!this.loading){
      this.drawChart();
       this.drawChart1();

    }
   
   
  },

  computed: {},

  methods: {
    
    // handleClick(e) {
    //   this.tab = e;
    // },
    init() {
      this.serachDate = this.$moment(new Date())
        .format("YYYY-MM-DD")
        .toString();
      this.openSource = this.tab;
      console.log(this.serachDate, this.openSource);
    },
    getDataFromESB() {
      this.$axios
        .post("http://10.10.3.107:8080/businessStatistics", {
          openSource: "1",
          serachDate: "2021-09-02",
        })
        .then(function (res) {
          console.log(res.data);
          this.boxdata.realTimebusinessTotalCount =
            res.data.realTimebusinessTotalCount;
          this.boxdata.compareBusinessCount = res.data.compareBusinessCount;
          this.boxdata.averageDealTime = res.data.averageDealTime;
          this.boxdata.compareAverageDealTime = res.data.compareAverageDealTime;
          this.boxdata.successRate = res.data.successRate;
          this.boxdata.compareSuccessRate = res.data.compareSuccessRate;
          this.sssl = this.FormatData(res.data.subBusinessList, 0);
          this.blhs = this.FormatData(res.data.subBusinessTime, 1);
          this.loading=false;
          // console.log(this.loading);
          // this.FormatData();
        })
        .then(() => console.log(this.loading))
        .catch(function (reason) {
          console.log(reason);
        });
    },
    FormatData(sourceData, listindex) {
      let ty,
        la,
        t = [];
      if (listindex == 0) {
        for (let o in sourceData) {
          ty.push(o.atomicName);
          la.push(o.yestodayBusinessCount);
          t.push(o.realTimeBusinessCount);
        }
        let obj = { type: ty, last: la, today: t };
      } else {
        for (let o in sourceData) {
          ty.push(o.atomicName);
          la.push(o.yestodayAverageDealTime);
          t.push(o.businessAverageDealTime);
        }
        let obj = { type: ty, last: la, today: t };
      }
      return obj;
    },
    //顶部轮播
    changeTab() {
      this.tab > 2 ? (this.tab = 1) : this.tab++;
      // console.log(this.tab);
    },
    //1s更新一次
    slideTab() {
      setInterval(this.changeTab, 4000);
      this.clear();
    },
    //回收
    clear() {
      clearInterval(this.changeTab);
      this.formatDate = null;
    },
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        legend: {
          icon: "rect",
          itemHeight: 14,
          itemWidth: 14,
          orient: "vertical",
          x: "84%",
          y: "2%",
          textStyle: {
            color: "#3560ae",
          },

          data: ["今日", "昨日"],
        },
        grid: {
          top: "50px",
          left: "16px",
          right: "16px",
          bottom: "30px",

          //  height:"70%",
        },

        tooltip: {},
        xAxis: {
          type: "category",
          data: this.sssl.type,
          splitLine: {
            show: false,
          },
          axisLine: {
            //坐标轴轴线相关设置。
            show: false,
          },
          axisTick: {
            //坐标轴刻度相关设置。
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "white", //更改坐标轴文字颜色
              fontSize: 12, //更改坐标轴文字大小
            },
          },
        },
        yAxis: {
          show: false,
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {
            barWidth: 14,
            name: "今日",
            type: "bar",
            data: this.sssl.today,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0,
                  [
                    {
                      offset: 0,
                      color: "#0489F0", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#28D8E8", // 100% 处的颜色
                    },
                  ],
                  false
                ),
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "white",
                    fontSize: 14,
                  },
                  offset: [-10, 0],
                },
              },
            },
            markPoint: {
              symbol: "circle",
              itemStyle: { color: "rgba(0,0,0,0)" },
              label: {
                formatter: "{c|{c}}",
                // backgroundColor: 'rgb(242,242,242)',

                lineHeight: 26,
                // shadowBlur: 5,
                // shadowColor: '#000',
                // shadowOffsetX: 0,
                // shadowOffsetY: 1,
                position: ["55%", 0],
                // distance: 0,
                rich: {
                  c: {
                    color: "#03c7f9",
                    fontWeight: "bold",
                    fontSize: 24,
                  },
                },
              },

              data: [
                { value: 1, xAxis: 0, yAxis: 0 },
                { value: 2, xAxis: 1, yAxis: 0 },
                { value: 3, xAxis: 2, yAxis: 0 },
                { value: 4, xAxis: 3, yAxis: 0 },
                { value: 5, xAxis: 4, yAxis: 0 },
              ],
            },
          },
          {
            name: "昨日",
            type: "bar",
            barWidth: 14,
            barGap: "60%",
            data: this.sssl.last,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0,
                  [
                    {
                      offset: 0,
                      color: "#0B01B8", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#8B86E4", // 100% 处的颜色
                    },
                  ],
                  false
                ),
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#3560ae",
                    fontSize: 16,
                  },
                },
              },
            },
          },
        ],
      });
    },
    drawChart1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart1"));
      // 绘制图表
      myChart.setOption({
        legend: {
          icon: "rect",
          itemHeight: 14,
          itemWidth: 14,
          orient: "vertical",
          x: "84%",
          y: "4%",
          textStyle: {
            color: "#3560ae",
          },

          data: ["今日", "昨日"],
        },
        grid: {
          top: "70px",
          left: "16px",
          right: "16px",
          bottom: "30px",

          //  height:"70%",
        },

        tooltip: {},
        xAxis: {
          type: "category",
          data: this.blhs.type,
          splitLine: {
            show: false,
          },
          axisLine: {
            //坐标轴轴线相关设置。
            show: false,
          },
          axisTick: {
            //坐标轴刻度相关设置。
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "white", //更改坐标轴文字颜色
              fontSize: 12, //更改坐标轴文字大小
            },
          },
        },
        yAxis: {
          show: false,
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {
            barWidth: 20,
            name: "今日",
            type: "bar",
            data: this.blhs.today,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0,
                  [
                    {
                      offset: 0,
                      color: "#0336ff", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#1920b2", // 100% 处的颜色
                    },
                  ],
                  false
                ),
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "white",
                    fontSize: 14,
                  },
                  offset: [0, 4],

                  formatter: "{c|{c}S}",
                  rich: {
                    c: {
                      fontSize: 14,
                    },
                  },
                },
              },
              data: [
                { value: 1, xAxis: 0, yAxis: 0 },
                { value: 2, xAxis: 1, yAxis: 0 },
                { value: 3, xAxis: 2, yAxis: 0 },
                { value: 4, xAxis: 3, yAxis: 0 },
                { value: 5, xAxis: 4, yAxis: 0 },
              ],
            },
          },
          {
            name: "昨日",
            type: "bar",
            barWidth: 20,
            barGap: "50%",
            data: this.blhs.last,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0,
                  [
                    {
                      offset: 0,
                      color: "#003a90", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#092e66", // 100% 处的颜色
                    },
                  ],
                  false
                ),
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式

                    fontSize: 14,
                  },
                  offset: [0, 4],

                  formatter: "{c|{c}S}",
                  rich: {
                    c: {
                      color: "#3560ae",
                      fontSize: 14,
                    },
                  },
                },
              },
            },
          },
        ],
      });
    },
  },
};
</script>
<style lang='less' scoped>
#myChart {
  margin-top: -20px;
}
#myChart1 {
  margin-top: -25px;
}
// 实时业务容器

.ssyw-container {
  width: 40%;
  //40% 别瞎改 要命

  //  padding-bottom: 15px;

  // background-color: antiquewhite;
  // .ssyw-contentbox {
  //   height: 100%;
  // }
  .ssywbox {
    // text-align: center;
    // padding-top:0.06em;
    vertical-align: middle;
    .ssyw-c1 {
      // line-height: 0.375rem;
      font-size: 0.375rem;
      color: #20fdfa;
      span {
        color: white;
        font-size: 0.175rem;
        padding-left: 0.05rem;
      }
    }
    .ssyw-c2 {
      font-size: 0.175rem;
      padding-bottom: 0.05rem;

      color: white;
      span {
        color: white;
        font-size: 0.175rem;
        padding-left: 0.05rem;
      }
    }
    .ssyw-c3up {
      font-size: 0.175rem;
      color: #fa1313;

      span {
        font-size: 0.15rem;
        color: #3560ae;
        padding-right: 0.02rem;
      }
    }
    .ssyw-c3down {
      font-size: 0.175rem;
      color: #06ea81;

      span {
        font-size: 0.15rem;
        color: #3560ae;
      }
    }
  }
}
</style>