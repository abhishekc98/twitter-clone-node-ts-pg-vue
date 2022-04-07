<template>
  <div class="h-screen mb-0 p-0 flex flex-nowrap overflow-y-hidden">
    <!-- Left section -->
    <section class="bg-blue-500 h-full md:basis-full">
      <div class="center bg-cover h-full bg-landing-bg w-0 md:w-full">
        <div class="w-4/5 h-4/5 center">
          <i class="center fab fa-twitter md:text-landing-logo text-white" />
        </div>
      </div>
    </section>
    <!-- Right section -->
    <section class="bg-white h-screen basis-full">
      <div class="m-8 h-full">
        <div class="h-10 w-full">
          <i class="fab fa-twitter text-blue-500 text-4xl" />
        </div>
        <div class="h-1/3">
          <div class="h-2/3 center">
            <div class="m-2 w-full">
              <span class="font-worksans font-fontWeightCustom text-7xl"
                >Happening now</span
              >
            </div>
          </div>
          <div class="m-2 mt-4">
            <span class="font-worksans font-fontWeightCustom text-3xl"
              >Join Twitter today.</span
            >
          </div>
        </div>
        <div class="relative m-2 h-1/2">
          <div class="w-full">
            <button
              type="button"
              class="
                w-2/3
                mt-4
                md:w-72
                p-2
                rounded-full
                bg-blue-500
                hover:bg-blue-600
              "
            >
              <span class="font-bold text-white">Sign up with email</span>
            </button>
          </div>
          <div class="absolute bottom-2 w-full">
            <p class="text-lg font-bold">Already have an account?</p>
            <button
              type="button"
              class="
                w-2/3
                mt-4
                md:w-72
                p-2
                border-2
                rounded-full
                bg-white
                hover:bg-blue-100
              "
            >
              <span class="font-bold text-blue-500">Sign in</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "landing-page",
};
</script>