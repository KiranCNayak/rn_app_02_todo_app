import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
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
  DEFAULT_ICONS_LIST,
  DEFAULT_ICONS_INDEX,
  SWIPABLE_ITEM_WIDTH,
  TODO_LIST_STATUS_TYPE,
} from '../../Constants/Constants';
import LeftActionItem from './LeftActionItem';
import RightActionItem from './RightActionItem';
import styles from './styles';

const TodoItem = item => {
  const isCompleted = item.status === TODO_LIST_STATUS_TYPE.COMPLETED;

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
    item.onDeleteTodoHandler(item.id);
  };

  const onEditTriggered = () => {
    'worklet';
    item.onEditTodoHandler(item);
  };

  const onTodoCompletedButtonPressed = () => {
    item.onTodoCompleteHandler({
      ...item,
      status: TODO_LIST_STATUS_TYPE.COMPLETED,
    });
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

  const contentWithoutSwipe = () => (
    <View
      style={[
        styles.todoImageAndTextContainerStyle,
        {
          backgroundColor: `${
            DEFAULT_COLORS_LIST[DEFAULT_COLOR_INDEX[item.color]]?.color ??
            '#333'
          }`,
          left: isCompleted ? 0 : -SWIPABLE_ITEM_WIDTH,
        },
      ]}>
      <TouchableOpacity
        activeOpacity={0.5}
        disabled={isCompleted}
        onPress={onTodoCompletedButtonPressed}
        style={styles.imageContainerStyle}>
        <Image
          source={
            isCompleted
              ? IMAGES.ICON_TICK
              : DEFAULT_ICONS_LIST[DEFAULT_ICONS_INDEX[item.iconId]].source
          }
          style={[
            styles.completedImageStyle,
            {
              ...(isCompleted
                ? {}
                : {
                    tintColor:
                      DEFAULT_ICONS_LIST[DEFAULT_ICONS_INDEX[item.iconId]]
                        .tintColor,
                  }),
            },
          ]}
        />
      </TouchableOpacity>
      <View style={[styles.todoTextContainerStyle, {width: width - 80}]}>
        <Text style={styles.boldTextStyle}>{item.id}</Text>
        <Text style={styles.boldTextStyle}>{item.name}</Text>
        <Text>{item.description}</Text>
      </View>
    </View>
  );
  const contentWithSwipe = () => {
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
          {contentWithoutSwipe()}
          <RightActionItem
            backgroundColor={'green'}
            imageSource={IMAGES.ICON_EDIT}
          />
        </Animated.View>
      </PanGestureHandler>
    );
  };

  return isCompleted ? contentWithoutSwipe() : contentWithSwipe();
};

export default TodoItem;
