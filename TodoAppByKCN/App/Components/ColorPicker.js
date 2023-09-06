import React, {memo, useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {DEFAULT_COLORS_LIST} from '../Constants/Constants';

const ColorPicker = ({defaultColors, selectedColor, onColorItemPress}) => {
  let colorsList = [];
  if (defaultColors) {
    colorsList = DEFAULT_COLORS_LIST;
  }

  const renderColorItem = useCallback(
    colorItem => (
      <TouchableOpacity
        activeOpacity={0.5}
        key={colorItem.id}
        onPress={() => onColorItemPress(colorItem.colorName)}
        style={[styles.colorStyle, {backgroundColor: `${colorItem.color}`}]}>
        {selectedColor === colorItem.colorName && (
          <View style={styles.selectedColorStyle} />
        )}
      </TouchableOpacity>
    ),
    [onColorItemPress, selectedColor],
  );

  return (
    <View style={styles.colorPickerRootStyle}>
      <Text style={styles.textStyle}>
        {'Select a Color (Default is Dark Grey)'}
      </Text>
      <View style={styles.colorPickerContainerStyle}>
        {colorsList.map(renderColorItem)}
      </View>
    </View>
  );
};

export default memo(ColorPicker);

const styles = StyleSheet.create({
  colorPickerContainerStyle: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  colorPickerRootStyle: {paddingBottom: 8},
  colorStyle: {
    height: 32,
    width: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedColorStyle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
  },
  textStyle: {
    marginBottom: 12,
    marginHorizontal: 8,
  },
});
