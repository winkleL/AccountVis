<template>
  <div>
     <el-button type="primary" @click="handleClick() ">主要按钮</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 1,
      tabIMG: [
        "",
        require("./img/tab/tab-01.png"),
        require("./img/tab/tab-02.png"),
        require("./img/tab/tab-03.png"),
      ],
    };
  },

  components: {},
  mounted() {
  
  },

  computed: {},

  methods: {
    handleClick() {
    
        this.$axios.post('http://mock-api.com/mgvAGqzQ.mock/businessStatistics', {
         openSource:'1',
         serachDate:'2021-09-02'
        })
            .then(function (value) {
                console.log(value);
            })
            .catch(function (reason) {
                console.log(reason);
            });

    }
       
}
};
</script>
<style lang='less' scoped>

</style>