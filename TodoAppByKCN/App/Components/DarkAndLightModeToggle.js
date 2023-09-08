import React, {memo, useCallback, useEffect} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {IMAGES} from '../Config/Images';
import {getThemeMode} from '../Redux/themeMode/selectors';
import {
  setCustomThemeMode,
  toggleThemeMode,
} from '../Redux/themeMode/themeModeSlice';

const DarkAndLightModeToggle = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const runner = async () => {
      try {
        const value = await AsyncStorage.getItem('themeMode');
        const v = JSON.parse(value);
        if (v === 'light' || v === 'dark') {
          dispatch(setCustomThemeMode({themeMode: v}));
        } else {
          dispatch(setCustomThemeMode({themeMode: 'dark'}));
        }
      } catch (error) {
        console.log('Error Occured: ', error);
        dispatch(setCustomThemeMode({themeMode: 'dark'}));
      }
    };
    runner();
  }, [dispatch]);

  const currentMode = useSelector(getThemeMode);

  const isDarkMode = currentMode === 'dark';

  const togglePressedHandler = useCallback(() => {
    dispatch(toggleThemeMode());
    const runner = async () => {
      try {
        await AsyncStorage.setItem(
          'themeMode',
          JSON.stringify(isDarkMode ? 'light' : 'dark'),
        );
      } catch (error) {
        console.log('Error Occured: ', error);
      }
    };
    runner();
  }, [dispatch, isDarkMode]);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={togglePressedHandler}
      style={styles.rootContainerStyle}>
      <View style={styles.toggleViewContainerStyle}>
        <Image source={IMAGES.ICON_SUN} style={styles.iconStyle} />
        <Image source={IMAGES.ICON_MOON} style={styles.iconStyle} />
        <View style={[{left: isDarkMode ? 4 : 44}, styles.circleMaskStyle]} />
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
