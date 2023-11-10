import { StyleSheet, Text, View } from "react-native";
import React from "react";
//colors
import { Colors } from "../../constant/Colors";
//component
import Lottiecomponents from "../../components/Lottiecomponents";

const Screenloader = () => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Text style={styles.textchargment}>Patientez...</Text>
      <Lottiecomponents
        source={require("../../assets/lotties/food_loading.json")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textchargment: {
    color: Colors.colorBlack,
    marginBottom: 10,
    fontSize: 20,
  },
});

export default Screenloader;
