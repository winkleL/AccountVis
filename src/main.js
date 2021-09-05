import Vue from 'vue'
import App from './App.vue'

import './assets/common.less'
import './assets/accountstyle.css'

import dataV from '@jiaminghi/data-view'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment';
import axios from "axios";


import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;



Vue.config.productionTip = false

Vue.use(dataV)
Vue.use(ElementUI);
//时间戳
Vue.prototype.$moment = moment
new Vue({
  render: h => h(App)
}).$mount('#app')
