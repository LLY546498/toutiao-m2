import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 载入全局样式文件
import './styles/index.less'
// 导入 vant 组件
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
