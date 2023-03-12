import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {} from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import { TodoListContext } from "../context/todolist.context";
import { SheetManager } from "react-native-actions-sheet";

const TabBar = (props) => {
  const { todo, setTodo, addTodoItem } = useContext(TodoListContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => props.navigation.navigate("Home")}
      >
        <Image
          style={{ height: 25, aspectRatio: 1 }}
          source={require("../../assets/home.png")}
        />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          //Profile screen
          if (props.state.index === 0) {
            addTodoItem(todo);
            setTodo("");
          } else {
            SheetManager.show("action-sheet", {
              payload: {
                todo,
                setTodo,
                addTodoItem,
              },
            });
          }
        }}
      >
        <View style={styles.buttonView}>
          <Text style={styles.button}>+</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          props.navigation.toggleDrawer();
        }}
      >
        <Image
          style={{ height: 25, aspectRatio: 1 }}
          source={require("../../assets/profile.png")}
        />
        <Text>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonView: {
    width: 60,
    height: 60,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    bottom: 0,
    backgroundColor: "white",
  },
  button: {
    fontSize: 60,
    justifyContent: "center",
    alignItems: "center",
    top: -10,
  },
});
