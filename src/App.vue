<script setup lang="ts">
import Game from "./components/Game.vue";
import Input from "./components/Input.vue";
import Toggle from "./components/Toggle.vue";
import { useStore } from "./store/store";

const store = useStore();
</script>

<template>
  <div :class="store.darkMode ? 'dark' : ''" class="h-screen">
    <div class="bg-neutral-100 dark:bg-neutral-800 h-screen">
      <Toggle />
      <div class="absolute top-3 right-3.5 flex">
        <a href="https://github.com/kt474/wordle-solver" target="_blank">
          <svg
            v-if="store.darkMode"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#f0f6f9"
            class="bi bi-github"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#171717"
            class="bi bi-github"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
            />
          </svg>
        </a>
      </div>
      <div
        class="w-full flex justify-center"
        :class="store.darkMode ? 'dark' : ''"
      >
        <div class="">
          <Game />
        </div>
        <div class="ml-16 mt-12">
          <Input />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
