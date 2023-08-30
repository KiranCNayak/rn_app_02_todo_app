import React, {useCallback, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

import CreateModalComponent from './Components/CreateModalComponent';
import FAB from './Components/FAB';
import TodoItem from './Components/TodoItem';
import {todoInitList} from './Constants/Constants';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoList, setTodoList] = useState(todoInitList);

  const renderTodoList = useCallback(TODOList => TODOList.map(TodoItem), []);

  const onCloseCBCached = useCallback(() => {
    console.log('Close Called');
    setIsModalOpen(false);
  }, []);

  const onOpenCBCached = useCallback(() => {
    console.log('Open Called');
    setIsModalOpen(true);
  }, []);

  const addNewTodoCB = useCallback(
    newTodo => {
      setTodoList([...todoList, newTodo]);
    },
    [todoList],
  );

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
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
      {isModalOpen && (
        <CreateModalComponent
          onSuccessCB={addNewTodoCB}
          isModalOpen={isModalOpen}
          onDismissCB={onCloseCBCached}
          transparentModal
        />
      )}
      <FAB onOpenCB={onOpenCBCached} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  emptyTextStyle: {textAlign: 'center', marginTop: '50%'},
  mainViewStyle: {
    backgroundColor: '#212121',
    flex: 1,
  },
  safeAreaViewStyle: {
    flex: 1,
  },
  todoListContainerStyle: {
    flex: 1,
  },
});

export default App;
