<template>
  <div id="data-view">
    <dv-full-screen-container>
      <div class="main-header">
        <div class="mh-left"></div>
        <div class="mh-middle">账户业务全景视图</div>
        <div class="mh-right">timestamp</div>
      </div>

      <div class="main-container">
        <div class="border-box-content">
          <!-- 左侧布局 -->
          <div class="right-main-container">
            <!-- 左上 -->
            <div class="rmc-top-container">
              <!-- 实时业务 -->
             <left-top/>
              <!-- 中间地球 -->
              <div class="rmctc-left2-container">
                <!-- <Center-Cmp /> -->
                <left-top-2/>
              </div>
            </div>
            <!-- 网上开户流程节点情况 -->
            <div class="rmc-bottom-container panelcontainer">
              <!-- <Bottom-Charts /> -->
              <div class="paneltitlebg">
                <p class="paneltitle">网上开户流程节点情况</p>
              </div>
              <div class="contentbox">
                <!-- 左侧格子 -->
                <div class="left-grid">
                  <div
                    v-for="(step, i) of procedureObj"
                    :key="i"
                    class="grid-item"
                  >
                    <div>{{ step.name }}</div>
                    <!-- <div style="{'background':'url(./img/node/1-01.png)','width':'100%','height':'30%'}">{{step.icon}}</div> -->
                    <div>{{ step.count }}</div>
                    <div class="icon"></div>
                  </div>
                </div>
              </div>
              <div class="horn lb"></div>
              <div class="horn rb"></div>
            </div>
          </div>
          <!-- 业务核查一览 -->
          <div class="ywhc-chart-container">
            <div class="panelcontainer" style="height: 100%">
              <div class="paneltitlebg">
                <p class="paneltitle">业务核查一览</p>
              </div>
              <div class="ywhc-chart">
                <div class="rad-card">
                  <div class="titlebox">监管报送情况</div>
                  <div class="ywhc-content"><scroll-board/></div>
                </div>
                <div class="rad-card">
                  <div class="titlebox">数据对比情况</div>
                <div class="ywhc-content"><scroll-board/></div>
                </div>
                <div class="rad-card">
                  <div class="titlebox">协议归档情况</div>
                  <div class="ywhc-content"><scroll-board-3/></div>
                </div>
                <div class="rad-card">
                  <div class="titlebox">智能处理完成情况</div>
                   <div class="ywhc-content"><scroll-board-3/></div>
                </div>
                <div class="rad-card">
                  <div class="titlebox">报障情况</div>
                  123
                </div>
              </div>
              <div class="horn lb"></div>
              <div class="horn rb"></div>
            </div>

            <!-- <Left-Chart-1 />
          <Left-Chart-2 />
          <Left-Chart-3 /> -->
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
// import LeftChart1 from "./LeftChart1";
// import LeftChart2 from "./LeftChart2";
// import LeftChart3 from "./LeftChart3";

// import CenterCmp from "./CenterCmp";

// import RightChart1 from "./RightChart1";
// import RightChart2 from "./RightChart2";

// import BottomCharts from "./BottomCharts";
import LeftTop from "./lt1.vue"
import LeftTop2 from "./lt2.vue"
import ScrollBoard from "./scrollBoard.vue"
import ScrollBoard3 from "./scrollBoard3.vue"
export default {
  name: "DataView",
  components: {
    // LeftChart1,
    // LeftChart2,
    // LeftChart3,
    // CenterCmp,
    // RightChart1,
    // RightChart2,
    // BottomCharts,
    LeftTop,
    LeftTop2,
    ScrollBoard,
   ScrollBoard3
  },
  data() {
    return {
      
      //时间戳
      
      time: "",
      
      procedureObj: [
        { name: "证件上传", icon: "./img/node/1-01", count: "昨日" },
        { name: "证件上传", icon: "", count: "昨日" },
        { name: "证件上传", icon: "", count: "昨日" },
        { name: "证件上传", icon: "", count: "昨日" },
        { name: "证件上传", icon: "", count: "昨日" },
        { name: "证件上传", icon: "", count: "昨日" },
        { name: "证件上传", icon: "", count: "昨日" },
      ],
      
    };
  },
  methods: {
   
    //格式化时间
    formatDate() {
      this.time = this.$moment(new Date())
        .format("YYYY-MM-DD  HH:mm:ss")
        .toString();
    },
    //1s更新一次
    getTimes() {
      setInterval(this.formatDate, 1000);
      this.clear();
    },
    //回收
    clear() {
      clearInterval(this.formatDate);
      this.formatDate = null;
    },
  },
  mounted() {
    this.getTimes();
  },
};
</script>

