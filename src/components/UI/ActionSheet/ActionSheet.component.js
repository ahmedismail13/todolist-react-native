import { StyleSheet, View, TextInput } from "react-native";
import { useContext, useState } from "react";
import Button from "../Button/Button.component";
import { TodoListContext } from "../../../context/todolist.context";
import ActionSheet, { registerSheet } from "react-native-actions-sheet";

const ActionSheetModal = (props) => {
  const { todo, setTodo, addTodoItem } = props.payload;
  const [inputValue, setInputValue] = useState(todo);
  return (
    <ActionSheet id={props.sheetId}>
      <View style={{ width: "100%", marginVertical: 14 }}>
        <TextInput
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          style={{
            height: 40,
            borderRadius: 6,
            borderWidth: 1,
            paddingHorizontal: 12,
            borderColor: "rgba(0,0,0,0.2)",
            marginHorizontal: 12,
          }}
          placeholder="Please enter your Todo"
        />
        <Button
          title="Add"
          style={{ marginHorizontal: 12 }}
          onPress={() => {
            addTodoItem(inputValue);
            setTodo("");
            setInputValue("");
          }}
        />
      </View>
    </ActionSheet>
  );
};

registerSheet("action-sheet", ActionSheetModal);

const styles = StyleSheet.create({});

export {};
