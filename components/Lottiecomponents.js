import React from "react";
//lottie animmation
import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";

const Lottiecomponents = (props) => {
  return (
    <LottieView
      autoPlay
      loop
      resizeMode="cover"
      source={require("../assets/lotties/Burger_and_hot_dog.json")}
      style={styles.lottie}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  lottie: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
});

export default Lottiecomponents;
