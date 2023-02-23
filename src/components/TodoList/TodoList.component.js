import { FlatList, StyleSheet, Text, View } from "react-native";
import { useCallback, useState } from "react";
import TodoItem from "../TodoItem/TodoItem.component";

const TodoList = (props) => {
  const { todoData, deleteTodo } = props;

  const renderItem = useCallback(({ item, index }) => {
    return <TodoItem title={item} id={index} deleteTodo={deleteTodo} />;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={todoData}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
        style={{ flex: 1, paddingHorizontal: 12 }}
      />
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({});
