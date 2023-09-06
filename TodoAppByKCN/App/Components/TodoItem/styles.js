import {StyleSheet} from 'react-native';

import {SWIPABLE_ITEM_WIDTH} from '../../Constants/Constants';

const styles = StyleSheet.create({
  actionButtonCommonStyle: {
    left: -SWIPABLE_ITEM_WIDTH,
    width: SWIPABLE_ITEM_WIDTH,
    height: 'auto',
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionButtonImageStyle: {
    height: 32,
    width: 32,
  },

  boldTextStyle: {
    fontWeight: '700',
  },

  completedImageStyle: {
    height: 40,
    width: 40,
    margin: 8,
  },

  imageContainerStyle: {
    borderRadius: 40,
    marginLeft: 8,
    width: 56,
  },

  rowStyle: {
    flexDirection: 'row',
  },

  todoImageAndTextContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },

  todoTextContainerStyle: {
    padding: 8,
  },
});

export default styles;
