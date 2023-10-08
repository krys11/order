import { StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

//Colors
import { Colors } from "../constant/Colors";

const TextinputComponent = (props) => {
  return (
    <TextInput
      {...props}
      label={props.label}
      value={props.value}
      onChangeText={(text) => props.setValue(text)}
      mode="flat"
      style={{ ...styles.textinput, ...props.styles }}
      underlineColor={Colors.colorWhite}
      activeUnderlineColor={Colors.colorBlack}
    />
  );
};

const styles = StyleSheet.create({
  textinput: {
    width: "90%",
    marginBottom: 10,
    backgroundColor: Colors.colorWhite,
    textAlign: "center",
  },
});

export default TextinputComponent;
