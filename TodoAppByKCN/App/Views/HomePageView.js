import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';

import BottomSheet from '../Components/BottomSheet';
import FAB from '../Components/FAB';
import CreateComponent from '../Components/CreateComponent';
import EditModal from '../Components/EditModal';
import TodoItem from '../Components/TodoItem/TodoItem';
import {LARGE_INIT_TODO_LIST} from '../Constants/Constants';
import {push} from '../Utils/NavigationUtils';
import {
  NAVIGATION_OPTIONS,
  NAV_STYLES,
  SCREEN_NAMES,
} from '../Utils/NavigationUtils/NAV_CONSTANTS';

function HomePageView(props) {
  const [todoList, setTodoList] = useState([]);

  const [current20StartIdx, setCurrent20StartIdx] = useState(0);

  const bottomSheetRef = useRef(null);

  const [showEditModal, setShowEditModal] = useState(false);

  const [editTodo, setEditTodo] = useState(null);

  const {height} = useWindowDimensions();

  useEffect(() => {
    if (current20StartIdx + 20 <= LARGE_INIT_TODO_LIST.length) {
      setTodoList(
        LARGE_INIT_TODO_LIST.slice(current20StartIdx, current20StartIdx + 20),
      );
    }
  }, [current20StartIdx]);

  const onDeleteTodoHandler = useCallback(
    todoId => {
      'worklet';
      const filteredList = todoList.filter(item => item.id !== todoId);
      runOnJS(setTodoList)([...filteredList]);
    },
    [todoList],
  );

  const onEditTodoHandler = useCallback(todo => {
    'worklet';
    runOnJS(setEditTodo)(todo);
    runOnJS(setShowEditModal)(true);
  }, []);

  const onDismissEditTodoModal = useCallback(() => {
    setShowEditModal(false);
    setEditTodo(null);
  }, []);

  const renderTodoList = useCallback(
    ({item}) => (
      <TodoItem
        key={item.id}
        {...item}
        onDeleteTodoHandler={onDeleteTodoHandler}
        onEditTodoHandler={onEditTodoHandler}
      />
    ),
    [onDeleteTodoHandler, onEditTodoHandler],
  );

  const flatListKE = useCallback(item => `${item.id}`, []);

  const getItemLayout = useCallback((item, index) => {
    const dataItems = item ?? [];
    return {
      length: 85,
      offset: 85 * dataItems.length,
      index,
    };
  }, []);

  const onFlatListEndReached = useCallback(() => {
    if (current20StartIdx + 20 <= LARGE_INIT_TODO_LIST.length) {
      setCurrent20StartIdx(current20StartIdx + 20);
    }
  }, [current20StartIdx]);

  const onFlatListStartReached = useCallback(() => {
    if (current20StartIdx - 20 >= 0) {
      setCurrent20StartIdx(current20StartIdx - 20);
    } else if (current20StartIdx !== 0) {
      setCurrent20StartIdx(0);
    }
  }, [current20StartIdx]);

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
    // TODO: This comment is what was there before
    // push(
    //   props.componentId,
    //   SCREEN_NAMES.randomPage,
    //   NAVIGATION_OPTIONS(NAV_STYLES.dark, 'Random Page Title', true, false),
    //   {},
    // );
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
        {todoList.length !== 0 ? (
          <FlatList
            data={todoList}
            getItemLayout={getItemLayout}
            keyExtractor={flatListKE}
            onEndReached={onFlatListEndReached}
            onStartReached={onFlatListStartReached}
            renderItem={renderTodoList}
          />
        ) : (
          <View style={styles.emptyTextStyle}>
            <Text>Empty Todo List here!</Text>
            <Text> Add more from the button below</Text>
          </View>
        )}
        <FAB onOpenCB={openBottomSheetHandler} />
        <BottomSheet
          activeHeight={height * 0.8} // TODO: Set this value via an Enum.
          backdropColor={'black'}
          bottomSheetBGColor={'black'}
          ref={bottomSheetRef}>
          <CreateComponent
            onSuccessCB={addNewTodoCB}
            onDismissCB={closeBottomSheetHandler}
          />
        </BottomSheet>
        {editTodo && (
          <EditModal
            showEditModal={showEditModal}
            editTodo={editTodo}
            onDismissCB={onDismissEditTodoModal}
          />
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  emptyTextStyle: {
    alignItems: 'center',
    marginTop: '50%',
  },
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
