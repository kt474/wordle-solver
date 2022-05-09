import { computed } from "vue";
import { defineStore } from "pinia";
import { LetterState } from "../types";
import { allWords } from "../words";
const board = Array.from({ length: 6 }, () =>
  Array.from({ length: 5 }, () => ({
    letter: "",
    state: LetterState.INITIAL,
  }))
);

const icons = {
  [LetterState.CORRECT]: "🟩",
  [LetterState.PRESENT]: "🟨",
  [LetterState.ABSENT]: "⬜",
  [LetterState.INITIAL]: null,
};

function genResultGrid(board: Array<any>, index: number) {
  return board
    .slice(0, index + 1)
    .map((row) => {
      // @ts-ignore
      return row.map((tile) => icons[tile.state]).join("");
    })
    .join("\n");
}

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
      shakeRowIndex: -1,
    };
  },
  getters: {
    letterStatesComputed: (state) =>
      computed(() => {
        return state.letterStates;
      }),
    currentRowComputed: (state) =>
      computed(() => {
        return state.boardState[state.currentRowIndex];
      }),
  },
  actions: {
    updateCurrentRow(guess: string) {
      for (const [index, tile] of this.boardState[
        this.currentRowIndex
      ].entries()) {
        tile.letter = guess[index];
      }
    },
    showMessage(msg: string, time = 1000) {
      this.message = msg;
      if (time > 0) {
        setTimeout(() => {
          this.message = "";
        }, 1000);
      }
    },
    shake() {
      this.shakeRowIndex = this.currentRowIndex;
      setTimeout(() => {
        this.shakeRowIndex = -1;
      }, 1000);
    },
    completeRow() {
      if (this.currentRowComputed.value.every((tile) => tile.letter)) {
        const guess = this.currentRowComputed.value
          .map((tile) => tile.letter)
          .join("");
        if (!allWords.includes(guess) && guess !== this.inputWord) {
          this.shake();
          this.showMessage(`Not in word list`);
          return;
        }

        const answerLetters: (string | null)[] = this.inputWord.split("");
        // first pass: mark correct ones
        this.currentRowComputed.value.forEach((tile, i) => {
          if (answerLetters[i] === tile.letter) {
            tile.state = LetterState.CORRECT;
            this.addLetterState(tile.letter, LetterState.CORRECT);
            answerLetters[i] = null;
          }
        });
        // second pass: mark the present
        this.currentRowComputed.value.forEach((tile) => {
          if (!tile.state && answerLetters.includes(tile.letter)) {
            tile.state = LetterState.PRESENT;
            answerLetters[answerLetters.indexOf(tile.letter)] = null;
            if (!(tile.letter in this.letterStatesComputed.value)) {
              this.addLetterState(tile.letter, LetterState.PRESENT);
            }
          }
        });
        // 3rd pass: mark absent
        this.currentRowComputed.value.forEach((tile) => {
          if (!tile.state) {
            tile.state = LetterState.ABSENT;
            if (!(tile.letter in this.letterStatesComputed.value)) {
              this.addLetterState(tile.letter, LetterState.ABSENT);
            }
          }
        });

        this.updateAllowInput(false);
        if (
          this.currentRowComputed.value.every(
            (tile) => tile.state === LetterState.CORRECT
          )
        ) {
          // yay!
          setTimeout(() => {
            const gridString = genResultGrid(
              this.boardState,
              this.currentRowIndex
            );
            this.updateGrid(gridString);
            this.showMessage(
              [
                "Genius",
                "Magnificent",
                "Impressive",
                "Splendid",
                "Great",
                "Phew",
              ][this.currentRowIndex],
              -1
            );
            this.updateSuccess(true);
          }, 1600);
        } else if (this.currentRowIndex < this.boardState.length - 1) {
          // go the next row
          this.incrementRowIndex();
          setTimeout(() => {
            this.updateAllowInput(true);
          }, 1600);
        } else {
          // game over :(
          setTimeout(() => {
            this.showMessage(this.inputWord.toUpperCase(), -1);
          }, 1600);
        }
      } else {
        this.shake();
        this.showMessage("Not enough letters");
      }
    },
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
