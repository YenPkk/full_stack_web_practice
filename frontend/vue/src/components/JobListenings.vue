<script setup>
import { RouterLink } from "vue-router";
import { reactive, defineProps, onMounted } from "vue";
import JobListening from "@/components/JobListening.vue";
import axios from "axios";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
});

const state = reactive({
  // 使用reative建出來的Object(在這也就是state)不可以被reassing，但是他的屬性可以，比如說可以 state.isLoading=false
  jobs: {},
  isLoading: true,
});

onMounted(async () => {
  try {
    const respone = await axios.get("/api/jobs");
    state.jobs = respone.data; // axios回傳回來的資料會放在data這個屬性裡
  } catch (error) {
    console.error("Error fetching jobs", error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <!-- 這邊的css都是Tailwind寫法，想要知道就在去看課吧 -->
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Browse Jobs
      </h2>
      <!-- Show loading spinner while loading is true -->
      <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>

      <!-- Show job listing when done loading -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobListening
          v-for="job in state.jobs.slice(0, limit || state.jobs.length)"
          :key="job.id"
          :job="job"
        />
        <!-- :job="job" -->
        <!-- :job="job" 這一樣是一個prop的寫法，因該是因為涉及了v-for，所以要用vue型式的屬性，因為vue形式的屬性才能把屬性值視為"變數"，我們才能正確iterate jobs -->
      </div>
    </div>
  </section>

  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/jobs"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >View All Jobs</RouterLink
    >
  </section>
</template>
