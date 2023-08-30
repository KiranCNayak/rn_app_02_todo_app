import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const CloseBtn = ({onClosePressed, position}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onClosePressed}
      style={[styles.buttonRowContainerStyle, {justifyContent: `${position}`}]}>
      <View style={styles.closeButtonContainer}>
        <Text style={styles.dismissTextStyle}>{'X'}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonRowContainerStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  closeButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(220, 30, 40, 0.8)',
  },
  dismissTextStyle: {
    fontSize: 24,
    color: 'white',
  },
});

export default memo(CloseBtn);
