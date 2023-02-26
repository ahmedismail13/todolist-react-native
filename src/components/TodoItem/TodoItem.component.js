import { Text, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

const TodoItem = (props) => {
  const { id, title, isComplete, completeTodo, deleteTodo, updateTodo } = props;
  const imageUrl = isComplete
    ? require("../../../assets/checkmark_complete.png")
    : require("../../../assets/checkmark_incomplete.png");

  const [isEditable, setIsEditable] = useState(false);

  const editTextHandler = () => {
    setIsEditable((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <TextInput
        editable={isEditable}
        onPressIn={editTextHandler}
        onSubmitEditing={editTextHandler}
        value={title}
        onChangeText={(title) => updateTodo(id, title)}
      />
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          onPress={() => completeTodo(id)}
          style={{ marginRight: 5 }}
        >
          <Image style={{ width: 32, height: 32 }} source={imageUrl} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTodo(id)}>
          <Image
            style={{ width: 32, height: 32 }}
            source={require("../../../assets/trash.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgpa(255,0,0,0.2)",
    flexDirection: "row",
    paddingHorizontal: 18,
  },
  iconsContainer: {
    flexDirection: "row",
  },
});

export default TodoItem;
