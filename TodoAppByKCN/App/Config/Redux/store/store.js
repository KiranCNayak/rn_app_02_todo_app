import {configureStore} from '@reduxjs/toolkit';

import themeModeReducer from '../../../Redux/themeMode/themeModeSlice';

const store = configureStore({
  reducer: {
    themeMode: themeModeReducer,
  },
});

export default store;
