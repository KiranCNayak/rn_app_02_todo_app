import {Platform} from 'react-native';

export const SCREEN_NAMES = {
  homePage: 'TODO_APP.homePage',
  randomPage: 'TODO_APP.randomPage',
};

/**
 * This is the 'options' ovject that is under the 'component' object of React Native Navigation.
 * Although it looks like it is an exhaustive list, it has some missing props, that are either
 *  too random, that it is not usable in the usual cases, or they are platform specific.

  options: {
    bottomTab, // More info on this link : https://wix.github.io/react-native-navigation/api/options-bottomTab/
    bottomTabs, // More info on this link: https://wix.github.io/react-native-navigation/api/options-bottomTabs/
    topBar: {
      visible: <boolean>,
      animate: <boolean>,
      title: {
        text: <string>,
        color: <Color (A string with either 'Hex values' or 'rgba values')>,
        visible: <boolean>,
        fontSize: <number>,
        fontFamily: <FontFamily>,
        fontStyle: enum('normal' | 'italic'),
        fontWeight: enum('normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'),
        alignment: enum('center' | 'fill'), fill will make the title stretch and consume all available space in the TopBar while center will center the title in the middle of the TopBar
        component: ReactComponent,   More info on this link: https://wix.github.io/react-native-navigation/api/layout-component/
      },
      subtitle: {
        text: <string>,
        color: <Color (A string with either 'Hex values' or 'rgba values')>,
        fontSize: <number>,
        fontFamily: <FontFamily>,
        fontStyle: enum('normal' | 'italic'),
        fontWeight: enum('normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'),
        alignment: enum('center' | 'fill'), fill will make the title stretch and consume all available space in the TopBar while center will center the title in the middle of the TopBar
      },
      height: <number>, // REM: It is applicable on 'android' ONLY!
      borderColor: <Color (A string with either 'Hex values' or 'rgba values')>,
      borderHeight: <number>, // REM: It is applicable on 'android' ONLY!
      backButton: {
        id: <string>, // For reference in press event // REM: It is applicable on 'android' ONLY!
        color: <Color (A string with either 'Hex values' or 'rgba values')>,
        icon: <ImageResource>,  More info about 'ImageResource' on this link: https://wix.github.io/react-native-navigation/api/options-imageResource/
        visible: <boolean>,
        popStackOnPress: <boolean>,
      },
      background: {
        color: <Color (A string with either 'Hex values' or 'rgba values')>,
        component: ReactComponent,   mostly for gradient bg, etc.   More info on this link: https://wix.github.io/react-native-navigation/api/options-background/#component
        clipToBounds: <boolean>,  // REM: It is applicable on 'iOS' ONLY!
        translucent: <boolean>,   // REM: It is applicable on 'iOS' ONLY!
        blur: <boolean>,          // REM: It is applicable on 'iOS' ONLY!
      },
      animateLeftButtons: <boolean>,
      animateRightButtons: <boolean>,
      barStyle: enum('default' | 'black'), // REM: It needs to have 'translucent: true'
      leftButtons: <[Button]>, // NOTE: It is an array of Buttons. Go to this link for more info: https://wix.github.io/react-native-navigation/api/options-button/
      leftButtonColor: <Color (A string with either 'Hex values' or 'rgba values')>,
      rightButtons: <[Button]>, // NOTE: It is an array of Buttons. Go to this link for more info: https://wix.github.io/react-native-navigation/api/options-button/
      rightButtonColor: <Color (A string with either 'Hex values' or 'rgba values')>,
    },
    statusBar: {  // NOTE: There are other OS specific values at https://wix.github.io/react-native-navigation/api/options-statusBar
      visible: <boolean>,
      style: enum('light' | 'dark'),
      backgroundColor: <Color (A string with either 'Hex values' or 'rgba values')>, // REM: It is applicable on 'android' ONLY!
    },
    navigationBar: {  // NOTE: It is applicable on 'android' ONLY! This is the bottom bar of Android that has ('Back', 'Home' and 'Recents')
      visible: <boolean>,
      backgroundColor: <Color (A string with either 'Hex values' or 'rgba values')>,
    },
    layout: {
      fitSystemWindows: <boolean>,
      backgroundColor: <Color (A string with either 'Hex values' or 'rgba values')>,
      componentBackgroundColor: <Color (A string with either 'Hex values' or 'rgba values')>,
      orientation: ['portrait', 'landscape'], // NOTE: It's an Array
      topMargin: <number>,
    },
    modal: {
      swipeToDismiss: <boolean>,
    },
    preview,
    modalPresentationStyle: enum('formSheet' | 'pageSheet' | 'fullScreen' | 'overFullScreen' | 'overCurrentContext' | 'popOver' | 'none'),

  }
 */

