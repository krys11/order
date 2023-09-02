import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { onLogin } from "../../firebase/Firebase";

//img
import imgLogoDefault from "../../img/logo_default.jpeg";

//Toast
import Toast from "react-native-toast-message";

//Color
import { Colors } from "../../constant/Colors";

const Login = () => {
  //variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [disableTouchable, setDisableTouchable] = useState();

  //vider les champs
  const cleanVariable = () => {
    setEmail(""), setPassword("");
  };

  //navigation
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

  //notification
  const showToastError = (msg) => {
    Toast.show({
      type: "error",
      text1: msg + " 👋",
      position: "top",
      visibilityTime: 5000,
    });
  };

  const userLogin = async () => {
    let er;
    Keyboard.dismiss();
    setActivityIndicator(true);
    setDisableTouchable(true);

    try {
      const UserCredential = await onLogin(email, password);
      if (UserCredential) {
        cleanVariable();
        console.log("Login:::: ", UserCredential);
        showToastSuccess();
      }
    } catch (error) {
      setActivityIndicator(false);
      setDisableTouchable(false);
      console.log(error.code);
      if (error.code === "auth/wrong-password") {
        er = "Mot de passe incorrect";
        setErrMsg(er);
      } else if (error.code === "auth/invalid-email") {
        er = "Email incorrect";
        setErrMsg(er);
      } else if (error.code === "auth/too-many-requests") {
        er = "Patienter un peu, serveur occuper";
        setErrMsg(er);
      }
    }
  };

  //useEffect
  useEffect(() => {
    if (email.length != 0 && password.length) {
      setDisableTouchable(false);
    } else {
      setDisableTouchable(true);
    }
  }, [email, password]);

  useEffect(() => {
    if (errMsg !== "") {
      showToastError(errMsg);
    }
    setErrMsg("");
  }, [errMsg]);

  const btnLogin = !activityIndicator ? (
    <Text style={[styles.textColorWhite, styles.textBold]}>Se connecter</Text>
  ) : (
    <ActivityIndicator animated={activityIndicator} color={Colors.colorWhite} />
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Toast />
        <View style={styles.viewImage}>
          <Image source={imgLogoDefault} style={styles.imgLogo} />
        </View>
        <KeyboardAvoidingView behavior="position">
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
                  secureTextEntry
                  onChangeText={(txt) => setPassword(txt)}
                  style={styles.inputZone}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.btnConnect}
              onPress={userLogin}
              disabled={disableTouchable}
            >
              {btnLogin}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <Text style={styles.textColorWhite}>
            Vous n'avez pas de compte ?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.textColorRed}>Creer un compte</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Forgotpassword")}>
          <Text style={styles.textColorWhite}>Mot de passe oublier</Text>
        </TouchableOpacity>
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
  viewImage: {
    justifyContent: "center",
    alignItems: "center",
  },
  imgLogo: {
    height: 150,
    width: 150,
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
