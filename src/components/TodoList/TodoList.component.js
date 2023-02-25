import { FlatList, StyleSheet, Text, View } from "react-native";
import { useCallback, useState } from "react";
import TodoItem from "../TodoItem/TodoItem.component";

const TodoList = (props) => {
  const { todoData, deleteTodo, completeTodo, updateTodo } = props;

  const renderItem = useCallback(({ item, index }) => {
    return (
      <TodoItem
        id={item.id}
        title={item.title}
        isComplete={item.isComplete}
        deleteTodo={deleteTodo}
        completeTodo={completeTodo}
        updateTodo={updateTodo}
      />
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={todoData.reduce((acc, cur) => {
          if (!cur.isComplete) acc.unshift(cur);
          else acc.push(cur);
          return acc;
        }, [])}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
        style={{ flex: 1, paddingHorizontal: 12 }}
      />
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({});
