import { StyleSheet, TextInput, Text, View } from "react-native";
import React from "react";

const index = (props) => {
  const { todo, setTodo } = props;
  return (
    <View
      style={{
        flex: 0.1,
        justifyContent: "center",
        paddingHorizontal: 12,
      }}
    >
      <TextInput
        value={todo}
        onChangeText={(text) => setTodo(text)}
        style={{
          borderRadius: 6,
          borderWidth: 1,
          flex: 0.7,
          paddingHorizontal: 12,
          borderColor: "rgba(0,0,0,0.2)",
        }}
        placeholder="Please enter your Todo"
      />
    </View>
  );
};

export default index;
