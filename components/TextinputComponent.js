import { TextInput, StyleSheet } from "react-native";
import React from "react";

//Colors
import { Colors } from "../constant/Colors";

const TextinputComponent = (props) => {
  return (
    <TextInput
      {...props}
      value={props.value}
      placeholder={props.placeholder}
      onChangeText={(txt) => props.setValue(txt)}
      style={{ ...styles.inputZone, ...props.style }}
    />
  );
};

const styles = StyleSheet.create({
  inputZone: {
    backgroundColor: Colors.colorWhite,
    height: 40,
    width: 300,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.colorBlack,
  },
});

export default TextinputComponent;
