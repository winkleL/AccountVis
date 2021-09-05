<template>
  <div id="app">
    <datav />
    <!-- <test-chart/> -->
  </div>
</template>

<script>
import datav from './components/datav/index.vue'
import LeftChart1 from './components/datav/LeftChart1.vue'
import TestChart from './components/datav/test.vue'

export default {
  name: 'app',
  components: {
    datav,
    TestChart
  },
  data () {
    return {}
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
