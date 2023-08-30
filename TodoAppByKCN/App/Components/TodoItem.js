import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const TodoItem = item => (
  <View key={item.id} style={styles.todoItemContainerStyle}>
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
    backgroundColor: '#ddff2220',
  },
});

export default TodoItem;
