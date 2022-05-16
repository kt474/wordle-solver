<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "../store/store";
import { isValidWord, getRandomAnswer, allWords } from "../words";
import sample from "lodash.sample";
import intersection from "lodash.intersection";
import difference from "lodash.difference";

const defaultStartingWord = "salet";
const query = ref("");
const startingWord = ref("");
const store = useStore();
const possibleGuesses = ref(allWords);
const summary = ref([]);
let displayText = ref("");
let displayStartingWord = ref(defaultStartingWord);

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

onMounted(() => {
  useRandomAnswer();
});

function saveQuery(str) {
  if (isValidWord(str)) {
    store.updateQuery(str);
    displayText.value = str;
  } else {
    displayText.value = "Not a valid word";
  }
}

function clearBoard() {
  store.resetBoardState();
  possibleGuesses.value = allWords;
  summary.value = [];
}

function saveStartingWord(str) {
  if (isValidWord(str)) {
    store.updateStartingWord(str);
    displayStartingWord.value = str;
  } else {
    displayStartingWord.value = "Not a valid word";
  }
}
function useRandomAnswer() {
  query.value = "";
  const answer = getRandomAnswer();
  store.updateQuery(answer);
  displayText.value = answer;
}

async function solverOne() {
  if (store.allowInput) {
    const firstGuess =
      displayStartingWord.value.length === 5
        ? displayStartingWord.value
        : defaultStartingWord;
    store.updateCurrentRow(firstGuess);
    summary.value.push({ guess: firstGuess });
    store.completeRow();
    await timer(2000);
    let wordBank = allWords;
    let correctLetters = [];
    let presentLetters = [];
    let absentLetters = [];
    let correctWords = [];
    let presentWords = [];
    let absentWords = [];
    let guesses = [];
    for (let i = 0; i < 5; i++) {
      if (!store.success) {
        let letterStates = store.boardState[i];
        letterStates.forEach((obj, index) => {
          if (obj.state === "correct") {
            correctLetters.push({ index: index, letter: obj.letter });
          }
          if (obj.state === "present") {
            presentLetters.push({ index: index, letter: obj.letter });
          }
          if (obj.state === "absent") {
            absentLetters.push(obj.letter);
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
          if (
            presentLetters.every(
              (obj) =>
                word.includes(obj.letter) && word[obj.index] !== obj.letter
            )
          ) {
            presentWords.push(word);
          }
          let correctLettersArray = correctLetters.map((obj) => obj.letter);
          let presentLettersArray = presentLetters.map((obj) => obj.letter);
          if (
            difference(
              absentLetters,
              presentLettersArray,
              correctLettersArray
            ).every((letter) => !word.includes(letter))
          ) {
            absentWords.push(word);
          }
        });
        let newBank = intersection(correctWords, presentWords, absentWords);
        summary.value[i]["answers"] = newBank.length;
        correctWords = [];
        presentWords = [];
        absentWords = [];
        if (newBank.length !== 0) {
          wordBank = difference(newBank, guesses);
          possibleGuesses.value = newBank;
        }
        let guess = sample(wordBank);
        summary.value.push({ guess: guess });
        guesses.push(guess);
        store.updateCurrentRow(guess);
        store.completeRow();
        await timer(2000);
      } else {
        break;
      }
    }
  }
}
</script>
<template>
  <div class="w-72 mt-8 flex justify-between">
    <input
      v-model.trim="startingWord"
      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
      id="grid-first-name"
      @focusin="store.updateFocusState(true)"
      @focusout="store.updateFocusState(false)"
      type="text"
      placeholder="Starting Word"
      @keyup.enter="saveStartingWord(startingWord)"
    />
    <div class="m-1 ml-2">
      <button
        @click="saveStartingWord(startingWord)"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Enter
      </button>
    </div>
  </div>
  <div class="w-72 mt-2 flex justify-between">
    <input
      v-model.trim="query"
      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
      id="grid-first-name"
      @focusin="store.updateFocusState(true)"
      @focusout="store.updateFocusState(false)"
      type="text"
      placeholder="Custom Answer"
      @keyup.enter="saveQuery(query)"
    />
    <div class="m-1 ml-2">
      <button
        @click="saveQuery(query)"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Enter
      </button>
    </div>
  </div>
  <div class="mt-2">
    <button
      @click="useRandomAnswer"
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      Random Answer
    </button>
  </div>
  <div class="flex">
    <div class="mt-2">
      <button
        @click="solverOne"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Solve
      </button>
    </div>
    <div class="mt-2">
      <button
        @click="clearBoard"
        type="button"
        class="text-white bg-rose-700 hover:bg-rose-800 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-rose-600 dark:hover:bg-rose-700 focus:outline-none dark:focus:ring-rose-800"
      >
        Clear Board
      </button>
    </div>
  </div>
  <div>
    <p class="text-lg align text-black dark:text-white">
      Starting Word: {{ displayStartingWord }}
    </p>
    <p class="text-lg align text-black dark:text-white">
      Current Answer: {{ displayText }}
    </p>
  </div>
  <div class="w-72 h-0.5 bg-neutral-400 mt-4"></div>
  <div class="text-black dark:text-white mt-3">
    <p class="text-lg align">Possible Guesses: {{ possibleGuesses.length }}</p>
    <div
      class="w-72 break-normal overflow-auto"
      :class="store.grid ? 'h-18' : 'h-72'"
    >
      {{ possibleGuesses.join(", ") }}
    </div>
  </div>

  <div
    v-if="store.grid"
    class="relative overflow-x-auto shadow-sm sm:rounded-md mt-3"
  >
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Guess</th>
          <th scope="col" class="px-6 py-3">Answers Left</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="guess in summary"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
          >
            {{ guess.guess }}
          </th>
          <td class="px-6 py-4">{{ guess.answers }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
