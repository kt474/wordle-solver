<script setup lang="ts">
import Game from "./components/Game.vue";
import Input from "./components/Input.vue";
</script>

<template>
  <div class="w-full flex">
    <div>
      <Game />
    </div>
    <div class="ml-16 mt-8">
      <Input />
    </div>
  </div>
</template>

<style scoped></style>