<style lang="less">
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
    background-image: url("./img/bg.jpg");
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-header {
    height: 9.7%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    background-image: url("./img/top.png");
    background-size: cover;

    .mh-left {
      font-size: 20px;
      color: rgb(1, 134, 187);

      a:visited {
        color: rgb(1, 134, 187);
      }
    }

    .mh-middle {
      height: 100%;
      line-height: 1.3rem;
      font-size:0.5rem;
      letter-spacing: 0.2rem;
      font-weight: 600;
      color: white;
      text-shadow: 0 0 0.2em rgb(117, 255, 248), -0 -0 0.2em rgb(117, 255, 248);
      font-family: "SourceHanSansCN";
      width:24%;
    }

    .mh-left,
    .mh-right {
      width: 5.625rem;
    }
    .mh-right {
      height: 18px;
      line-height: 18px;
      text-align: right;
      padding-right: 25px;
      padding-bottom: 32px;
      font: bold 18px Microsoft YaHei;
    }
  }

  .main-container {
    height: calc(~"100% - 104px");
    margin-top: -20px;
    .border-box-content {
      box-sizing: border-box;
      display: flex;
      position: relative;
      width: 100%;
      height: 100%;
    }
  }

  .ywhc-chart-container {
    width: 30%;
    padding: 0 25px 15px 20px;

    box-sizing: border-box;
    // background-color: burlywood;

    .border-box-content {
      flex-direction: column;
    }
  }

  .right-main-container {
    width: 70%;
    padding-left: 22px;
    padding-bottom: 10px;
    box-sizing: border-box;
    // border: 1px solid red;
  }

  .rmc-top-container {
    //确定上半部分高度
    height: 65%;
    display: flex;
    // background-color: aqua;
    padding-bottom: 15px;
  
  }
  // 地球容器
  .rmctc-left2-container {
    width: 60%;
   
  
    // background-color: blanchedalmond;

  }
  

  .rmc-bottom-container {
    // margin-top: 15px;
    height: 33%;
    // background-color: cadetblue;
    .contentbox {
      background-color: antiquewhite;
      height: 86%;
      padding-left: 48px;
      .left-grid {
        width: 62%;
        height: 100%;
        background-color: chocolate;
        display: flex;
        justify-content: space-around;
        .grid-item {
          width: 12%;
          background-color: cyan;
          .icon {
            background-image: url("./img/node/1-01.png");
            height: 102px;
            width: 102px;
          }
          div:first-child{
            font-size:0.125rem;
          }
          div:nth-child(2){
            font-size:0.125rem;
          }
        }
      }
    }
  }

  .rmctc-chart-1 {
    height: 93%;
    // background-color: chartreuse;
    .rad-card {
      width: 95%;
      margin: 0 auto;
      box-sizing: border-box;
      
      .titlebox {
        width: 185px;
        // font-size: 0.175rem;
      }
    }
    .rad-card:first-child {
      height: 23%;
      margin-top: 8px;
      // padding-left: 26px;
      .card-content-box {
        // height: 100%;
        padding-left: 26px;
        padding-top: 0.375rem;
        box-sizing: border-box;
      }
    }
    .rad-card:nth-child(2) {
      height: 40%;
      margin-top: 8px;
    }
    .rad-card:last-child {
      height: 30%;
      margin-top: 8px;
    }
  }

  .tabdefa {
    font-size: 14px;
    font-family: "SourceHanSansCN";
    color: rgba(255, 255, 255, 0.502);
    line-height: 44px;
    text-align: center;
  }
  .tabact {
    font-size: 18px;
    font-family: "SourceHanSansCN";
    color: rgb(255, 255, 255);
    font-weight: bold;
    line-height: 44px;
    text-align: center;
  }
  .ywhc-chart {
    height: 95%;
    padding: 0 10px;
    // padding-top:10px;
    .rad-card {
      margin-top: 8px;
     
      .ywhc-content{
        height:80%;
        padding: 0rem 0 0rem 0.2rem;
        
        box-sizing: border-box;
      }
    }
    .rad-card:first-child,
    .rad-card:nth-child(2) {
      height: 22%;
    }
    .rad-card:nth-child(3),
    .rad-card:nth-child(4) {
      height: 17%;
    }
    .rad-card:last-child {
      height: 16%;
    }
    .titlebox {
      width: 167.2px;
      // font-size: 0.175rem;
    }
  }
}
</style>
