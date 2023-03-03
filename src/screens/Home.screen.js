import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import React, { useCallback, useContext, useState } from "react";
import Button from "../components/UI/Button/Button.component";
import TodoList from "../components/TodoList/TodoList.component";
import TodoInput from "../components/TodoInput/index";
import { TodoListContext } from "../context/todolist.context";

const Home = () => {
  const { todoList, deleteTodoItem, completeTodoItem, editTodoItem } =
    useContext(TodoListContext);

  const deleteTodoHandler = useCallback((id) => {
    deleteTodoItem(id);
  }, []);

  const completeTodoHandler = useCallback((id) => {
    completeTodoItem(id);
  }, []);

  const updateTodoHandler = useCallback((id, title) => {
    editTodoItem(id, title);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={Styles.container}>
        <TodoInput />
        {/* todo={todo} setTodo={setTodo}  */}
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
        {/* <Button
          title="Add"
          style={{ marginHorizontal: 12 }}
          onPress={todoListHandler}
        /> */}
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
