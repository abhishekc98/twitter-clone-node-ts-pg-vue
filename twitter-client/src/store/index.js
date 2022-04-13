import Vue from 'vue';
import Vuex from 'vuex';
import register from './modules/register';
import login from './modules/login';
import tweet from './modules/tweet';

//Load Vuex
Vue.use(Vuex);

//Create Store
export default new Vuex.Store({
  modules: {
    register,
    login,
    tweet,
  },
});
