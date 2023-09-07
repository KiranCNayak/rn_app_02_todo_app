import 'react-native-gesture-handler';
import {Navigation} from 'react-native-navigation';

import {registerScreens} from './Routes';
import {
  NAVIGATION_OPTIONS,
  NAV_STYLES,
  NAV_VARIANT,
  SCREEN_NAMES,
} from './Utils/NavigationUtils/NAV_CONSTANTS';
// import {name as appName} from './app.json';

// orientationSelection can also be ['portrait', 'landscape'];
let orientationSelection = ['portrait'];

Navigation.setDefaultOptions({
  layout: {
    orientation: orientationSelection,
  },
});

// This is the starting component, Home page
const defaultHomeComponent = {
  component: {
    name: SCREEN_NAMES.homePage,
    options: NAVIGATION_OPTIONS(NAV_STYLES[NAV_VARIANT.dark], 'HOME', true),
  },
};

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{...defaultHomeComponent}],
      },
    },
  });
});
