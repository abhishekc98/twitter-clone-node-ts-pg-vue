<template>
  <div class="container md:w-2/3">
    <div><span>Create your account</span></div>
    <div class="mt-2">
      <form v-on:submit.prevent="registerUser(formData)" class="flex flex-row">
        <input
          type="text"
          v-model="formData.name"
          class="h-6 border-2"
          id="name"
          placeholder="Name"
          required
        />
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
        <button type="submit" class="w-10 bg-blue-500">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "sign-up",
  data() {
    return {
      formData: { name: "", email: "", password: "" },
    };
  },
  methods: {
    ...mapActions(["registerUser"]),
  },

  // async registerUser() {
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(this.formData),
  //   };
  //   const response = await fetch("/api/v1/users", options);
  //   const resJson = await response.json();
  //   console.log("resJSON: ", resJson);
  // },
};
</script>
