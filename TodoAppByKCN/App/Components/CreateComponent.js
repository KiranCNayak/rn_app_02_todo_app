import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import ColorPicker from './ColorPicker';

const CreateComponent = ({forceRender, onDismissCB, onSuccessCB}) => {
  const todoDescRef = useRef(null);
  const todoNameRef = useRef(null);

  const [selectedColor, setSelectedColor] = useState(null);
  const [todoDescText, setTodoDescText] = useState('');
  const [todoNameText, setTodoNameText] = useState('');

  // Keyboard should be focussed on the 'name' InputText each time
  //  'forceRender' value is changed.
  useEffect(() => {
    moveFocusToNameTextInput();
  }, [forceRender]);

  const moveFocusToDescriptionTextInput = () => {
    todoDescRef.current.focus();
  };

  const moveFocusToNameTextInput = () => {
    todoNameRef.current.focus();
  };

  const onColorItemPress = color => {
    setSelectedColor(color);
  };

  const onDescTextChange = value => {
    setTodoDescText(value);
  };

  const onNameTextChange = value => {
    setTodoNameText(value);
  };

  const onAddTodoButtonPressed = () => {
    const newTodo = {
      id: `${Date.now()}`,
      name: todoNameText,
      description: todoDescText,
      color: selectedColor ? selectedColor : '#333333', // Fallback color
    };
    onSuccessCB(newTodo);
    onDismissCB();
    clearInputTextData(false);
  };

  const clearInputTextData = useCallback(shouldMoveFocusToNameTextInput => {
    todoNameRef.current.clear();
    todoDescRef.current.clear();
    setSelectedColor(null);
    setTodoNameText('');
    setTodoDescText('');
    if (shouldMoveFocusToNameTextInput) {
      moveFocusToNameTextInput();
    }
  }, []);

  const isAddButtonDisabled =
    todoNameText.length === 0 || todoDescText.length === 0;

  const isClearButtonDisabled =
    selectedColor === null &&
    todoNameText.length === 0 &&
    todoDescText.length === 0;

  return (
    <View style={styles.createCompRootContainerStyle}>
      <Text style={styles.createTextStyle}>Create TODO</Text>
      <TextInput
        onChangeText={onNameTextChange}
        onSubmitEditing={moveFocusToDescriptionTextInput}
        placeholder="TODO Name"
        ref={todoNameRef}
        style={styles.textInputStyle}
        value={todoNameText}
      />
      <TextInput
        onChangeText={onDescTextChange}
        placeholder="TODO Description"
        ref={todoDescRef}
        style={[styles.textInputStyle, styles.smallMarginBottom]}
        value={todoDescText}
      />
      <ColorPicker
        defaultColors
        onColorItemPress={onColorItemPress}
        selectedColor={selectedColor}
      />
      <TouchableOpacity
        activeOpacity={0.5}
        disabled={isClearButtonDisabled}
        onPress={() => clearInputTextData(true)}
        style={[
          styles.clearTodoStyle,
          styles.smallMarginBottom,
          isClearButtonDisabled
            ? styles.confirmClearTodoStyleDisabled
            : styles.confirmClearTodoStyleEnabled,
        ]}>
        <Text
          style={
            isClearButtonDisabled ? styles.disabledText : styles.enabledText
          }>
          CLEAR
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        disabled={isAddButtonDisabled}
        onPress={onAddTodoButtonPressed}
        style={[
          styles.confirmCreateTodoCommonStyle,
          isAddButtonDisabled
            ? styles.confirmCreateTodoStyleDisabled
            : styles.confirmCreateTodoStyleEnabled,
        ]}>
        <Text
          style={
            isAddButtonDisabled ? styles.disabledText : styles.enabledText
          }>
          ADD
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  clearTodoStyle: {
    paddingVertical: 8,
    fontSize: 16,
    borderRadius: 20,
    backgroundColor: '#773322',
    alignItems: 'center',
  },
  confirmClearTodoStyleDisabled: {
    backgroundColor: '#773322',
  },
  confirmClearTodoStyleEnabled: {
    backgroundColor: '#dd4433',
  },
  confirmCreateTodoCommonStyle: {
    alignItems: 'center',
    borderRadius: 20,
    fontSize: 16,
    marginBottom: 40,
    paddingVertical: 8,
  },
  confirmCreateTodoStyleDisabled: {
    backgroundColor: '#227722',
  },
  confirmCreateTodoStyleEnabled: {
    backgroundColor: '#22aa22',
  },
  contentStyle: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    maxHeight: '80%',
    marginVertical: '20%',
    marginHorizontal: '5%',
    backgroundColor: 'rgba(60, 60, 60, 1)',
  },
  createCompRootContainerStyle: {
    flex: 1,
    padding: 8,
    backgroundColor: 'rgba(33, 33, 33, 0.8)',
  },
  createTextStyle: {
    fontSize: 16,
    fontWeight: '700',
    paddingVertical: 8,
  },
  disabledText: {color: '#999999'},
  enabledText: {color: '#dddddd'},
  smallMarginBottom: {marginBottom: 16},
  textInputStyle: {
    borderRadius: 8,
    borderWidth: 2,
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: '#df2',
  },
});

export default memo(CreateComponent);
