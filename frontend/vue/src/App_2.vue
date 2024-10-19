<!-- Composition API sytle -->
<script setup>
import { ref, onMounted } from "vue";

// const name = 'john Doe'; 預設上此變數是inreactive,不能做動態的，若要就要寫下面的形式
// 用 ref() 包裹，變數才會變成reactivable，可以互動的
const name = ref('john Doe');
const status = ref('pending');
const tasks = ref(['Task One', 'Task Two', 'Task Three']);
const newTask = ref('')

// 這邊要用 <變數>.value存取，使用變數(值)
const toggleStatus = () => {
  if (status.value === 'active') {
    status.value = 'pending'
  } else if (status.value === 'pending') {
    status.value = 'inactive'
  } else {
    status.value = 'active'
  }
};

const addTask = () => {
  if (newTask.value.trim() !== '') {
    tasks.value.push(newTask.value);
    newTask.value = '';
  }
};

const deleteTask = (index) => {
  tasks.value.splice(index, 1);
};

onMounted( async () => {
  try {
    const response = await fetch('https//jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    tasks.value = data.map((task) => task.title);
  } catch (error) {
    console.log('Error fetching tasks');
  }
})
</script>

<template>
  <h1>{{name}}</h1>
  <p v-if="status === 'active'">User is active</p>
  <p v-else-if="status === 'pending'">User is pending</p>
  <p v-else=>User is inactive</p>

  <form @submit.prevent="addTask">  <!-- 監聽submit event，發生時執行addTask()-->
    <label for="newTask">Add Task</label>
    <input type="text" id="newTask" name="newTask" v-model="newTask"> <!-- v-model可以使這個input位置與newTask variable連動-->
    <button type="submit">Submit</button>
  </form>

  <h3>Tasks</h3>
  <ul>                         <!-- 目前這個情況有沒有 :key="task" 都可以 -->
    <li v-for="(task, index) in tasks" :key="task">
      <span>
        {{ task }}
      </span>
      <button @click="deleteTask(index)">x</button>
    </li>
  </ul>

  <!-- : means dynamic means attribue value is a variabel not a plain text or string -->
  <!-- <a v-bind:href="link">click for google bind</a> -->
  <!-- <a :href="link">click for google</a> -->
  <br>
  <!-- 可以使用 v-on:<event> 或是 @<event> 來監聽事件 -->
  <!-- <button v-on:click="toggleStatus">Change Status</button> -->
  <button @click="toggleStatus">Change Status</button>

</template>

