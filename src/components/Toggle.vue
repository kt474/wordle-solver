<script setup>
import { useStore } from "../store/store";
import { ref, onMounted, watch } from "vue";
const store = useStore();
const systemDarkMode = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
const checked = ref(systemDarkMode);
onMounted(() => {
  if (systemDarkMode && !localStorage.darkMode) {
    checked.value = true;
    store.updateDarkMode(true);
  } else if (localStorage.darkMode) {
    checked.value = JSON.parse(localStorage.darkMode);
    store.updateDarkMode(checked.value);
  }
});
watch(checked, () => {
  localStorage.darkMode = checked.value;
  store.updateDarkMode(checked.value);
});
</script>
<template>
  <div class="absolute top-3 left-3.5">
    <label for="toggleB" class="flex items-center cursor-pointer">
      <input v-model="checked" type="checkbox" id="toggleB" class="sr-only" />
      <div
        class="block dark:bg-neutral-50 bg-neutral-900 w-10 h-6 rounded-full"
      ></div>
      <div
        class="dot absolute left-1 top-1 correct w-4 h-4 rounded-full transition"
      ></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 absolute left-12 -top-0.5"
        fill="none"
        viewBox="0 0 24 24"
        :stroke="store.darkMode ? '#6aaa64' : '#171717'"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </label>
  </div>
</template>

<style scoped>
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #be123c;
}
</style>
