<!-- It is a component wrapper -->
<script setup>
import {defineProps} from 'vue';

defineProps({
    bg: {
        type: String,
        default: 'big-gray-100'
    }
});
</script>

<template>
    <!-- 若使用vue格式的屬性 ex: v-bind:class="" 那麼屬性值，也就是雙引號之間的區塊就會是javascript -->
    <div :class="`${bg} p-6 rounded-lg shadow-md`">
        <slot></slot> <!-- output the content we wrapped-->
    </div>
</template>