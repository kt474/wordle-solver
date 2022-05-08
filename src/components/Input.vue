<script setup>
import { ref } from "vue";
import { useStore } from "../store/store";
import { isValidWord } from "../words";
import { getRandomAnswer } from "../words";

const query = ref("");
const store = useStore();
let displayText = ref("");

function saveQuery(str) {
  if (isValidWord(str)) {
    store.updateQuery(str);
    displayText.value = str;
  } else {
    displayText.value = "Not a valid word ";
  }
}
function useRandomAnswer() {
  const answer = getRandomAnswer();
  store.updateQuery(answer);
  displayText.value = answer;
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
      placeholder="Wordle Answer"
      @keyup.enter="saveQuery(query)"
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
  <div class="mt-2">
    <button
      @click="useRandomAnswer"
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      Generate Random Answer
    </button>
  </div>
  <div>
    <p class="align text-black dark:text-white">
      Current Answer: {{ displayText }}
    </p>
  </div>
  <div class="mt-2">
    <button
      @click="store.resetBoardState()"
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      Clear Board
    </button>
  </div>
</template>
