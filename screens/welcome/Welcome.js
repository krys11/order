import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
//lottie animmation
import LottieView from "lottie-react-native";
//colors
import { Colors } from "../../constant/Colors";
import { Button } from "react-native-paper";

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop
        resizeMode="cover"
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../assets/lotties/Burger_and_hot_dog.json")}
        style={styles.lottie}
      />

      <View style={styles.section}>
        <Text style={styles.appName}>App Name</Text>
        <Button
          icon="lock-outline"
          mode="contained"
          buttonColor={Colors.colorBlack}
          style={[styles.marges, styles.btnstyle]}
          onPress={() => navigation.navigate("Login")}
          onLongPress={() => navigation.navigate("Loginadmin")}
        >
          Se connecter
        </Button>
        <Button
          icon="lock-outline"
          mode="contained"
          buttonColor={Colors.colorBlack}
          style={styles.btnstyle}
          onPress={() => navigation.navigate("Register")}
        >
          S'enregistrer
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  section: {
    width: 250,
    height: 250,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  btnstyle: {
    width: 150,
    height: 50,
    justifyContent: "center",
  },
  marges: {
    marginBottom: 10,
  },
  appName: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.colorBlack,
    marginBottom: 20,
  },
});

export default Welcome;
