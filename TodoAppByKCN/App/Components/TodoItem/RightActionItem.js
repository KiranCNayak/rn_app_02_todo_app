import React, {memo} from 'react';
import {Image, View} from 'react-native';

import styles from './styles';

const RightActionItem = ({backgroundColor, imageSource}) => (
  <View style={[styles.actionButtonCommonStyle, {backgroundColor}]}>
    <Image source={imageSource} style={styles.actionButtonImageStyle} />
  </View>
);

export default memo(RightActionItem);
