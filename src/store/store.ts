import { computed } from "vue";
import { defineStore } from "pinia";
import { LetterState } from "../types";
const board = Array.from({ length: 6 }, () =>
  Array.from({ length: 5 }, () => ({
    letter: "",
    state: LetterState.INITIAL,
  }))
);

export const useStore = defineStore("main", {
  state: () => {
    return {
      inputWord: "",
      inputWordFocus: false,
      openModal: false,
      darkMode: false,
      boardState: board,
      currentRowIndex: 0,
      letterStates: {},
      message: "",
      grid: "",
      success: false,
      allowInput: true,
    };
  },
  getters: {
    letterStatesComputed: (state) =>
      computed(() => {
        return state.letterStates;
      }),
  },
  actions: {
    updateAllowInput(payload: boolean) {
      this.allowInput = payload;
    },
    updateSuccess(payload: boolean) {
      this.success = payload;
    },
    updateGrid(grid: string) {
      this.grid = grid;
    },
    updateMessage(msg: string) {
      this.message = msg;
    },
    addLetterState(key: string, value: string) {
      // @ts-ignore
      this.letterStates[key] = value;
    },
    incrementRowIndex() {
      this.currentRowIndex++;
    },
    resetBoardState() {
      this.boardState = Array.from({ length: 6 }, () =>
        Array.from({ length: 5 }, () => ({
          letter: "",
          state: LetterState.INITIAL,
        }))
      );
      this.currentRowIndex = 0;
      this.letterStates = {};
      this.message = "";
      this.grid = "";
      this.success = false;
      this.allowInput = true;
    },
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
