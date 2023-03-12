import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import React, { useCallback, useContext, useMemo } from "react";
import TodoList from "../components/TodoList/TodoList.component";
import TodoInput from "../components/TodoInput/index";
import { TodoListContext } from "../context/todolist.context";

const Home = () => {
  const { todoList, deleteTodoItem, completeTodoItem, editTodoItem } =
    useContext(TodoListContext);

  const todoData = useMemo(() => {
    return todoList.reduce((acc, cur) => {
      if (!cur.isComplete) acc.unshift(cur);
      else acc.push(cur);
      return acc;
    }, []);
  }, [todoList]);

  const deleteTodoHandler = useCallback((id) => {
    deleteTodoItem(id);
  }, []);

  const completeTodoHandler = useCallback((id) => {
    completeTodoItem(id);
  }, []);

  const updateTodoHandler = useCallback((id, title) => {
    editTodoItem(id, title);
  }, []);

  const completedTodoCount = useMemo(() => {
    return todoList.reduce((acc, cur) => acc + (cur.isComplete ? 1 : 0), 0);
  }, [todoList]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={Styles.container}>
        <TodoInput />
        <View style={Styles.statsView}>
          <Text>Complete: {completedTodoCount}</Text>
          <Text>|</Text>
          <Text>Incomplete: {todoList.length - completedTodoCount}</Text>
        </View>
        <TodoList
          todoData={todoData}
          deleteTodo={deleteTodoHandler}
          completeTodo={completeTodoHandler}
          updateTodo={updateTodoHandler}
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
