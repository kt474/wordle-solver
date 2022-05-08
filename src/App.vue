<script setup lang="ts">
import Game from "./components/Game.vue";
import Input from "./components/Input.vue";
import Toggle from "./components/Toggle.vue";
import { useStore } from "./store/store";

const store = useStore();
</script>

<template>
  <div :class="store.darkMode ? 'dark' : ''" class="h-screen">
    <div class="bg-white dark:bg-neutral-800 h-screen">
      <Toggle />
      <div
        class="w-full flex justify-center"
        :class="store.darkMode ? 'dark' : ''"
      >
        <div class="">
          <Game />
        </div>
        <div class="ml-16 mt-8">
          <Input />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
