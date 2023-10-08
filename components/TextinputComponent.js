import { KeyboardAvoidingView, StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

//Colors
import { Colors } from "../constant/Colors";

const TextinputComponent = (props) => {
  return (
    <KeyboardAvoidingView
      behavior="position"
      style={{
        width: "90%",
      }}
    >
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  textinput: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: Colors.colorWhite,
  },
});

export default TextinputComponent;
