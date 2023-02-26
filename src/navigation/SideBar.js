import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React, { useContext } from "react";
import { UserContext } from "../context/user.context";
import { SafeAreaView } from "react-native-safe-area-context";

const SideBar = (props) => {
  const { user, setUser } = useContext(UserContext);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{ height: 64, width: 64, borderRadius: 48, marginLeft: 10 }}
          source={require("../../assets/ismail.jpg")}
        />
        <View style={{ marginLeft: 10, justifyContent: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{user.name}</Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              textTransform: "capitalize",
            }}
          >
            {user.email.split("@")[1].split(".")[0]}
          </Text>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          icon={() => (
            <Image
              style={{ width: 25, aspectRatio: 1 }}
              source={require("../../assets/home.png")}
            />
          )}
          label="Home"
          onPress={() => props.navigation.navigate("Home")}
        />
        <DrawerItem
          icon={() => (
            <Image
              style={{ width: 25, aspectRatio: 1 }}
              source={require("../../assets/profile.png")}
            />
          )}
          label="Profile"
          onPress={() => props.navigation.navigate("Profile")}
        />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() => {
          setUser(null);
        }}
      >
        <Image
          style={{ height: 25, width: 25, marginLeft: 10 }}
          source={require("../../assets/logout.png")}
        />
        <View style={{ marginLeft: 10, justifyContent: "center" }}>
          <Text style={{ fontSize: 14, color: "gray", fontWeight: "600" }}>
            Sign out
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SideBar;

const styles = StyleSheet.create({});
