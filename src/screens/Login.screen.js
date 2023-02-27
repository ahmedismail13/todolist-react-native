import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Button from "../components/UI/Button/Button.component";
import { UserContext } from "../context/user.context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const userData = {
    id: 1,
    name: "Ahmed Ismail",
    email: "ahmed.ismail@timestack.com",
  };

  const handleLogin = async () => {
    if (username === "Admin" && password === "123") {
      setUser(userData);
      await setUserInStorage(userData);
    }
  };

  const setUserInStorage = async (currentUser) => {
    try {
      await AsyncStorage.setItem("currentUser", JSON.stringify(currentUser));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.content}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View style={styles.inputView}>
          <Text style={{ fontSize: 20 }}>Username</Text>
          <TextInput
            value={null}
            style={styles.textInput}
            placeholder="Username"
            onChangeText={(username) => setUsername(username)}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={{ fontSize: 20 }}>Password</Text>
          <TextInput
            secureTextEntry
            value={null}
            style={styles.textInput}
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <Button title="Add" onPress={handleLogin} />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: 40,
    width: "70%",
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 12,
    borderColor: "rgba(0,0,0,0.2)",
  },
  inputView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    paddingBottom: 10,
  },
});
