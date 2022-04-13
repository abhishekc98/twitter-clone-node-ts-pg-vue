import axios from 'axios';
import router from '../../router';
import store from '../../store';

const state = {
  isLoggedIn: false,
  token: localStorage.getItem('token'),
  user: null,
};

const actions = {
  async loginUser({ commit }, formData) {
    console.log('login user called');
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(formData);
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/auth',
        body,
        config
      );
      console.log('token in loginUser: ', response.data);
      commit('setToken', response.data);
      store.dispatch('loadUser');
    } catch (error) {
      //console.log(error.message);
      commit('resetState');
    }
  },

  async loadUser({ commit }) {
    console.log('dispatched load user');
    if (localStorage.token) {
      console.log('token in present loading user');
      axios.defaults.headers.common['x-auth-token'] = localStorage.token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
    try {
      const user = await axios.get('http://localhost:8080/api/v1/auth');
      commit('setUser', user.data);
      commit('setIsLoggedIn', true);
      router.push('/home');
    } catch (error) {
      // console.log(error.message);

      commit('resetState');
    }
  },
};

const mutations = {
  setToken(state, token) {
    state.token = token;
    localStorage.setItem('token', token);
  },
  resetState(state) {
    (state.user = null), (state.token = null), (state.isLoggedIn = false);
  },
  setUser(state, user) {
    state.user = user;
  },
  setIsLoggedIn(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
  },
};

export default {
  state,
  actions,
  mutations,
};
