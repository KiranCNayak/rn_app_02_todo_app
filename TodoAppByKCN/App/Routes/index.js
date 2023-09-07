import {Navigation} from 'react-native-navigation';

import {wrap} from '../ComponentWrapper';
import HomePageView from '../Views/HomePageView';
import {SCREEN_NAMES} from '../Utils/NavigationUtils/NAV_CONSTANTS';
import RandomPage from '../Views/RandomPage';

export const registerScreens = () => {
  Navigation.registerComponent(SCREEN_NAMES.homePage, () => wrap(HomePageView));
  Navigation.registerComponent(SCREEN_NAMES.randomPage, () => wrap(RandomPage));
};
