import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { onLogin } from "../../firebase/Firebase";

//img
import imgLogoDefault from "../../img/logo_default.jpeg";

//Toast
import Toast from "react-native-toast-message";

//Context
import { MyContext } from "../../context/MyContext";
import { Colors } from "../../constant/Colors";

const Login = () => {
  //variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [desable, setDesable] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const { auth, setChangeStat } = useContext(MyContext);
  const navigation = useNavigation();

  //Toast message
  const showToastSuccess = () => {
    Toast.show({
      type: "success",
      text1: "Hello",
      text2: "Connecter 👋",
      visibilityTime: 5000,
    });
  };

  const showToastError = (msg) => {
    Toast.show({
      type: "error",
      text1: msg + " 👋",
      position: "top",
      visibilityTime: 5000,
    });
  };

  const userLogin = async () => {
    try {
      const UserCredential = await onLogin(email, password);
      if (UserCredential) {
        console.log("Login:::: ", UserCredential);
        showToastSuccess();
      }
    } catch (error) {
      console.log(error.code);
      let er;
      if (error.code === "auth/wrong-password") {
        er = "Mot de passe incorrect";
        setErrMsg(er);
        //showToastError(errMsg);
      } else if (error.code === "auth/invalid-email") {
        er = "Email incorrect";
        setErrMsg(er);
        //showToastError(errMsg);
      } else if (error.code === "auth/too-many-requests") {
        er = "Patienter un peu, serveur occuper";
        setErrMsg(er);
        //showToastError(errMsg);
      }
    }
  };

  //useEffect
  useEffect(() => {
    if (email.length != 0 && password.length > 6) {
      setDesable(false);
    } else {
      setDesable(true);
    }
  }, [email, password]);

  useEffect(() => {
    if (errMsg !== "") {
      showToastError(errMsg);
    }
    setErrMsg("");
  }, [errMsg]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Toast />
        <View style={styles.viewImage}>
          <Text style={styles.textColorWhite}>Image</Text>
          <Image source={imgLogoDefault} style={styles.imgLogo} />
        </View>
        <View style={styles.containerZone}>
          <Text
            style={[
              styles.textColorWhite,
              styles.textBold,
              styles.textConnectionSize,
            ]}
          >
            Connexion
          </Text>
          <View>
            <View style={styles.inputViewMargin}>
              <Text style={[styles.textColorWhite, styles.textMargin]}>
                Email
              </Text>
              <TextInput
                placeholder="Email"
                onChangeText={(txt) => setEmail(txt)}
                style={styles.inputZone}
              />
            </View>
            <View>
              <Text style={[styles.textColorWhite, styles.textMargin]}>
                Mot de passe
              </Text>
              <TextInput
                placeholder="Mot de passe"
                onChangeText={(txt) => setPassword(txt)}
                style={styles.inputZone}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.btnConnect} onPress={userLogin}>
            <Text style={[styles.textColorWhite, styles.textBold]}>
              Se connecter
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.textColorWhite}>
            Vous n'avez pas de compte ?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.textColorRed}>Creer un compte</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: Colors.colorBlack,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  imgLogo: {
    height: 30,
    width: 30,
  },
  textColorWhite: {
    color: Colors.colorWhite,
  },
  textColorRed: {
    color: Colors.colorRed,
  },
  textBold: {
    fontWeight: "bold",
  },
  textConnectionSize: {
    fontSize: 30,
  },
  containerZone: {
    backgroundColor: Colors.colorBlackAlpha,
    width: 350,
    height: 300,
    alignItems: "center",
    justifyContent: "space-around",
  },
  inputViewMargin: {
    marginVertical: 20,
  },
  textMargin: {
    paddingBottom: 5,
  },
  inputZone: {
    backgroundColor: Colors.colorWhite,
    height: 40,
    width: 300,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  btnConnect: {
    backgroundColor: Colors.colorRed,
    height: 35,
    width: 300,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    //justifyContent: "center",
  },
});

export default Login;
