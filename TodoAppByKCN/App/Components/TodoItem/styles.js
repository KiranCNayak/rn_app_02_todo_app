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

  rowStyle: {
    flexDirection: 'row',
  },

  todoItemContainerStyle: {
    left: -SWIPABLE_ITEM_WIDTH,
    marginVertical: 4,
    padding: 8,
  },
});

export default styles;
