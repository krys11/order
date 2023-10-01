import { StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { Colors } from "../constant/Colors";

const Btncomponents = (props) => {
  return (
    <Button
      icon="lock-outline"
      mode="contained"
      style={{ ...styles.btnstyle, ...props.style }}
      onPress={props.onPress}
      buttonColor={Colors.colorBlack}
      {...props}
    >
      {props.children}
    </Button>
  );
};

const styles = StyleSheet.create({
  btnstyle: {
    width: 150,
    height: 50,
    justifyContent: "center",
  },
});

export default Btncomponents;
