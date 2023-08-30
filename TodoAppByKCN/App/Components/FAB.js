import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

const FAB = ({onOpenCB}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onOpenCB}
      style={styles.floatingActionButton}>
      <View style={styles.plusContainerStyle}>
        <View style={styles.horzLineStyle} />
        <View style={styles.vertLineStyle} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingActionButton: {
    backgroundColor: 'rgb(100, 34, 243)',
    borderColor: '#fd2',
    borderRadius: 48,
    borderStyle: 'dashed',
    borderWidth: 2,
    bottom: 10,
    height: 64,
    margin: 'auto',
    padding: 16,
    position: 'absolute',
    right: 10,
    width: 64,
  },
  horzLineStyle: {
    backgroundColor: '#fd2',
    borderRadius: 2,
    height: 4,
    top: 15,
    transform: [{translateX: -1}, {translateY: -2}],
    width: 30,
  },
  plusContainerStyle: {
    position: 'relative',
  },
  vertLineStyle: {
    backgroundColor: '#fd2',
    borderRadius: 2,
    height: 30,
    left: 15,
    transform: [{translateX: -3}, {translateY: -4}],
    width: 4,
  },
});

export default memo(FAB);
