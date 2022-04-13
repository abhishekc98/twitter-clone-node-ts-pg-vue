import axios from 'axios';

const state = {
  currTweet: null,
  tweets: null,
};

const actions = {
  async addTweet({ commit }, tweet) {
    console.log('tweet content: ', tweet);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = {
        text: tweet.toString(),
      };
      const res = await axios.post(
        'http://localhost:8000/api/v1/posts',
        JSON.stringify(body),
        config
      );
      console.log('response add post: ', res.data);
      commit('setCurrTweet', res.data);
    } catch (error) {
      alert(error.message);
      commit('resetState');
    }
  },

  async getAllTweets({ commit }) {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/posts');
      console.log('tweets: ', res.data);
      commit('setTweets', res.data);
    } catch (error) {
      commit('resetState');
    }
  },
};

const mutations = {
  setCurrTweet(state, tweet) {
    console.log('current tweet', tweet);
    state.currTweet = tweet;
  },
  setTweets(state, tweets) {
    console.log('all tweets: ', tweets);
    state.tweets = tweets;
  },
  resetState(state) {
    state.currTweet = null;
  },
};

export default {
  state,
  actions,
  mutations,
};
