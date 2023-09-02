import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {DEFAULT_COLORS_LIST, DEFAULT_COLOR_INDEX} from '../Constants/Constants';

const TodoItem = item => (
  <View
    key={item.id}
    style={[
      styles.todoItemContainerStyle,
      {
        backgroundColor: `${
          DEFAULT_COLORS_LIST[DEFAULT_COLOR_INDEX[item.color]]?.color ?? '#333'
        }`,
      },
    ]}>
    <Text style={styles.boldTextStyle}>{item.name}</Text>
    <Text>{item.description}</Text>
  </View>
);

const styles = StyleSheet.create({
  boldTextStyle: {fontWeight: '700'},
  todoItemContainerStyle: {
    margin: 8,
    borderRadius: 8,
    padding: 8,
  },
});

export default TodoItem;
