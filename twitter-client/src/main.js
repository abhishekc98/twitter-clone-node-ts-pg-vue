import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import router from './router';
import store from './store';
import './index.css';

Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
