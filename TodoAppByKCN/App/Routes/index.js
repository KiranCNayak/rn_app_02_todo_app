import {Navigation} from 'react-native-navigation';

import HomePageView from '../Views/HomePageView';
import {SCREEN_NAMES} from '../Utils/NavigationUtils/NAV_CONSTANTS';
import RandomPage from '../Views/RandomPage';

export const registerScreens = () => {
  Navigation.registerComponent(SCREEN_NAMES.homePage, () => HomePageView);
  Navigation.registerComponent(SCREEN_NAMES.randomPage, () => RandomPage);
};
