<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "../store/store";
import { isValidWord, getRandomAnswer, allWords } from "../words";
import { getRandomWord } from "../solver";
import sample from "lodash.sample";
import intersection from "lodash.intersection";

const query = ref("");
const store = useStore();
let displayText = ref("");

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

onMounted(() => {
  useRandomAnswer();
});

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

async function guessRandomWord() {
  for (let i = 0; i < 2; i++) {
    if (!store.success) {
      const guess = getRandomWord();
      store.updateCurrentRow(guess);
      store.completeRow();
      await timer(2000);
    }
  }
}

async function solverOne() {
  store.updateCurrentRow("salet");
  store.completeRow();
  await timer(2000);
  let wordBank = allWords;
  let correctLetters = [];
  let presentLetters = [];
  let correctWords = [];
  let presentWords = [];
  for (let i = 0; i < 5; i++) {
    if (!store.success) {
      let letterStates = store.boardState[i];
      letterStates.forEach((obj, index) => {
        if (obj.state === "correct") {
          correctLetters.push({ index: index, letter: obj.letter });
        }
        if (obj.state === "present") {
          presentLetters.push(obj.letter);
        }
      });
      wordBank.forEach((word) => {
        let count = 0;
        for (let i = 0; i < correctLetters.length; i++) {
          if (word[correctLetters[i].index] === correctLetters[i].letter) {
            count += 1;
          }
        }
        if (count === correctLetters.length) {
          correctWords.push(word);
        }
        if (presentLetters.every((letter) => word.includes(letter))) {
          presentWords.push(word);
        }
      });
      let newBank = intersection(correctWords, presentWords);
      correctWords = [];
      presentWords = [];
      if (newBank.length !== 0) {
        wordBank = newBank;
      }
      store.updateCurrentRow(sample(wordBank));
      store.completeRow();
      await timer(2000);
    } else {
      break;
    }
  }
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
  <div class="mt-2">
    <button
      @click="guessRandomWord"
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      Random Solver
    </button>
  </div>
  <div class="mt-2">
    <button
      @click="solverOne"
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      Test
    </button>
  </div>
</template>
