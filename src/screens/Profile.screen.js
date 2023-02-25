import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/UI/Button/Button.component";
import { UserContext } from "../context/user.context";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View>
        {Object.keys(user).map((key, index) => {
          return (
            <Text key={index}>
              {key} : {user[key]}
            </Text>
          );
        })}
      </View>
      <Button
        title="Logout"
        style={{
          width: "95%",
        }}
        onPress={() => {
          setUser(null);
        }}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
