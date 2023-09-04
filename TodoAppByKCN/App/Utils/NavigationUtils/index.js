import {Navigation} from 'react-native-navigation';
import {
  NAVIGATION_OPTIONS,
  NAV_STYLES,
  NAV_VARIANT,
  SCREEN_NAMES,
} from './NAV_CONSTANTS';

let previousScreenIds = [];
let isPushRequestInProgress = false;

export const setRoot = ({
  navigatorStyle = NAV_STYLES[NAV_VARIANT.light],
  animationType,
  passProps = {},
  screenId,
  title = '',
}) => {
  // When the root is set, remove all the screenIds and create a fresh
  //  array from start.
  previousScreenIds = [];
  const options = NAVIGATION_OPTIONS(
    navigatorStyle,
    title,
    animationType,
    false, // hideBackButton
    true, // isPrimaryScreen
  );
  Navigation.setRoot({
    root: {
      stack: {
        id: SCREEN_NAMES.homePageView,
        children: [
          {
            component: {
              name: screenId,
              passProps,
              options,
            },
          },
        ],
      },
    },
  });
};

export const push = (componentId, screenName, options, passProps, screenId) => {
  if (isPushRequestInProgress === true) {
    return;
  }

  isPushRequestInProgress = true;
  Navigation.push(componentId, {
    component: {
      ...(screenId ? {id: screenId} : {}),
      name: screenName,
      passProps,
      options,
    },
  })
    .then(() => {
      isPushRequestInProgress = false;
      previousScreenIds.push(componentId);
    })
    .catch(() => {
      isPushRequestInProgress = false;
    });
};

export const pop = (
  componentId,
  options,
  successCB = () => {},
  failureCB = () => {},
) => {
  Navigation.pop(componentId, options)
    .then(() => {
      previousScreenIds.pop();
      successCB();
    })
    .catch(failureCB);
};

export const popToRoot = (
  componentId,
  successCB = () => {},
  failureCB = () => {},
) => {
  Navigation.popToRoot(componentId)
    .then(() => {
      previousScreenIds = [];
      successCB();
    })
    .catch(failureCB);
};

// This is needed in case we need to send extra details from one page to another
//  when there is already some options populated in the 'options' property.
export const mergeOptions = (componentId, options) => {
  Navigation.mergeOptions(componentId, options);
};

export const removeTopBarButtons = (
  componentId,
  removeLeftButtons = false,
  removeRightButtons = false,
) => {
  mergeOptions(componentId, {
    topBar: {
      ...(removeLeftButtons ? {leftButtons: []} : {}),
      ...(removeRightButtons ? {rightButtons: []} : {}),
    },
  });
};
