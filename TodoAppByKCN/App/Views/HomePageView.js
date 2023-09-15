import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
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
import {connect, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BottomSheet from '../Components/BottomSheet';
import FAB from '../Components/FAB';
import CreateComponent from '../Components/CreateComponent';
import DarkAndLightModeToggle from '../Components/DarkAndLightModeToggle';
import EditModal from '../Components/EditModal';
import TodoItem from '../Components/TodoItem/TodoItem';
import {todoInitList} from '../Constants/Constants';
import {getThemeMode} from '../Redux/themeMode/selectors';

function HomePageView(props) {
  const bottomSheetRef = useRef(null);

  const [pendingTodoList, setPendingTodoList] = useState([]);

  const [current20StartIdx, setCurrent20StartIdx] = useState(0);

  const [completedTodoList, setCompletedTodoList] = useState([]);

  const [editTodo, setEditTodo] = useState(null);

  const [loadingData, setLoadingData] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);

  const themeMode = useSelector(getThemeMode);

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
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const value = await AsyncStorage.multiGet([
        'completedList',
        'pendingList',
      ]);
      if (value !== null) {
        // value previously stored
        const completedList = JSON.parse(value[0][1]);
        const pendingList = JSON.parse(value[1][1]);

        setPendingTodoList(pendingList);
        setCompletedTodoList(completedList);
      }
    } catch (e) {
      // loading error
      console.error('Error while getting TODODATA: ', e);
    }
    setLoadingData(false);
  };

  const saveData = async ({completedList, pendingList}) => {
    try {
      let arrayToSet = [];
      if (completedList) {
        const completedListStringified = JSON.stringify(completedList);
        arrayToSet.push(['completedList', completedListStringified]);
      }
      if (pendingList) {
        const pendingListStringified = JSON.stringify(pendingList);
        arrayToSet.push(['pendingList', pendingListStringified]);
      }
      await AsyncStorage.multiSet(arrayToSet);
    } catch (e) {
      console.error(
        'Error during setting TodoData: ',
        JSON.stringify(e, null, 2),
      );
    }
  };

  const onClearCompletedTodoListPressed = () => {
    AsyncStorage.setItem('completedList', JSON.stringify([]), () => {
      console.log('cleared');
      loadData();
    });
  };

  const onDeleteTodoHandler = useCallback(
    todoId => {
      'worklet';
      const filteredList = pendingTodoList.filter(item => item.id !== todoId);
      runOnJS(setPendingTodoList)([...filteredList]);
      runOnJS(saveData)({
        pendingList: [...filteredList],
      });
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
      let completedList = [];
      if (completedTodoList && completedTodoList.length > 0) {
        completedList = [...completedTodoList] ?? [];
        completedList.unshift(todo);
      } else {
        completedList = [todo];
      }
      let pendingList = [];
      if (pendingTodoList && pendingTodoList.length > 0) {
        pendingList = [...pendingTodoList].filter(item => item.id !== todo.id);
      }
      setTimeout(() => {
        setPendingTodoList(pendingList);
        setCompletedTodoList(completedList);
      }, 50);
      saveData({
        pendingList,
        completedList,
      });
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
      if (pendingTodoList && pendingTodoList.length > 0) {
        const pendingList = [...pendingTodoList, newTodo];
        setPendingTodoList(pendingList);
        saveData({pendingList});
      } else {
        setPendingTodoList([newTodo]);
        saveData({pendingList: [newTodo]});
      }
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
    saveData({pendingList: newTodoList});
  };

  const renderCompletedList = () => {
    return (
      <View style={styles.completedSectionContainerStyle}>
        <View style={styles.completedHeaderAndTouchableStyle}>
          <Text style={styles.sectionHeaderTextStyle}>COMPLETED</Text>
          {completedTodoList && completedTodoList.length !== 0 && (
            <TouchableOpacity
              style={styles.clearAllTouchableStyle}
              onPress={onClearCompletedTodoListPressed}>
              <Text style={styles.sectionHeaderTextStyle}>CLEAR ALL</Text>
            </TouchableOpacity>
          )}
        </View>
        {completedTodoList && completedTodoList.length !== 0 ? (
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

  return (
    <GestureHandlerRootView style={styles.rootContainerStyle}>
      <SafeAreaView style={styles.rootContainerStyle}>
        <View style={styles.toggleViewContainerStyle}>
          <DarkAndLightModeToggle />
        </View>
        {loadingData ? (
          <View style={styles.loadingTextContainerStyle}>
            <ActivityIndicator
              color={'orange'}
              size={'large'}
              animating={loadingData}
            />
            <Text style={styles.loadingTextStyle}>LOADING</Text>
            <Text style={styles.loadingTextStyle}>Please wait!</Text>
          </View>
        ) : (
          <View
            style={[
              styles.inProgressSectionContainerStyle,
              {
                ...(themeMode === 'dark'
                  ? {backgroundColor: '#111'}
                  : {backgroundColor: '#888'}),
              },
            ]}>
            <Text style={styles.sectionHeaderTextStyle}>IN PROGRESS</Text>
            {(pendingTodoList && pendingTodoList.length !== 0) ||
            (completedTodoList && completedTodoList.length !== 0) ? (
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
            onSuccessCB={onSuccessfulTodoEdit}
          />
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  clearAllTouchableStyle: {
    backgroundColor: '#777',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  completedHeaderAndTouchableStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

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
    padding: 8,
    marginBottom: 72,
  },

  loadingTextContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingTextStyle: {
    fontSize: 20,
    fontWeight: '700',
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

  toggleViewContainerStyle: {
    height: 60,
  },
});

export default connect()(HomePageView);
