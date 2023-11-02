import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Text,
} from "react-native";
//AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";
//navigation
import { useNavigation } from "@react-navigation/native";
//firebase function
import { onLogin } from "../../firebase/Firebase";
//components
import Lottiecomponents from "../../components/Lottiecomponents";
import TextinputComponent from "../../components/TextinputComponent";
import Btncomponents from "../../components/Btncomponents";
import Activityindicatorcomponent from "../../components/Activityindicatorcomponent";
import IconComponent from "../../components/IconComponent";
import { ToastConfig, showToastError } from "../../components/Toastcomponent";
//Color
import { Colors } from "../../constant/Colors";
//context
import { MyContext } from "../../context/MyContext";
//globale styles
import { GlobaleStyles } from "../../globaleStyles/GlobaleStyles";
//KeyboardAwareScrollView
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Login = () => {
  const { valueUser } = useContext(MyContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [activityIndicator, setActivityIndicator] = useState(false);

  //vider les champs
  const cleanVariable = () => {
    setEmail(""), setPassword("");
  };

  //navigation
  const navigation = useNavigation();

  //save user UID LOCAL
  const saveUserUIDLocal = async (data) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(data));
    } catch (error) {
      console.log("AsynLogin::::::", error);
    }
  };

  //function login
  const userLogin = async () => {
    let er;
    Keyboard.dismiss();
    setActivityIndicator(true);

    if (email.length != 0 && password.length) {
      try {
        const UserCredential = await onLogin(email.trim(), password);

        try {
          await valueUser.authenticate(UserCredential?.user?.uid);
          cleanVariable();
          setActivityIndicator(false);
        } catch (error) {
          setActivityIndicator(false);
          console.log("loginError2::::", error);
        }
      } catch (error) {
        setActivityIndicator(false);

        console.log("LoginError1::::", error.code);

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
        } else if (error.code === "ERR_BAD_REQUEST") {
          er = "Vérifiez vos informations de connexion svp";
          setErrMsg(er);
        }
      }
    } else {
      setActivityIndicator(false);
      er = "Veillez remplire les deux champs";
      setErrMsg(er);
    }
  };

  //useEffect
  useEffect(() => {
    if (errMsg !== "") {
      showToastError(errMsg);
    }
    setErrMsg("");
  }, [errMsg]);

  //btnSeConnecter
  const btnSeConnecter = activityIndicator ? (
    <Activityindicatorcomponent />
  ) : (
    <Btncomponents onPress={userLogin}>Se connecter </Btncomponents>
  );

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <Lottiecomponents />
      <View style={{ marginVertical: 200 }}>
        <View style={GlobaleStyles.container}>
          <View style={[GlobaleStyles.section, { height: 250 }]}>
            <TextinputComponent
              label="Email"
              value={email}
              setValue={setEmail}
            />
            <TextinputComponent
              label="Mot de passe"
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
            />
            {btnSeConnecter}
            <TouchableOpacity
              onPress={() => navigation.navigate("Forgetpassword")}
            >
              <Text style={{ color: Colors.colorWhite, marginTop: 10 }}>
                Mot de Passe Oublié
              </Text>
            </TouchableOpacity>
          </View>
          <Btncomponents
            onPress={() => navigation.navigate("Register")}
            style={GlobaleStyles.btncustom}
            mode="contained-tonal"
          >
            S'inscrire
          </Btncomponents>
          <IconComponent />
        </View>
      </View>
      <ToastConfig />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({});

export default Login;
