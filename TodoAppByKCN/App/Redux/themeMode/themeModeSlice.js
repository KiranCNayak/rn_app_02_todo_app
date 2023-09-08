import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  themeMode: 'dark',
};

export const themeModeSlice = createSlice({
  name: 'themeMode',
  initialState,
  reducers: {
    toggleThemeMode: state => {
      state.themeMode = state.themeMode === 'dark' ? 'light' : 'dark';
    },
    setCustomThemeMode: (state, action) => {
      state.themeMode = action.payload.themeMode;
    },
  },
});

export const {setCustomThemeMode, toggleThemeMode} = themeModeSlice.actions;
export default themeModeSlice.reducer;
