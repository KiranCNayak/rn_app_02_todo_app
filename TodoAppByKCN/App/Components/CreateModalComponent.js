import React, {memo, useEffect, useRef, useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import CloseButton from './CloseButton';
import {JUSTIFY_CONTENT} from '../Constants/Constants';

const CreateModalComponent = ({
  isModalOpen,
  onDismissCB,
  onSuccessCB,
  transparentModal,
}) => {
  const todoDescRef = useRef(null);
  const todoNameRef = useRef(null);

  const [todoDescText, setTodoDescText] = useState('');
  const [todoNameText, setTodoNameText] = useState('');

  useEffect(() => {
    todoNameRef.current.focus();
  }, []);

  const onNameTextChange = value => {
    setTodoNameText(value);
  };

  const onDescTextChange = value => {
    setTodoDescText(value);
  };

  const moveFocusToDescriptionInput = () => {
    todoDescRef.current.focus();
  };

  const onAddTodoButtonPressed = () => {
    const newTodo = {
      id: `${Date.now()}`,
      name: todoNameText,
      description: todoDescText,
    };
    onSuccessCB(newTodo);
    onDismissCB();
  };

  const onClearButtonPressed = () => {
    todoNameRef.current.clear();
    todoDescRef.current.clear();
    setTodoNameText('');
    setTodoDescText('');
  };

  const isAddButtonDisabled =
    todoNameText.length === 0 || todoDescText.length === 0;

  return (
    <Modal
      animationType={'fade'}
      hardwareAccelerated={true}
      onRequestClose={onDismissCB}
      transparent={!!transparentModal}
      visible={isModalOpen}>
      <View style={styles.modalBGStyle}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.contentStyle}>
          <CloseButton
            onClosePressed={onDismissCB}
            position={JUSTIFY_CONTENT.END}
          />
          <Text style={styles.createTextStyle}>Create TODO</Text>
          <TextInput
            onChangeText={onNameTextChange}
            onSubmitEditing={moveFocusToDescriptionInput}
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
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={onClearButtonPressed}
            style={[styles.clearTodoStyle, styles.smallMarginBottom]}>
            <Text style={styles.whiteText}>CLEAR</Text>
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
        </ScrollView>
      </View>
    </Modal>
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
  createTextStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    paddingVertical: 8,
  },
  disabledText: {color: '#999999'},
  enabledText: {color: '#dddddd'},
  modalBGStyle: {
    flex: 1,
    backgroundColor: 'rgba(33, 33, 33, 0.8)',
  },
  smallMarginBottom: {marginBottom: 16},
  textInputStyle: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 2,
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: '#df2',
  },
});

export default memo(CreateModalComponent);
