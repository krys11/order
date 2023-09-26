import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
//AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";
//navigation
import { useNavigation } from "@react-navigation/native";
//firebase function
import { onLogin } from "../../firebase/Firebase";
//components
import TextinputComponent from "../../components/TextinputComponent";
//img
import imgLogoDefault from "../../img/logo_default.jpeg";
//Toast
import Toast from "react-native-toast-message";
//Color
import { Colors } from "../../constant/Colors";
//screen
import Screenloader from "../screenLoader/Screenloader";
//context
import { MyContext } from "../../context/MyContext";
import { getUserData } from "../../firebase/Firebase";

const Login = () => {
  const { setDataLogin, setUserUID } = useContext(MyContext);
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

  const saveUserUIDLocal = async (useruid) => {
    try {
      await AsyncStorage.setItem("userUid", useruid);
    } catch (error) {
      console.log("AsynLogin::::::", error);
    }
  };

  const userLogin = async () => {
    let er;
    Keyboard.dismiss();
    setActivityIndicator(true);
    setDisableTouchable(true);

    try {
      const UserCredential = await onLogin(email, password);
      if (UserCredential) {
        try {
          await saveUserUIDLocal(UserCredential.user.uid);
          try {
            const dataCheck = await getUserData(UserCredential.user.uid);
            console.log("Login:::: ", UserCredential);
            setDataLogin(dataCheck.data());
            setActivityIndicator(false);
            setDisableTouchable(true);
            cleanVariable();
            showToastSuccess();
          } catch (error) {
            console.log("LoginErrorgetUserData:::::::::", error);
          }
        } catch (error) {
          console.log("LoginErrorAsyncSave::::::::", error);
        }
      }
    } catch (error) {
      setActivityIndicator(false);
      setDisableTouchable(false);
      console.log(error.code);
      if (error.code === "auth/wrong-password") {
        er = "Mot de passe incorrect";
        setErrMsg(er);
      } else if (error.code === "auth/user-not-found") {
        er = "Utilisateur introuvable";
        setErrMsg(er);
      } else if (error.code === "auth/invalid-email") {
        er = "Email incorrect";
        setErrMsg(er);
      } else if (error.code === "auth/too-many-requests") {
        er = "Patienter un peu, serveur occuper";
        setErrMsg(er);
      } else if (error.code === "auth/network-request-failed") {
        er = "Vérifier votre connexion internet";
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
        <View style={styles.viewLogin}>
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

                  <TextinputComponent
                    value={email}
                    placeholder="Email"
                    setValue={setEmail}
                  />
                </View>
                <View>
                  <Text style={[styles.textColorWhite, styles.textMargin]}>
                    Mot de passe
                  </Text>

                  <TextinputComponent
                    value={password}
                    placeholder="Mot de passe"
                    setValue={setPassword}
                    secureTextEntry={true}
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
            <View style={styles.footerRegsiter}>
              <Text style={styles.textColorWhite}>
                Vous n'avez pas de compte ?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.textColorRed}>Creer un compte</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Forgotpassword")}
              style={styles.footerPassword}
            >
              <Text style={styles.textColorWhite}>Mot de passe oublier</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colorBlack,
  },
  viewLogin: {
    flex: 1,
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
  btnConnect: {
    backgroundColor: Colors.colorRed,
    height: 35,
    width: 300,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    alignItems: "center",
    position: "relative",
    bottom: 35,
  },
  footerRegsiter: {
    flexDirection: "row",
    marginBottom: 20,
  },
});

export default Login;
