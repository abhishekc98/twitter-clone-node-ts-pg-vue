<template>
  <div id="app" class="flex container h-screen w-full border-r">
    <!-- Left navigation bar -->
    <div class="w-2/7 border-r px-8 py-2 pos">
      <!-- Twitter Logo  -->
      <button
        class="h-12 w-12 hover:bg-blue-100 text-3xl rounded-full text-blue"
      >
        <i class="fab fa-twitter text-blue-500" />
      </button>

      <!-- left navigation tabs -->
      <div class="w-1/5 container">
        <!-- visit each tab and display a button for each tab -->
        <button
          v-for="tab in tabs"
          v-bind:key="tab.id"
          class="
            flex
            items-center
            mr-auto
            mb-1.5
            py-2
            px-4
            hover:bg-blue-100
            rounded-full
          "
        >
          <i v-bind:class="tab.icon" class="text-2xl mr-4 text-left"></i>
          <p class="text-lg font-semibold text-left">{{ tab.title }}</p>
        </button>

        <!-- tweet button left navigation -->
        <button
          class="
            items-center
            p-3
            mt-2
            bg-blue-500
            text-white
            rounded-full
            w-56
            h-12
            font-semibold
          "
        >
          Tweet
        </button>
      </div>
    </div>

    <!-- Middle component for posts -->
    <!-- <div
      class="
        w-full
        border-r
        md:w-1/2
        h-full
        overflow-y-scroll
        hide-scroll
        relative
      "
    >
      <div
        class="
          py-3
          border-b border-lighter
          flex
          items-center
          justify-between
          fixed
          md:w-1/2
        "
      >
        <h1 class="text-xl font-bold">Home</h1>
        <i class="far fa-star text-xl text-blue"></i>
      </div> -->
    <div class="w-full md:w-1/2 h-full overflow-y-scroll hide-scroll border-r">
      <div
        class="
          px-5
          py-3
          border-b border-lighter
          flex
          items-center
          justify-between
        "
      >
        <h1 class="text-xl font-bold">Home</h1>
        <i class="far fa-star text-xl text-blue"></i>
      </div>

      <!-- tweet box -->
      <div class="border-b h-40 w-full container flex flex-row mt-12">
        <div class="w-1/5 p-4">
          <i class="fa-solid fa-circle-user text-5xl"></i>
        </div>

        <form
          v-on:submit.prevent="postTweet(currentTweetContent)"
          class="block w-full"
        >
          <textarea
            v-model="currentTweetContent"
            class="
              w-full
              h-24
              p-2
              border-b
              resize-none
              focus:outline-none
              hide-scroll
            "
            placeholder="What's happening?"
          ></textarea>
          <div class="flex items-center max-w-max">
            <i class="text-lg text-blue mr-4 far fa-image"></i>
            <i class="text-lg text-blue mr-4 fas fa-film"></i>
            <i class="text-lg text-blue mr-4 far fa-chart-bar"></i>
            <i class="text-lg text-blue mr-4 far fa-smile"></i>
          </div>
          <button
            type="submit"
            class="
              float-right
              -mt-6
              mr-2
              bg-blue-500
              text-white
              rounded-full
              w-20
              h-10
              font-semibold
            "
          >
            Tweet
          </button>
        </form>
      </div>

      <!-- All tweets -->
      <div class="container p-2">
        <div
          v-for="tweet in tweets"
          class="container p-1"
          v-bind:key="tweet.post_id"
        >
          <!-- <div class="flex-none mr-4">
            <i class="fa-solid fa-circle-user text-3xl"></i>
          </div> -->
          <div class="w-full">
            <div class="flex flex-row">
              <i class="fa-solid fa-circle-user text-3xl"></i>

              <div class="flex items-center w-full ml-3">
                <p class="font-semibold">Abhishek Chakraborty</p>
                <p class="text-sm text-dark ml-2">@abhishek</p>
                <p class="text-sm text-dark ml-2">1 sec</p>
                <i class="fas fa-angle-down text-dark ml-auto"></i>
              </div>
            </div>

            <p class="py-4 h-24 overflow-y-scroll hide-scroll">
              {{ tweet.text }}
            </p>
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center text-sm text-dark">
                <i class="far fa-comment mr-3"></i>
                <p>0</p>
              </div>
              <div class="flex items-center text-sm text-dark">
                <i class="fas fa-retweet mr-3"></i>
                <p>0</p>
              </div>
              <div class="flex items-center text-sm text-dark">
                <i class="fas fa-heart mr-3"></i>
                <p>1</p>
              </div>
              <div class="flex items-center text-sm text-dark">
                <i class="fas fa-share-square mr-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--right bar-->
    <div
      class="
        md:block
        hidden
        w-1/3
        h-full
        border-l border-lighter
        py-2
        px-6
        overflow-y-scroll
        hide-scroll
        relative
      "
    >
      <input
        class="
          pl-12
          rounded-full
          w-full
          p-2
          bg-lighter
          text-sm
          mb-4
          h-10
          bg-slate-200
          focus:outline-blue-500
          border-none
        "
        placeholder="Search Twitter"
      />
      <i
        class="
          fas
          fa-search
          absolute
          left-0
          top-0
          mt-5
          ml-12
          text-sm text-light
        "
      ></i>
      <div class="block p-5 bg-greem-200"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import store from "../store";

export default {
  name: "home-page",

  data() {
    return {
      tabs: [
        { icon: "fas fa-home", title: "Home", id: "home" },
        { icon: "fas fa-hashtag", title: "Explore", id: "explore" },
        { icon: "far fa-bell", title: "Notifications", id: "notifications" },
        { icon: "far fa-envelope", title: "Messages", id: "messages" },
        { icon: "far fa-bookmark", title: "Bookmarks", id: "bookmarks" },
        { icon: "fas fa-clipboard-list", title: "Lists", id: "lists" },
        { icon: "far fa-user", title: "Profile", id: "profile" },
        { icon: "fas fa-ellipsis-h", title: "More", id: "more" },
      ],
      currentTweetContent: "",
    };
  },

  methods: {
    ...mapActions(["addTweet", "getAllTweets"]),
    postTweet(currentTweetContent) {
      this.addTweet(currentTweetContent);
    },
    getTweets() {
      this.getAllTweets();
      console.log("get tweets: ", store.state.tweet.tweets);
      return store.state.tweet.tweets;
    },
  },
  computed: {
    tweets() {
      store.dispatch("getAllTweets");
      console.log("get tweets: ", store.state.tweet.tweets);
      return store.state.tweet.tweets.reverse() || [];
    },
  },
};
</script>
