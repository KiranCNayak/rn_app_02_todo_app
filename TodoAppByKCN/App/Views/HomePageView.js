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
import {TODO_LIST_STATUS_TYPE, todoInitList} from '../Constants/Constants';
import {push} from '../Utils/NavigationUtils';
import {
  NAVIGATION_OPTIONS,
  NAV_STYLES,
  SCREEN_NAMES,
} from '../Utils/NavigationUtils/NAV_CONSTANTS';

function HomePageView(props) {
  const [pendingTodoList, setPendingTodoList] = useState([]);

  const [current20StartIdx, setCurrent20StartIdx] = useState(0);

  const [completedTodoList, setCompletedTodoList] = useState([]);

  const bottomSheetRef = useRef(null);

  const [showEditModal, setShowEditModal] = useState(false);

  const [editTodo, setEditTodo] = useState(null);

  const {height} = useWindowDimensions();

  useEffect(() => {
    if (current20StartIdx + 20 <= todoInitList.length) {
      setPendingTodoList(
        todoInitList.slice(current20StartIdx, current20StartIdx + 20),
      );
    }
  }, [current20StartIdx]);

  // Here, we are initializing the date from DB (for now, its from Contants file)
  //  This need not be run on each item change, as the updates themselves adjust
  //  to that change, in 'onCompleteButtonPressed' method.
  useEffect(() => {
    let completedList = [];
    let pendingList = [];

    for (const todo of todoInitList) {
      switch (todo.status) {
        case TODO_LIST_STATUS_TYPE.IN_PROGRESS:
          pendingList.push(todo);
          break;
        case TODO_LIST_STATUS_TYPE.COMPLETED:
          completedList.push(todo);
          break;
      }
    }
    setCompletedTodoList(completedList);
    setPendingTodoList(pendingList);
  }, []);

  const onDeleteTodoHandler = useCallback(
    todoId => {
      'worklet';
      const filteredList = pendingTodoList.filter(item => item.id !== todoId);
      runOnJS(setPendingTodoList)([...filteredList]);
    },
    [pendingTodoList],
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

  const onTodoCompleteHandler = useCallback(
    todo => {
      completedTodoList.unshift(todo);
      setTimeout(() => {
        setPendingTodoList(
          [...pendingTodoList].filter(item => item.id !== todo.id),
        );
        setCompletedTodoList(completedTodoList);
      }, 50);
    },
    [completedTodoList, pendingTodoList],
  );

  const renderTodoList = useCallback(
    ({item}) => (
      <TodoItem
        key={item.id}
        {...item}
        onDeleteTodoHandler={onDeleteTodoHandler}
        onEditTodoHandler={onEditTodoHandler}
        onTodoCompleteHandler={onTodoCompleteHandler}
      />
    ),
    [onTodoCompleteHandler, onDeleteTodoHandler, onEditTodoHandler],
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
    if (current20StartIdx + 20 < todoInitList.length) {
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
      setPendingTodoList([...pendingTodoList, newTodo]);
    },
    [pendingTodoList],
  );

  const openBottomSheetHandler = useCallback(() => {
    bottomSheetRef.current.expandBottomSheet();
  }, []);

  const closeBottomSheetHandler = useCallback(() => {
    bottomSheetRef.current.closeBottomSheet();
  }, []);

  const onSuccessfulTodoEdit = todo => {
    const replaceIndex = pendingTodoList.findIndex(item => item.id === todo.id);

    const newTodoList = [...pendingTodoList];
    newTodoList[replaceIndex] = todo;

    setPendingTodoList(newTodoList);
  };

  const renderCompletedList = () => {
    return (
      <View style={styles.completedSectionContainerStyle}>
        <Text style={styles.sectionHeaderTextStyle}>COMPLETED</Text>
        {completedTodoList.length !== 0 ? (
          <FlatList
            data={completedTodoList}
            getItemLayout={getItemLayout}
            keyExtractor={flatListKE}
            onEndReached={onFlatListEndReached}
            onStartReached={onFlatListStartReached}
            renderItem={renderTodoList}
          />
        ) : (
          <View style={styles.emptyTextStyle}>
            <Text>ALL Tasks are Done!</Text>
          </View>
        )}
      </View>
    );
  };

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
        {/* <TouchableOpacity
          style={{height: 50, alignItems: 'center', justifyContent: 'center'}}
          onPress={pushScreenToRandomPage}>
          <Text>Go to Random Page</Text>
        </TouchableOpacity> */}
        <View style={styles.inProgressSectionContainerStyle}>
          <Text style={styles.sectionHeaderTextStyle}>IN PROGRESS</Text>
          {pendingTodoList.length !== 0 || completedTodoList.length !== 0 ? (
            <FlatList
              data={pendingTodoList}
              getItemLayout={getItemLayout}
              keyExtractor={flatListKE}
              onEndReached={onFlatListEndReached}
              onStartReached={onFlatListStartReached}
              renderItem={renderTodoList}
              ListFooterComponent={renderCompletedList}
            />
          ) : (
            <View style={styles.emptyTextStyle}>
              <Text>Nothing in the TODO List!</Text>
              <Text> Add more from the button below</Text>
            </View>
          )}
        </View>

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
            onSuccessCB={onSuccessfulTodoEdit}
          />
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  completedSectionContainerStyle: {
    backgroundColor: '#444444',
    padding: 8,
    opacity: 0.6,
  },
  emptyTextStyle: {
    alignItems: 'center',
    marginVertical: '10%',
  },
  inProgressSectionContainerStyle: {
    backgroundColor: '#222222',
    padding: 8,
  },
  mainViewStyle: {
    backgroundColor: '#212121',
    flex: 1,
  },
  rootContainerStyle: {
    flex: 1,
  },
  sectionHeaderTextStyle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  todoListContainerStyle: {
    flex: 1,
  },
});

export default HomePageView;
