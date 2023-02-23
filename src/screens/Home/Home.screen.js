import { SafeAreaView, View } from "react-native";
import React, { useCallback, useState } from "react";
import Styles from "./style";
import Button from "../../components/UI/Button/Button.component";
import TodoList from "../../components/TodoList/TodoList.component";
import TodoInput from "../../components/TodoInput/index";

const Home = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const todoListHandler = useCallback(() => {
    setTodoList((prevTodoList) => [...prevTodoList, todo]);
  }, [todo]);

  const deleteTodoHandler = useCallback((id) => {
    setTodoList((prevTodoList) => {
      return prevTodoList.filter((item, index) => index !== id);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={Styles.container}>
        <TodoInput todo={todo} setTodo={setTodo} />
        <TodoList todoData={todoList} deleteTodo={deleteTodoHandler} />
        <Button
          title="Add"
          style={{ marginHorizontal: 12 }}
          onPress={todoListHandler}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
