<script setup>
import { ref } from "vue";
import {useStore} from "../store/store";
const query = ref("");
const store = useStore();

function saveQuery(str) {
  store.updateQuery(str)
}
</script>
<template>
  <div class="w-72 mt-8 flex justify-between">
    <input
      v-model.trim="query"
      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
      id="grid-first-name"
      @focusin="store.updateFocusState(true)"
      @focusout="store.updateFocusState(false)"
      type="text"
      placeholder="Guessing Word"
    />
    <div class="m-1">
      <button
        @click="saveQuery(query)"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Enter
      </button>
    </div>
  </div>
  <div>
    <p class="align">Current Answer: {{query}}</p>
  </div>
</template>
