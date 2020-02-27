import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App' // 加载vue根实例
import store from './store' // 导入 vuex store配置
import router from './router'// 导入 vue-router 配置

import '@/icons' // icon
import '@/permission' // 添加router变化钩子函数，实现用户登录拦截，权限控制，permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'

import axios from 'axios'

// || process.env.NODE_ENV === 'development'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

// vue对象添加静态变量 axios
// Compatible with vue-resources
Vue.prototype.$http = axios

// vue对象添加静态变量 bus
// Compatible with vue 1.0 message bus
Vue.prototype.$bus = new Vue()

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
