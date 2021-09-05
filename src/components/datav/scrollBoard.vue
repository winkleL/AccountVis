<template>
  <div id="scroll-board">
    <dv-scroll-board :config="config" />
  </div>
</template>

<script>
export default {
  name: "ScrollBoard",
  data() {
    return {
      config: {
        // header: ['时间', '病害信息', '数量', '标段'],
        data: [
          ["科创板报送情况", "390", "0", "4s"],
          ["科创板报送情况", "390", "0", "4s"],
          ["科创板报送情况", "390", "0", "4s"],
          ["科创板报送情况", "390", "0", "4s"],
        ],

        columnWidth: [600, 200, 200,200],
        align: ["center"],
        rowNum: 4,

        headerHeight: 0,
        oddRowBGC: "rgba(0, 44, 81, 0)",
        evenRowBGC: "rgba(10, 29, 50, 0)",
      },
    };
  },
};
</script>

<style lang="less">
#scroll-board {
  width: 100%;
  box-sizing: border-box;
  // margin-left: 20px;
  height: 100%;
  overflow: hidden;

  .rows{
    .row-item{
    //   border-bottom:1px dotted #0087f3;
    //  .ceil{
    //    box-sizing: border-box;
    //  }
      .ceil:first-child{
        text-align: left;
        margin-right:1.75rem;
      }
      .ceil:last-child{
       
        padding-right:0.5rem;
      }
    }
  }
}
</style>
