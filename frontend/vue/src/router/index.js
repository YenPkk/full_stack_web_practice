import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import JobsView from "@/views/JobsView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import JobView from "@/views/JobView.vue";
import AddJobView from "@/views/AddJobView.vue";
import EditJobView from "@/views/EditJobView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 這樣才可以用browser的返回鍵
  routes: [
    // 這邊的邏輯就是打到什麼url給什麼view(回想一下flask中，url(path)與...的對應就稱為route)
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/jobs",
      name: "jobs",
      component: JobsView,
    },
    {
      path: "/jobs/:id",
      name: "job",
      component: JobView,
    },
    {
      path: "/jobs/add",
      name: "add-job",
      component: AddJobView,
    },
    {
      path: "/jobs/edit/:id",
      name: "edit-job",
      component: EditJobView,
    },
    {
      // 不強制要放在最後面，但邏輯上最好如此
      path: "/:catchAll(.*)", // 抓沒有設定的route
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;
