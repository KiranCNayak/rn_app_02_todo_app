import React, {useCallback, forwardRef, useImperativeHandle} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';

const BottomSheet = forwardRef(({activeHeight, children, contentBG}, ref) => {
  const {height} = useWindowDimensions();

  // 'activeHeight' is 'height * 0.4' to get a height of 60% of screen's height.
  // So I am inverting the value to now get exactly how much is needed.
  // Directly use 'height * 0.6' value to get a height of 60% of screen's height.
  // All of this is to be done wherever the BottomSheet is being used.
  const heightFromBottom = height - activeHeight;

  // A 'shared value' is a variable that syncs Native & JS
  //  values when the animation is in progress.
  const sharedTop = useSharedValue(height);

  const animationStyle = useAnimatedStyle(() => {
    const top = sharedTop.value;
    return {
      top,
    };
  });

  const backdropAnimationStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      sharedTop.value,
      [height, heightFromBottom],
      [0, 0.5],
    );
    const display = opacity === 0 ? 'none' : 'flex';
    return {
      display,
      opacity,
    };
  });

  const expandBottomSheet = useCallback(() => {
    'worklet';
    sharedTop.value = withSpring(heightFromBottom, {
      damping: 100,
      stiffness: 400,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeBottomSheet = useCallback(() => {
    'worklet';
    sharedTop.value = withSpring(height, {
      damping: 100,
      stiffness: 400,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This hook only exposes the returned functions in the second argument to the
  //  parent component, thereby restricting the amount of possible side-effects.
  // Still, this hook is not supposed to be used excessively, as the docs says.
  // Documentation Link: https://react.dev/reference/react/useImperativeHandle
  useImperativeHandle(
    ref,
    () => ({
      closeBottomSheet,
      expandBottomSheet,
    }),
    [closeBottomSheet, expandBottomSheet],
  );

  return (
    <>
      <TouchableWithoutFeedback onPress={closeBottomSheet}>
        <Animated.View style={[styles.backdropStyle, backdropAnimationStyle]} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.containerStyle,
          {backgroundColor: contentBG ? contentBG : '#ffffff'},
          animationStyle,
        ]}>
        <LinearGradient
          colors={['#055C9D', '#0E86D4', '#68BBE0']}
          style={styles.gestureControlBarStyle}>
          <View style={styles.horzGestureControlBarStyle} />
        </LinearGradient>
        {children}
      </Animated.View>
    </>
  );
});

const styles = StyleSheet.create({
  backdropStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
  },
  containerStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  gestureControlBarStyle: {
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  horzGestureControlBarStyle: {
    width: 80,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'white',
  },
});

export default BottomSheet;
