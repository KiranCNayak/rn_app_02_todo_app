/**
 * @format
 */

import 'react-native-gesture-handler';
import {Navigation} from 'react-native-navigation';
import App from './TodoAppByKCN/App/App';
// import {name as appName} from './app.json';

Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'com.myApp.WelcomeScreen',
            },
          },
        ],
      },
    },
  });
});
