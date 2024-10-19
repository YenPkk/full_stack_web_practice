<script setup>
import Hero from '@/components/Hero.vue'
import HomeCard from '@/components/HomeCard.vue'
import JobListenings from '@/components/JobListenings.vue'
</script>

<template>
    <Hero />  <!-- 這邊可以利用元素屬性(在Hero.vue中設定的變數)做操作 ex: title="..." -->
    <HomeCard />
    <JobListenings :limit="3" :show-button="true" />
</template>