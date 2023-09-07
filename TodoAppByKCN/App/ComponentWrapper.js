import React from 'react';
import {Provider} from 'react-redux';

import store from './Config/Redux/store/store';

export const wrap = Component => {
  return props => {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
};
