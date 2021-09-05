<template>
  <div class="centralP">
    <div id="Text">
      <el-row class="qiudata1">
        <el-col :span="12" style="padding-left: 0.2rem">
          <p class="sdn1">{{ qiudata[0].name }}</p>
          <p class="sdv1">{{ qiudata[0].value }}</p>
        </el-col>
        <el-col :span="12" style="padding-left: 2.75rem">
          <p class="sdn1">{{ qiudata[1].name }}</p>
          <p class="sdv1">{{ qiudata[1].value }}</p>
        </el-col>
      </el-row>
      <el-row class="qiudata2">
        <el-col :span="8" style="padding-left: 0.2rem">
          <p class="sdn1">{{ qiudata[2].name }}</p>
          <p class="sdv1">{{ qiudata[2].value }}</p>
        </el-col>
        <el-col :span="8">
          <p class="goldent">实时开户数</p>
        </el-col>
        <el-col :span="8" style="padding-left: 1.7rem">
          <p class="sdn1">{{ qiudata[3].name }}</p>
          <p class="sdv1">{{ qiudata[3].value }}</p>
        </el-col>
      </el-row>
      <div class="oact-box">
        <div v-for="(k, i) in realtimeaccount" :key="i" class="oaccounter">
          <p>{{ k }}</p>
        </div>
      </div>
      <p class="oact-zrzs">昨日总数</p>
      <p class="oact-count">12001</p>
    </div>

    <el-row id="Pie">
      <el-col :span="12" class="leftpie"> <div id="centerPie2"></div></el-col>
      <el-col :span="12" class="rightpie"> <div id="centerPie1"></div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      realtimeaccount: "10836",
      pieright: [
        { value: 356, name: "资金账户" },
        { value: 565, name: "xx1账户" },
        { value: 190, name: "xx2账户" },
        { value: 2566, name: "证券账户" },
        { value: 1245, name: "xx3账户" },
        { value: 1245, name: "xx4账户" },
      ],
      qiudata: [
        { name: "用户提交开户数", value: "246" },
        { name: "待处理数", value: "67" },
        { name: "用户注册数", value: "678" },
        { name: "退回数", value: "8" },
      ],
    };
  },

  components: {},

  computed: {},
  mounted() {
    this.drawpie1();
    this.drawpie2();
  },

  methods: {
    drawpie1() {
      let myChart = this.$echarts.init(document.getElementById("centerPie1"));
      let maxrad = 40;
      let total = 100;
      let borderdec = `${((maxrad + total / 2 - 4) / total) * 100}%`;
      myChart.setOption({
        color: [
          "rgba(2,120,231,0.25)",
          "rgba(52,209,96,0.25)",
          "rgba(138,0,225,0.25)",
          "rgba(241,150,16,0.25)",
          "rgba(0,198,255,0.25)",
          "rgba(54,55,168,0.25)",
          "#9bca63",
          "#fad860",
          "#f3a43b",
          "#60c0dd",
          "#d7504b",
          "#c6e579",
          "#f4e001",
          "#f0805a",
          "#26c0c0",
        ],
        series: [
          {
            name: "半径模式",
            type: "pie", //这个type决定了你画的图的类型是饼图还是柱状图等
            radius: [30, 90], //饼图的内环和外环的半径
            center: ["50%", "47%"], //玫瑰图在画布上的相对位置
            roseType: "area", //这里可以选择radius或area
            itemStyle: {
              normal: {
                borderWidth: 1,

                label: {
                  show: true, //数据标签显示
                  position: "inside",
                  //数据标签的字体配置，与其他组件相同
                  textStyle: {
                    fontSize: 12, //字号
                    fontWeight: "normal", //粗细【normal\bold\bolder\lighter】
                    fontFamily: "Microsoft YaHei", //字体【 'serif'\'monospace'\'Arial'\'Courier New'\'Microsoft YaHei'】
                    color: "#5bbffe", //颜色各异
                  },

                  formatter: "{value|{c}}", //a:系列名，就是你上面写的name半径模型，b：数据名，就是rose1，c：数据值，d百分比
                  rich: {
                    value: {
                      fontSize: 15,
                      fontFamily: "微软雅黑",
                      color: "white",
                    },
                  },
                },
                labelLine: {
                  show: false, //数据标签引导线
                  length: 6,
                  lineStyle: {
                    width: 1,
                    type: "solid",
                  },
                },
              },
            },
            data: this.pieright,
          },
          {
            name: "半径模式",
            type: "pie", //这个type决定了你画的图的类型是饼图还是柱状图等
            radius: [30, 90], //饼图的内环和外环的半径
            center: ["50%", "47%"], //玫瑰图在画布上的相对位置
            roseType: "area", //这里可以选择radius或area
            itemStyle: {
              normal: {
                // color: 各异,
                borderWidth: 1,

                label: {
                  show: true, //数据标签显示
                  position: "outside",
                  //数据标签的字体配置，与其他组件相同
                  textStyle: {
                    fontSize: 12, //字号
                    fontWeight: "normal", //粗细【normal\bold\bolder\lighter】
                    fontFamily: "Microsoft YaHei", //字体【 'serif'\'monospace'\'Arial'\'Courier New'\'Microsoft YaHei'】
                    color: "#5bbffe", //颜色各异
                  },

                  formatter: "{b}", //a:系列名，就是你上面写的name半径模型，b：数据名，就是rose1，c：数据值，d百分比
                  rich: {
                    value: {
                      fontSize: 15,
                      fontFamily: "微软雅黑",
                      color: "white",
                    },
                  },
                },
                labelLine: {
                  show: true, //数据标签引导线
                  length: 6,
                  lineStyle: {
                    width: 1,
                    type: "solid",
                  },
                },
              },
            },
            data: this.pieright,
            labelLine: {
              normal: {
                show: false,
              },
            },
          },
          {
            name: "外边框",
            type: "pie",
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            center: ["50%", "47%"],
            radius: [borderdec, borderdec],
            // label: {
            //   normal: {
            //     show: true,
            //     position: "center",
            //     formatter: "{total|账户\n类型}",
            //     rich: {
            //       total: {
            //         fontSize: 14,
            //         fontFamily: "微软雅黑",
            //         color: "white",
            //       },
            //     },
            //   },
            // },
            labelLine: {
              normal: {
                show: false,
              },
            },

            data: [
              {
                value: 9,
                name: "",
                itemStyle: {
                  normal: {
                    borderWidth: 1,
                    borderColor: "#2985e0",
                  },
                },
              },
            ],
          },
          {
            name: "opacity黑色圆无边框",
            type: "pie",
            center: ["50%", "47%"],
            radius: ["0%", "20%"],
            itemStyle: {
              borderWidth: 1,

              color: "rgba(0,0,0,0.6)",
            },
            labelLine: {
              length: -10,
            },
            label: {
              normal: {
                show: true,
                position: "center",
                formatter: "{total|账户\n类型}",
                rich: {
                  total: {
                    fontSize: 14,
                    fontFamily: "微软雅黑",
                    color: "white",
                  },
                },
              },
            },
            data: [{ value: 50, name: "搜索引擎" }],
          },
        ],
        tooltip: {
          show: false,
        },
      });
    },
    drawpie2() {
      let myChart = this.$echarts.init(document.getElementById("centerPie2"));
      let maxrad = 40;
      let total = 100;
      let borderdec = `${((maxrad + total / 2 - 4) / total) * 100}%`;
      let iborderdec = `${((maxrad + total / 2 - 26) / total) * 100}%`;
      myChart.setOption({
        color: [
          "rgba(2,120,231,0.25)",
          "rgba(52,209,96,0.25)",
          "rgba(138,0,225,0.25)",
          "rgba(241,150,16,0.25)",
          "rgba(0,198,255,0.25)",
          "rgba(54,55,168,0.25)",
          "#9bca63",
          "#fad860",
          "#f3a43b",
          "#60c0dd",
          "#d7504b",
          "#c6e579",
          "#f4e001",
          "#f0805a",
          "#26c0c0",
        ],
        series: [
          {
            name: "外边框",
            type: "pie",
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            center: ["30%", "45%"],
            radius: [0, borderdec],
            // label: {
            //   normal: {
            //     show: true,
            //     position: "center",
            //     formatter: "{total|渠道}",
            //     rich: {
            //       total: {
            //         fontSize: 14,
            //         fontFamily: "微软雅黑",
            //         color: "white",
            //       },
            //     },
            //   },
            // },

            itemStyle: {
              borderWidth: 1,
              borderColor: "#2985e0",
              color: "rgba(1,26,97,0)",
            },

            labelLine: {
              length: -10,
            },

            data: [
              { value: 50, name: "临柜" },
              { value: 50, name: "见证" },
              { value: 50, name: "网上开户" },
              { value: 50, name: "智慧通" },
            ],
          },
          {
            name: "opcaity蓝色圆外边框",
            type: "pie",
            center: ["30%", "45%"],
            radius: ["0%", "68%"],
            itemStyle: {
              borderWidth: 1,
              borderColor: "#2985e0",
              color: "rgba(1,26,97,0.9)",
            },
            labelLine: {
              length: -10,
            },
            label: {
              show: false,
            },
            data: [{ value: 50, name: "搜索引擎" }],
          },

          {
            name: "面积模式",
            type: "pie",
            radius: [0, 70],
            center: ["30%", "45%"],
            roseType: "radius",
            itemStyle: {
              borderRadius: 0,
            },

            label: {
              show: true, //数据标签显示
              position: "inside",
              //数据标签的字体配置，与其他组件相同
              textStyle: {
                fontSize: 12, //字号
                fontWeight: "normal", //粗细【normal\bold\bolder\lighter】
                fontFamily: "Microsoft YaHei", //字体【 'serif'\'monospace'\'Arial'\'Courier New'\'Microsoft YaHei'】
                color: "#5bbffe", //颜色各异
              },

              formatter: "{value|{c}}", //a:系列名，就是你上面写的name半径模型，b：数据名，就是rose1，c：数据值，d百分比
              rich: {
                value: {
                  fontSize: 15,
                  fontFamily: "微软雅黑",
                  color: "white",
                },
              },
            },
            data: [
              {
                value: 30,
                name: "rose 1",
                itemStyle: { color: "rgba(2,120,231,0.55)" },
              },
              {
                value: 10,
                name: "rose 2",
                itemStyle: { color: "rgba(0,0,0,0)" },
                label: { show: false },
              },
              {
                value: 26,
                name: "rose 3",
                itemStyle: { color: "rgba(52,209,96,0.55)" },
              },
              {
                value: 10,
                name: "rose 4",
                itemStyle: { color: "rgba(0,0,0,0)" },
                label: { show: false },
              },
              {
                value: 22,
                name: "rose 5",
                itemStyle: { color: "rgba(138,0,225,0.55)" },
              },
              {
                value: 10,
                name: "rose 6",
                itemStyle: { color: "rgba(0,0,0,0)" },
                label: { show: false },
              },
              {
                value: 18,
                name: "rose 7",
                itemStyle: { color: "rgba(241,150,16,0.55)" },
              },
              {
                value: 10,
                name: "rose 8",
                itemStyle: { color: "rgba(0,0,0,0)" },
                label: { show: false },
              },
            ],
          },
          {
            name: "opacity黑色圆无边框",
            type: "pie",
            center: ["30%", "45%"],
            radius: ["0%", "20%"],
            itemStyle: {
              borderWidth: 1,

              color: "rgba(0,0,0,0.6)",
            },
            labelLine: {
              length: -10,
            },
            label: {
              normal: {
                show: true,
                position: "center",
                formatter: "{total|渠道}",
                rich: {
                  total: {
                    fontSize: 14,
                    fontFamily: "微软雅黑",
                    color: "white",
                  },
                },
              },
            },
            data: [{ value: 50, name: "搜索引擎" }],
          },
        ],
        tooltip: {
          show: false,
        },
      });
    },
  },
};
</script>
<style lang='less' scoped>
.centralP {
  height: 100%;
  background-image: url("./img/qiu.png");
  background-position: -20px 85%;
  background-size: 100%;

  // background-color: bisque;
}
#Text {
  height: 65%;
  //   background-color: chocolate;
  //   opacity: 0.3;

  // background-color: cornsilk;
  .oact-zrzs {
    font-size: 0.225rem;
    color: #999;
    margin: 0.125rem 0 0 2.375rem;
    text-align: center;
    width: 50%;
  }
  .oact-count {
    font-size: 0.6rem;
    width: 50%;
    margin:0.1rem 0 0 2.36rem;
    text-align: center;
    font-weight:bold;
  }
  .qiudata1 {
    height: 33%;
    width: 100%;
    padding-top: 0.875rem;
    box-sizing: border-box;
  }
  .qiudata2 {
    height: 22%;
    width: 100%;
    padding-top: 0.225rem;
    box-sizing: border-box;
  }

  .oact-box {
    display: flex;
    width: 42%;
    margin-left: 2.6875rem;
    text-align: center;
  }
}

.qiudata1,
.qiudata2 {
  .sdn1 {
    color: white;
    font-size: 0.225rem;
    // padding-top: 20px;
  }
  .sdv1 {
    color: #20fdfa;
    font-size: 0.375rem;
    padding-top: 0.175rem;
  }
  .goldent {
    font-size: 0.45rem;
    text-align: center;
    padding-top: 0.2rem;
    margin-left: -0.1rem;
    color: #eccc7e;
    font-weight: bold;
  }
}

#Pie {
  //   background-color: chartreuse;
  //   opacity: 0.5;
  height: 35%;
  .leftpie {
    // width: 34%;
    // background-color: cornflowerblue;
    height: 100%;
    #centerPie2 {
      height: 100%;
    }
  }
  .rightpie {
    // width: 38%;
    padding-left: 5%;
    height: 100%;
    #centerPie1 {
      height: 100%;
    }
  }
}
</style>
