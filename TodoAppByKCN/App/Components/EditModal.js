import React, {useCallback, useRef, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import ColorPicker from './ColorPicker';
import CloseButton from './CloseButton';
import {
  DEFAULT_COLORS_LIST,
  DEFAULT_COLOR_INDEX,
  JUSTIFY_CONTENT,
} from '../Constants/Constants';

const EditModal = ({showEditModal, onDismissCB, onSuccessCB, editTodo}) => {
  const editTodoDescRef = useRef(null);
  const editTodoNameRef = useRef(null);

  const [selectedColor, setSelectedColor] = useState(editTodo?.color);

  const [todoDescText, setTodoDescText] = useState(editTodo?.description);

  const [todoNameText, setTodoNameText] = useState(editTodo?.name);

  const clearInputTextData = useCallback(shouldMoveFocusToNameTextInput => {
    editTodoNameRef.current.clear();
    editTodoDescRef.current.clear();
    setSelectedColor(null);
    setTodoNameText('');
    setTodoDescText('');
    if (shouldMoveFocusToNameTextInput) {
      moveFocusToNameTextInput();
    }
  }, []);

  const moveFocusToDescriptionTextInput = () => {
    editTodoDescRef.current.focus();
  };

  const moveFocusToNameTextInput = () => {
    editTodoNameRef.current.focus();
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

  const onEditTodoButtonPressed = () => {
    const newTodo = {
      id: editTodo.id,
      name: todoNameText,
      description: todoDescText,
      color: selectedColor ? selectedColor : '#333333', // Fallback color
    };

    onSuccessCB(newTodo);
    onDismissCB();
  };

  const isEditButtonDisabled = Boolean(
    todoNameText?.length === 0 ||
      todoDescText?.length === 0 ||
      (editTodo.name === todoNameText &&
        editTodo.description === todoDescText &&
        DEFAULT_COLORS_LIST[DEFAULT_COLOR_INDEX[editTodo.color]].colorName ===
          selectedColor),
  );

  const isClearButtonDisabled = Boolean(
    selectedColor === null &&
      todoNameText?.length === 0 &&
      todoDescText?.length === 0,
  );

  return (
    <Modal visible={showEditModal} style={styles.rootContainerStyle}>
      <View style={styles.editModalContainerStyle}>
        <View style={styles.closeBtnContainer}>
          <CloseButton
            onClosePressed={onDismissCB}
            closeBtnPos={JUSTIFY_CONTENT.END}
          />
        </View>
        <Text style={styles.editTextStyle}>Edit TODO</Text>
        <View style={styles.editComponentsStyle}>
          <TextInput
            onChangeText={onNameTextChange}
            onSubmitEditing={moveFocusToDescriptionTextInput}
            placeholder="TODO Name"
            ref={editTodoNameRef}
            style={styles.textInputStyle}
            value={todoNameText}
          />
          <TextInput
            onChangeText={onDescTextChange}
            placeholder="TODO Description"
            ref={editTodoDescRef}
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
            disabled={isEditButtonDisabled}
            onPress={onEditTodoButtonPressed}
            style={[
              styles.confirmCreateTodoCommonStyle,
              styles.smallMarginBottom,
              isEditButtonDisabled
                ? styles.confirmCreateTodoStyleDisabled
                : styles.confirmCreateTodoStyleEnabled,
            ]}>
            <Text
              style={
                isEditButtonDisabled ? styles.disabledText : styles.enabledText
              }>
              EDIT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            disabled={isClearButtonDisabled}
            onPress={() => clearInputTextData(true)}
            style={[
              styles.clearTodoStyle,
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
        </View>
      </View>
    </Modal>
  );
};

export default EditModal;

const styles = StyleSheet.create({
  clearTodoStyle: {
    paddingVertical: 8,
    fontSize: 16,
    borderRadius: 20,
    backgroundColor: '#773322',
    alignItems: 'center',
  },

  closeBtnContainer: {
    flexDirection: 'row',
    flexShrink: 1,
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

  editTextStyle: {
    fontSize: 16,
    fontWeight: '700',
    paddingVertical: 8,
  },

  disabledText: {
    color: '#999999',
  },

  editComponentsStyle: {
    flex: 1,
    width: '100%',
    padding: 8,
  },

  editModalContainerStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: '10%',
    paddingBottom: '10%',
    paddingLeft: '10%',
    paddingRight: '10%',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    alignItems: 'center',
  },

  enabledText: {
    color: '#dddddd',
  },

  rootContainerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  smallMarginBottom: {
    marginBottom: 16,
  },

  textInputStyle: {
    borderRadius: 8,
    borderWidth: 2,
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: '#df2',
  },
});
