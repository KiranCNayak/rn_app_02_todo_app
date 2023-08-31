import React, {useCallback, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import BottomSheet from './Components/BottomSheet';
import FAB from './Components/FAB';
import CreateComponent from './Components/CreateComponent';
import TodoItem from './Components/TodoItem';
import {todoInitList} from './Constants/Constants';

function App() {
  const [todoList, setTodoList] = useState(todoInitList);

  // Since BottomSheet is not removed from the screen once it is placed,
  //  we need to use a state variable to send the signal for Create TODO
  //  component to set the focus to 'Name' TextInput, on each open action
  //  of the BottomSheet.
  const [shouldRender, setShouldRender] = useState(true);

  const bottomSheetRef = useRef(null);

  const {height} = useWindowDimensions();

  const renderTodoList = useCallback(TODOList => TODOList.map(TodoItem), []);

  const addNewTodoCB = useCallback(
    newTodo => {
      setTodoList([...todoList, newTodo]);
    },
    [todoList],
  );

  const openBottomSheetHandler = useCallback(() => {
    bottomSheetRef.current.expandBottomSheet();
    setShouldRender(true);
  }, []);

  const closeBottomSheetHandler = useCallback(() => {
    bottomSheetRef.current.closeBottomSheet();
    setShouldRender(false);
  }, []);

  return (
    <GestureHandlerRootView style={styles.rootContainerStyle}>
      <SafeAreaView style={styles.rootContainerStyle}>
        <ScrollView style={styles.mainViewStyle}>
          <View style={styles.todoListContainerStyle}>
            {todoList.length ? (
              renderTodoList(todoList)
            ) : (
              <Text style={styles.emptyTextStyle}>
                {'Empty List here!\nAdd new Todos from the button below'}
              </Text>
            )}
          </View>
        </ScrollView>
        <FAB onOpenCB={openBottomSheetHandler} />
        <BottomSheet
          activeHeight={height * 0.8} // TODO: Set this value via an Enum.
          backdropColor={'black'}
          bottomSheetBGColor={'#ccc'}
          ref={bottomSheetRef}>
          <CreateComponent
            forceRender={shouldRender}
            onSuccessCB={addNewTodoCB}
            onDismissCB={closeBottomSheetHandler}
          />
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
