import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Button from "../components/UI/Button/Button.component";
import TodoList from "../components/TodoList/TodoList.component";
import TodoInput from "../components/TodoInput/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const todoListHandler = useCallback(() => {
    setTodoList((prevTodoList) => [
      ...prevTodoList,
      { id: prevTodoList.length, title: todo, isComplete: false },
    ]);
    setTodo("");
  }, [todo]);

  const deleteTodoHandler = useCallback((id) => {
    setTodoList((prevTodoList) => {
      return prevTodoList.filter((item) => item.id !== id);
    });
  }, []);

  const completeTodoHandler = useCallback((id) => {
    setTodoList((prevTodoList) => {
      return prevTodoList.map((item, index) => {
        if (item.id === id) item.isComplete = !item.isComplete;
        return item;
      });
    });
  }, []);

  const updateTodoHandler = useCallback((id, title) => {
    setTodoList((prevTodoList) => {
      return prevTodoList.map((item, index) => {
        if (item.id === id) item.title = title;
        return item;
      });
    });
  }, []);

  const saveTodoListToStorage = async () => {
    try {
      await AsyncStorage.setItem("todoList", JSON.stringify(todoList));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      saveTodoListToStorage();
    } catch (error) {
      console.log(error);
    }
  }, [todoList]);

  const getTodoListFromStorage = async () => {
    try {
      const todoList = await AsyncStorage.getItem("todoList");
      if (todoList !== null) {
        setTodoList(JSON.parse(todoList));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    getTodoListFromStorage();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={Styles.container}>
        <TodoInput todo={todo} setTodo={setTodo} />
        <View style={Styles.statsView}>
          <Text>
            Complete:{" "}
            {todoList.reduce((acc, cur) => acc + (cur.isComplete ? 1 : 0), 0)}
          </Text>
          <Text>|</Text>
          <Text>
            Incomplete:{" "}
            {todoList.reduce((acc, cur) => acc + (cur.isComplete ? 0 : 1), 0)}
          </Text>
        </View>
        <TodoList
          todoData={todoList}
          deleteTodo={deleteTodoHandler}
          completeTodo={completeTodoHandler}
          updateTodo={updateTodoHandler}
        />
        <Button
          title="Add"
          style={{ marginHorizontal: 12 }}
          onPress={todoListHandler}
        />
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statsView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default Home;
