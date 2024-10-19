// this is entry point (file) 整個framework code從這裡開始執行
import "./assets/main.css";
import "primeicons/primeicons.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import router from "./router"; // 這邊是import目錄，應該會自動抓index.js

import { createApp } from "vue";
import App from "./App.vue";

// 這邊就跟node, express很像了
const app = createApp(App);

app.use(router);
app.use(Toast);

app.mount("#app");
