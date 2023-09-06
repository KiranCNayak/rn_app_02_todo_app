import React, {memo, useCallback} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import {DEFAULT_ICONS_LIST} from '../Constants/Constants';

const IconPicker = ({onIconSelected, selectedIconId}) => {
  const renderIconItem = useCallback(
    icon => (
      <TouchableOpacity
        activeOpacity={0.5}
        key={icon.id}
        onPress={() => onIconSelected(icon.id)}
        style={[
          styles.iconTouchableStyle,
          {
            backgroundColor: icon.id === selectedIconId ? '#888' : '#333',
          },
        ]}>
        <Image
          source={icon.source}
          style={styles.iconStyle}
          tintColor={icon.tintColor}
        />
      </TouchableOpacity>
    ),
    [onIconSelected, selectedIconId],
  );
  return (
    <View style={styles.iconsContainerStyle}>
      {DEFAULT_ICONS_LIST.map(renderIconItem)}
    </View>
  );
};

export default memo(IconPicker);

const styles = StyleSheet.create({
  iconTouchableStyle: {
    padding: 12,
    borderRadius: 30,
  },

  iconStyle: {
    height: 24,
    width: 24,
  },

  iconsContainerStyle: {
    flexDirection: 'row',
    flexShrink: 0,
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginTop: 8,
  },
});
