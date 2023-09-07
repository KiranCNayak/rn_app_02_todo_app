import React, {memo, useCallback, useRef} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {IMAGES} from '../Config/Images';
import {getThemeMode} from '../Redux/themeMode/selectors';
import {toggleThemeMode} from '../Redux/themeMode/themeModeSlice';

const DarkAndLightModeToggle = ({onModeQueryHandler}) => {
  const dispatch = useDispatch();

  const currentMode = useSelector(getThemeMode);

  // console.log('Mode:', currentMode);

  const isDarkMode = currentMode === 'dark';

  const toggleAnimation = useRef(
    new Animated.Value(isDarkMode ? 4 : 44),
  ).current;

  const togglePressedHandler = useCallback(() => {
    Animated.timing(toggleAnimation, {
      toValue: isDarkMode ? 44 : 4,
      duration: 200,
      useNativeDriver: false,
    }).start();

    dispatch(toggleThemeMode());

    onModeQueryHandler(isDarkMode ? 'light' : 'dark');
  }, [dispatch, isDarkMode, onModeQueryHandler, toggleAnimation]);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={togglePressedHandler}
      style={styles.rootContainerStyle}>
      <View style={styles.toggleViewContainerStyle}>
        <Image source={IMAGES.ICON_SUN} style={styles.iconStyle} />
        <Image source={IMAGES.ICON_MOON} style={styles.iconStyle} />
        <Animated.View
          style={[{left: toggleAnimation}, styles.circleMaskStyle]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default memo(DarkAndLightModeToggle);

const styles = StyleSheet.create({
  circleMaskStyle: {
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 40,
    position: 'absolute',
    width: 40,
  },

  iconStyle: {
    height: 32,
    margin: 4,
    width: 32,
  },

  rootContainerStyle: {
    position: 'relative',
  },

  toggleViewContainerStyle: {
    alignItems: 'center',
    backgroundColor: '#888',
    borderRadius: 30,
    flexDirection: 'row',
    padding: 4,
    position: 'absolute',
    right: 6,
    top: 6,
  },
});
