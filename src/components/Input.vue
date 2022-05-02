<script setup>
import { ref } from "vue";
import { useStore } from "../store/store";
const query = ref("");
const store = useStore();
</script>
<template>
  <div class="w-72 mt-8">
    <input
      v-model.trim="query"
      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
      id="grid-first-name"
      @focusin="store.updateFocusState(true)"
      @focusout="store.updateFocusState(false)"
      type="text"
      placeholder="Guessing Word"
    />
  </div>
</template>
