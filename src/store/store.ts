import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => {
    return {
      inputWord: "",
      inputWordFocus: false,
      openModal: false,
      darkMode: false,
    };
  },
  actions: {
    updateDarkMode(payload: boolean) {
      this.darkMode = payload;
    },
    updateModal(payload: boolean) {
      this.openModal = payload;
    },
    updateFocusState(payload: boolean) {
      this.inputWordFocus = payload;
    },
    updateQuery(query: string) {
      this.inputWord = query;
    },
  },
});
