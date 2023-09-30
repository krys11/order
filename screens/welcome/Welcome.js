import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { MyContext } from "../../context/MyContext";
import { Button } from "react-native-paper";
//lottie animmation
import LottieView from "lottie-react-native";
//colors
import { Colors } from "../../constant/Colors";

const Welcome = () => {
  const navigation = useNavigation();
  const { isAuth, setIsAuth, data } = useContext(MyContext);

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
          style={[styles.marges, styles.largeur]}
          onPress={() => navigation.navigate("Login")}
        >
          Se connecter
        </Button>
        <Button
          icon="lock-outline"
          mode="contained"
          buttonColor={Colors.colorBlack}
          style={styles.largeur}
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
  largeur: {
    width: 150,
    height: 45,
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
