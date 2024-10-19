<script setup>
import Navbar from "@/components/Navbar.vue";
import { RouterView } from "vue-router"; // 稱為outlet(出口)
</script>

<template>
  <Navbar />
  <!-- 每個頁面都有，不會變動的區塊 -->
  <!-- embed 可以把整個檔案崁進萊耶，後底線/一定要-->
  <RouterView />
  <!-- 有這個才可以把view砍進來 -->
  <!-- 使用view的邏輯就跟flask include, exclude概念雷同，都是為了簡化程式碼，並且將重複使用的區塊固定-->
</template>
