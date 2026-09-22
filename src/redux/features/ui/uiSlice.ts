import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NavMode = "shell" | "gui";
export type ProjectViewMode = "bento" | "filesystem";

interface UiState {
  navMode: NavMode;
  projectViewMode: ProjectViewMode;
  shellHistory: string[];
}

const initialState: UiState = {
  navMode: "shell",
  projectViewMode: "bento",
  shellHistory: [],
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setNavMode: (state, action: PayloadAction<NavMode>) => {
      state.navMode = action.payload;
    },
    toggleNavMode: (state) => {
      state.navMode = state.navMode === "shell" ? "gui" : "shell";
    },
    setProjectViewMode: (state, action: PayloadAction<ProjectViewMode>) => {
      state.projectViewMode = action.payload;
    },
    toggleProjectViewMode: (state) => {
      state.projectViewMode =
        state.projectViewMode === "bento" ? "filesystem" : "bento";
    },
    addShellHistory: (state, action: PayloadAction<string>) => {
      const cmd = action.payload.trim();
      if (cmd && state.shellHistory[state.shellHistory.length - 1] !== cmd) {
        state.shellHistory.push(cmd);
        if (state.shellHistory.length > 50) {
          state.shellHistory.shift();
        }
      }
    },
    clearShellHistory: (state) => {
      state.shellHistory = [];
    },
  },
});

export const {
  setNavMode,
  toggleNavMode,
  setProjectViewMode,
  toggleProjectViewMode,
  addShellHistory,
  clearShellHistory,
} = uiSlice.actions;

export default uiSlice.reducer;
