import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Button = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        {
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255,0,0,0.4)",
          borderRadius: 14,
          marginVertical: 12,
        },
        props.style,
      ]}
    >
      <Text style={{ color: "white", fontSize: 18 }}>{props?.title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
