import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Styles from "./style";

const TodoItem = (props) => {
  const { title, id, deleteTodo } = props;
  return (
    <TouchableOpacity style={Styles.container} onPress={() => deleteTodo(id)}>
      <Text>{title + id}</Text>
    </TouchableOpacity>
  );
};

export default TodoItem;
