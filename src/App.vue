<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

import {
  MODULE_NAME as MODULE_NAME_JOKES,
  intializeJokeModule,
} from './utils/jokes.js';

const store = useStore();

const count = computed(() => store.state.count);
const incrementCount = () => {
  store.commit('increment');
  console.log(store.state.count);
};

// store.hasModule is not reactive 💀
const isSubmoduleRegistered = computed(() =>
  store.hasModule(MODULE_NAME_JOKES)
);
// Checking for the key works though
const isSubmoduleRegisteredFix = computed(() => 'jokes' in store.state);
const jokeComponent = computed(() => {
  if (!isSubmoduleRegistered.value) {
    return null;
  }
  return store.state[MODULE_NAME_JOKES].jokeComponent;
});
const joke = computed(() => {
  if (!isSubmoduleRegistered.value) {
    return null;
  }
  return store.state[MODULE_NAME_JOKES]?.joke;
});
const registerSubmodule = async () => {
  await intializeJokeModule(store);
};
</script>

<template>
  <h1>Vuex Async Module Registration</h1>

  <fieldset>
    <legend><h2>Count</h2></legend>
    <button type="button" @click="incrementCount">Count ({{ count }})</button>
  </fieldset>

  <fieldset>
    <legend><h2>Register Submodule</h2></legend>
    <button type="button" @click="registerSubmodule">Register Submodule</button>
    <p>hasModule Computed Prop: {{ isSubmoduleRegistered }}</p>
    <p>key in obj Computed Prop: {{ isSubmoduleRegisteredFix }}</p>
    <component :is="jokeComponent" v-if="jokeComponent" />
  </fieldset>
</template>

<style scoped></style>
