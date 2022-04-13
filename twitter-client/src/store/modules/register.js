import router from '../../router';
import axios from 'axios';

const state = {
  isRegisterSucess: false,
};

//const getters = {};

const actions = {
  async registerUser({ commit }, formData) {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(formData);
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/users',
        body,
        config
      );
      console.log('register user action: ', response.data);
      commit('setRegisterState');
      router.push('/login');
    } catch (error) {
      //console.error(error);
      commit('resetState');
    }
  },
};

const mutations = {
  setRegisterState(state) {
    state.isRegisterSucess = true;
  },
  resetState(state) {
    state.isRegisterSucess = false;
  },
};

export default {
  state,
  actions,
  mutations,
};

// import { loginService } from '../services/login.service';
// import { router } from '../../router';
// const state = {
//   isLogin: false,
//   token: null,
//   user: null,
// };
// const actions = {
//   login({ commit }, { username, password }) {
//     commit('loginRequest', { username });

//     let result = loginService.login(username, password);
//     if (result) {
//       commit('loginSuccess');
//       console.log('login success');
//       router.push('/home');
//     }
//   },
//   logout({ commit }) {
//     commit('resetState');
//     router.push('/');
//   },
//   clearState({ commit }) {
//     commit('resetState');
//   },
// };
// const mutations = {
//   resetState(state) {
//     state.isLogin = false;
//     state.token = null;
//     state.user = null;
//   },
//   loginRequest(state, user) {
//     state.isLogin = true;
//     state.token = null;
//     state.user = user;
//   },
//   loginSuccess(state) {
//     state.isLogin = true;
//     state.token = null;
//     state.user = null;
//   },
//   loginFailure(state) {
//     state.isLogin = false;
//   },
// };
// export const login = {
//   namespaced: true,
//   state,
//   actions,
//   mutations,
// };
