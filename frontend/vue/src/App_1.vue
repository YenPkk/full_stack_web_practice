<!-- Options API style -->
<script>
export default {       // 要export template才吃的到
  data() {
    return {
      name: 'john Doe',
      status: 'pending', 
      tasks: ['Task One', 'Task Two', 'Task Three'],
      link: 'https//google.com',
    }
  },
  methods: {
    toggleStatus() {
      if (this.status === 'active') {
        this.status = 'pending'
      } else if (this.status === 'pending') {
        this.status = 'inactive'
      } else {
        this.status = 'active'
      }
    }
  }
}
</script>

<template>
  <h1>{{name}}</h1>
  <p v-if="status === 'active'">User is active</p>
  <p v-else-if="status === 'pending'">User is pending</p>
  <p v-else=>User is inactive</p>

  <h3>Tasks</h3>
  <ul>                         <!-- 目前這個情況有沒有 :key="task" 都可以 -->
    <li v-for="task in tasks" :key="task">{{ task }}</li>
  </ul>

  <!-- : means dynamic means attribue value is a variabel not a plain text or string -->
  <!-- <a v-bind:href="link">click for google bind</a> -->
  <a :href="link">click for google</a>
  <br>
  <!-- 可以使用 v-on:<event> 或是 @<event> 來監聽事件 -->
  <!-- <button v-on:click="toggleStatus">Change Status</button> -->
  <button @click="toggleStatus">Change Status</button>

</template>

