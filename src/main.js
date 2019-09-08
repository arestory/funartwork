import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter);
import ActressDetailPage from './views/ActressDetailPage.vue'
//http://172.96.244.220:9595/
const routes = [

  {
    path: "/actress/detail", component: ActressDetailPage
  }
]
const router = new VueRouter({

  routes
})

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch(err => err)
// }
new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
