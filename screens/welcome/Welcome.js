import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { MyContext } from "../../context/MyContext";
import { Button } from "react-native-paper";

//img background
import imgBackground from "../../assets/img/background2.jpg";

//lottie animmation
import LottieView from "lottie-react-native";

//colors
import { Colors } from "../../constant/Colors";

const Welcome = () => {
  const navigation = useNavigation();
  const { isAuth, setIsAuth, data } = useContext(MyContext);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={imgBackground}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.content}>
          <View style={styles.lottieView}>
            <LottieView
              autoPlay
              loop
              resizeMode="cover"
              // Find more Lottie files at https://lottiefiles.com/featured
              source={require("../../assets/lotties/Burger_and_hot_dog.json")}
              style={styles.lottie}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.appName}>App Name</Text>
            <Button
              icon="lock-outline"
              mode="contained"
              buttonColor={Colors.colorBlack}
              style={[styles.marges, styles.largeur]}
            >
              Se connecter
            </Button>
            <Button
              icon="lock-outline"
              mode="contained"
              buttonColor={Colors.colorBlack}
              style={styles.largeur}
            >
              S'enregistrer
            </Button>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  content: {
    height: "100%",
    width: "100%",
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  lottieView: {
    width: "50%",
    height: "20%",
    position: "absolute",
    top: 10,
  },
  section: {
    width: 200,
    height: 200,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  largeur: {
    width: 150,
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
