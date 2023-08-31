import React, {useCallback, useRef, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import BottomSheet from './Components/BottomSheet';
import CreateModalComponent from './Components/CreateModalComponent';
import FAB from './Components/FAB';
import TodoItem from './Components/TodoItem';
import {todoInitList} from './Constants/Constants';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoList, setTodoList] = useState(todoInitList);

  const bottomSheetRef = useRef(null);

  const {height} = useWindowDimensions();

  const renderTodoList = useCallback(TODOList => TODOList.map(TodoItem), []);

  const onCloseCBCached = useCallback(() => {
    console.log('Close Called');
    // setIsModalOpen(false);

    closeBottomSheetHandler();
  }, []);

  const onOpenCBCached = useCallback(() => {
    console.log('Open Called');
    // setIsModalOpen(true);

    openBottomSheetHandler();
  }, []);

  const addNewTodoCB = useCallback(
    newTodo => {
      setTodoList([...todoList, newTodo]);
    },
    [todoList],
  );

  const openBottomSheetHandler = useCallback(() => {
    bottomSheetRef.current.expandBottomSheet();
  }, []);

  const closeBottomSheetHandler = useCallback(() => {
    bottomSheetRef.current.closeBottomSheet();
  }, []);

  return (
    <GestureHandlerRootView style={styles.rootContainerStyle}>
      <SafeAreaView style={styles.rootContainerStyle}>
        <ScrollView style={styles.mainViewStyle}>
          <View style={styles.todoListContainerStyle}>
            <Button onPress={onCloseCBCached} title={'Close'} />

            {todoList.length ? (
              renderTodoList(todoList)
            ) : (
              <Text style={styles.emptyTextStyle}>
                {'Empty List here!\nAdd new Todos from the button below'}
              </Text>
            )}
          </View>
        </ScrollView>
        {isModalOpen && (
          <CreateModalComponent
            onSuccessCB={addNewTodoCB}
            isModalOpen={isModalOpen}
            onDismissCB={onCloseCBCached}
            transparentModal
          />
        )}
        <FAB onOpenCB={onOpenCBCached} />
        <BottomSheet
          contentBG={'#ccc'}
          activeHeight={height * 0.8}
          ref={bottomSheetRef}>
          <Text style={{color: 'black', backgroundColor: '#888888'}}>
            Bottomsheet content
          </Text>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  emptyTextStyle: {textAlign: 'center', marginTop: '50%'},
  mainViewStyle: {
    backgroundColor: '#212121',
    flex: 1,
  },
  rootContainerStyle: {
    flex: 1,
  },
  todoListContainerStyle: {
    flex: 1,
  },
});

export default App;
