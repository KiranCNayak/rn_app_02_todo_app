import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  themeMode: 'dark', // TODO: We can get the data from localStorage
};

export const themeModeSlice = createSlice({
  name: 'themeMode',
  initialState,
  reducers: {
    toggleThemeMode: state => {
      state.themeMode = state.themeMode === 'dark' ? 'light' : 'dark';
      // TODO: We can set the data to localStorage here
    },
  },
});

export const {toggleThemeMode} = themeModeSlice.actions;
export default themeModeSlice.reducer;
