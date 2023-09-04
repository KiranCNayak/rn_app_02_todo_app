import React from 'react';
import {Text, View, useWindowDimensions} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {IMAGES} from '../../Config/Images';
import {
  DEFAULT_COLOR_INDEX,
  DEFAULT_COLORS_LIST,
  SWIPABLE_ITEM_WIDTH,
} from '../../Constants/Constants';
import LeftActionItem from './LeftActionItem';
import RightActionItem from './RightActionItem';
import styles from './styles';

const TodoItem = item => {
  const {width} = useWindowDimensions();

  const sharedLeft = useSharedValue(0);

  const swipeAnimation = useAnimatedStyle(() => {
    const left = sharedLeft.value;
    return {
      left,
    };
  });

  const onDeleteTriggered = () => {
    'worklet';
    console.log('Delete triggered');
  };

  const onEditTriggered = () => {
    'worklet';
    console.log('Edit triggered');
  };

  const animationOptions = {
    damping: 100,
    stiffness: 400,
  };

  const gestureHandler = useAnimatedGestureHandler({
    // This context will have the value that is set in the onStart function below
    onActive: (event, context) => {
      // When user drags from current point to the left for more than 'SWIPABLE_ITEM_WIDTH' width
      //  we will show edit action.
      if (event.translationX < -SWIPABLE_ITEM_WIDTH) {
        sharedLeft.value = withSpring(-SWIPABLE_ITEM_WIDTH, animationOptions);

        // When user drags from current point to the right for less than '—SWIPABLE_ITEM_WIDTH' width
        //  we will show delete action.
      } else if (event.translationX > SWIPABLE_ITEM_WIDTH) {
        sharedLeft.value = withSpring(SWIPABLE_ITEM_WIDTH, animationOptions);
      } else {
        sharedLeft.value = withSpring(
          context.startX + event.translationX,
          animationOptions,
        );
      }
    },
    onStart: (_, context) => {
      context.startX = sharedLeft.value;
    },
    onEnd: (event, context) => {
      // In any case just reset the view to be as it was initially
      sharedLeft.value = withSpring(0, animationOptions);

      if (event.translationX < -SWIPABLE_ITEM_WIDTH) {
        onEditTriggered();
      } else if (event.translationX > SWIPABLE_ITEM_WIDTH) {
        onDeleteTriggered();
      }
    },
  });

  return (
    <PanGestureHandler
      activeOffsetX={[-25, 25]} // This is needed to have scroll with swipe. Otherwise you only trigger swipe.
      key={item.id}
      onGestureEvent={gestureHandler}>
      <Animated.View style={[swipeAnimation, styles.rowStyle]}>
        <LeftActionItem
          backgroundColor={'red'}
          imageSource={IMAGES.ICON_DELETE}
        />
        <View
          style={[
            styles.todoItemContainerStyle,
            {
              backgroundColor: `${
                DEFAULT_COLORS_LIST[DEFAULT_COLOR_INDEX[item.color]]?.color ??
                '#333'
              }`,
              width,
            },
          ]}>
          <Text style={styles.boldTextStyle}>{item.id}</Text>
          <Text style={styles.boldTextStyle}>{item.name}</Text>
          <Text>{item.description}</Text>
        </View>
        <RightActionItem
          backgroundColor={'green'}
          imageSource={IMAGES.ICON_EDIT}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default TodoItem;
