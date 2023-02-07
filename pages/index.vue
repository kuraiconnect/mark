<script setup lang="ts">
import { useUserStore } from "~~/stores/userStore";

const userStore = useUserStore();

// state
const companies = ref(["ea2aa64f-26e7-456f-bdc0-181ad9996e94"]);
const selectValue = ref("");

// methods
const onSubmit = async () => {
  try {
    await userStore.login("kuraiconnect+dark@gmail.com", "password");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div>
    <button class="btn" @click="onSubmit">login</button>
  </div>
  <div v-if="userStore.accessToken" class="nav">
    <select v-model="selectValue">
      <option value="">pick</option>
      <option value="apollo">apollo</option>
      <option value="fetch">fetch</option>
    </select>
    <div>
      <FormApollo v-if="selectValue === 'apollo'" :companies="companies" />
      <FormFetch v-if="selectValue === 'fetch'" :companies="companies" />
    </div>
  </div>
</template>
