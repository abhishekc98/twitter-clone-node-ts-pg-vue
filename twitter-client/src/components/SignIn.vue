<template>
  <div class="container md:w-2/3">
    <div><span>Sign in your account</span></div>
    <div class="mt-2">
      <form v-on:submit.prevent="login(formData)" class="flex flex-row">
        <input
          type="email"
          v-model="formData.email"
          class="h-6 border-2"
          id="email "
          placeholder="Email"
          required
        />
        <input
          type="text"
          v-model="formData.password"
          class="h-6 border-2"
          id="password"
          placeholder="Password"
          required
        />
        <button type="submit" class="w-10 bg-blue-500">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "sign-in",
  data() {
    return {
      formData: { email: "", password: "" },
    };
  },
  methods: {
    ...mapActions(["loginUser", "loadUser"]),
    login(formData) {
      this.loginUser(formData);
    },
  },
};
</script>
