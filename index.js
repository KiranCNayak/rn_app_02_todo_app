/**
 * @format
 */

import 'react-native-gesture-handler';
import {Navigation} from 'react-native-navigation';
import {
  NAVIGATION_OPTIONS,
  NAV_STYLES,
  NAV_VARIANT,
  SCREEN_NAMES,
} from './TodoAppByKCN/App/Utils/NavigationUtils/NAV_CONSTANTS';
import {registerScreens} from './TodoAppByKCN/App/Routes';
// import {name as appName} from './app.json';

// orientationSelection can also be ['portrait', 'landscape'];
let orientationSelection = ['portrait'];

Navigation.setDefaultOptions({
  layout: {
    orientation: orientationSelection,
  },
});

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