export const NAV_VARIANT = {
  dark: 'dark',
  light: 'light',
};

export const NAV_STYLES = {
  dark: {
    navBarBGColor: 'black',
    navBarTextColor: 'white',
    navBarSubtitleColor: 'grey',
    navBarButtonColor: 'black',
    statusBarColor: 'black',
    statusBarTextColorScheme: 'dark',
  },
  light: {
    navBarBGColor: 'white',
    navBarTextColor: 'black',
    navBarSubtitleColor: 'grey',
    navBarButtonColor: 'green',
    statusBarColor: 'white',
    statusBarTextColorScheme: 'light',
  },
};

export const NAVIGATION_OPTIONS = (
  style, // this style is set by 'NAV_STYLES' above
  titleText = '',
  hideBackButton = false,
  isPrimaryScreen = false,
  animationType = ANIMATION_TYPE.SLIDE_HORIZONTAL,
) => {
  const isIOS = Platform.OS === 'ios';

  return {
    topBar: {
      ...(style.navBarHidden ? {visible: !style.navBarHidden} : {}),
      animate: true,
      title: {
        text: titleText,
        color: style.navBarTextColor,
        ...(style.navBarTextFontSize
          ? {fontSize: style.navBarTextFontSize}
          : {}),
        ...(style.navBarTextFontFamily
          ? {fontFamily: style.navBarTextFontFamily}
          : {}),
      },
      subtitle: {
        color: style.navBarSubtitleTextColor,
        ...(style.navBarSubtitleFontSize
          ? {fontSize: style.navBarSubtitleFontSize}
          : {}),
        ...(style.navBarSubtitleFontFamily
          ? {fontFamily: style.navBarSubtitleFontFamily}
          : {}),
      },
      background: {
        color: style.navBarBGColor,
      },
      ...(isIOS
        ? {
            backButton: {
              color: '#dddddd',
              showTitle: false,
              visible: !hideBackButton,
            },
          }
        : {backButton: {visible: !hideBackButton}}),
      ...(style.hideNavButtons
        ? {
            leftButtons: [],
          }
        : {}),
    },
    statusBar: {
      style: style.statusBarTextColorScheme,
      ...Platform.select({
        android: {
          backgroundColor: style.statusBarColor,
        },
      }),
    },
    ...(animationType ? {animations: ANIMATIONS[animationType]} : {}),
    popGesture: !isPrimaryScreen,
  };
};

// Animation related Constants
export const ANIMATION_TYPE = {
  NONE: 'none',
  SLIDE_HORIZONTAL: 'slide-horizontal',
  SLIDE_DOWN: 'slide-down',
};

const ANIMATION_NONE = {
  push: {enabled: false},
  pop: {enabled: false},
};

const RIGHT_TO_LEFT = {
  x: {
    from: 2000,
    to: 0,
    duration: 300,
  },
};

const LEFT_TO_RIGHT = {
  x: {
    from: 0,
    to: 2000,
    duration: 300,
  },
};

const ALPHA_SHOW = {
  alpha: {
    from: 0.7,
    to: 1,
    duration: 300,
  },
};

// using invalid from valid to fix wix navigation top bar white patch issue
const LEFT_TO_RIGHT_TOP_BAR = {
  x: {
    from: 2000,
    to: 2000,
    duration: 300,
  },
};

const ALPHA_HIDE = {
  alpha: {
    from: 1,
    to: 0.3,
    duration: 300,
  },
};

const ANIMATION_SLIDE_HORIZONTAL = {
  push: {
    waitForRender: true,
    topBar: {
      enabled: true,
      ...RIGHT_TO_LEFT,
      ...ALPHA_SHOW,
    },
    content: RIGHT_TO_LEFT,
  },
  pop: {
    topBar: {
      enabled: true,
      ...LEFT_TO_RIGHT_TOP_BAR,
      ...ALPHA_HIDE,
    },
    content: LEFT_TO_RIGHT,
  },
};

const ANIMATION_SLIDE_DOWN = {
  push: {
    content: {
      y: {
        from: 0,
        to: 2000,
        duration: 500,
      },
    },
  },
  pop: {
    content: {
      y: {
        from: 2000,
        to: 0,
        duration: 500,
      },
    },
  },
};

const ANIMATIONS = {
  [ANIMATION_TYPE.NONE]: ANIMATION_NONE,
  [ANIMATION_TYPE.SLIDE_HORIZONTAL]: ANIMATION_SLIDE_HORIZONTAL,
  [ANIMATION_TYPE.SLIDE_DOWN]: ANIMATION_SLIDE_DOWN,
};
