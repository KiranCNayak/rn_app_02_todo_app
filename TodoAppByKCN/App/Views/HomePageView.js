import React, {useCallback, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import BottomSheet from '../Components/BottomSheet';
import FAB from '../Components/FAB';
import CreateComponent from '../Components/CreateComponent';
import TodoItem from '../Components/TodoItem/TodoItem';
import {todoInitList} from '../Constants/Constants';
import {push} from '../Utils/NavigationUtils';
import {
  NAVIGATION_OPTIONS,
  NAV_STYLES,
  SCREEN_NAMES,
} from '../Utils/NavigationUtils/NAV_CONSTANTS';

function HomePageView(props) {
  const [todoList, setTodoList] = useState(todoInitList);

  const bottomSheetRef = useRef(null);

  const {height} = useWindowDimensions();

  const renderTodoList = useCallback(
    TODOList =>
      TODOList.map(todoProps => <TodoItem key={todoProps.id} {...todoProps} />),
    [],
  );

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

  // TODO: Remove this method as well
  const pushScreenToRandomPage = () => {
    push(
      props.componentId,
      SCREEN_NAMES.randomPage,
      NAVIGATION_OPTIONS(NAV_STYLES.dark, 'Random Page Title', true, false),
      {},
    );
  };

  return (
    <GestureHandlerRootView style={styles.rootContainerStyle}>
      <SafeAreaView style={styles.rootContainerStyle}>
        {/* TODO: Remove the TouchableOpacity below. It's just to see if navigation works as expected */}
        <TouchableOpacity
          style={{height: 50, alignItems: 'center', justifyContent: 'center'}}
          onPress={pushScreenToRandomPage}>
          <Text>Go to Random Page</Text>
        </TouchableOpacity>
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

export default HomePageView;
