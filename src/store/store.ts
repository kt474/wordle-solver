import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => {
    return {
      inputWord: "",
      inputWordFocus: false,
    };
  },
  actions: {
    updateFocusState(payload: boolean) {
      this.inputWordFocus = payload;
    },
    updateQuery(query: string) {
      this.inputWord = query;
    },
  },
});
