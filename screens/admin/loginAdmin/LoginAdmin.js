import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Keyboard, Text } from "react-native";
//firebase function
import { onLogin } from "../../../firebase/Firebase";
//components
import Lottiecomponents from "../../../components/Lottiecomponents";
import TextinputComponent from "../../../components/TextinputComponent";
import Btncomponents from "../../../components/Btncomponents";
import Activityindicatorcomponent from "../../../components/Activityindicatorcomponent";
import IconComponent from "../../../components/IconComponent";
import {
  ToastConfig,
  showToastError,
} from "../../../components/Toastcomponent";
//Color
import { Colors } from "../../../constant/Colors";
//context
import { MyContext } from "../../../context/MyContext";
//globale styles
import { GlobaleStyles } from "../../../globaleStyles/GlobaleStyles";
//KeyboardAwareScrollView
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LoginAdmin = () => {
  const { valueAdmin } = useContext(MyContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [activityIndicator, setActivityIndicator] = useState(false);

  //vider les champs
  const cleanVariable = () => {
    setEmail(""), setPassword("");
  };

  //function login
  const adminLogin = async () => {
    let er;
    Keyboard.dismiss();
    setActivityIndicator(true);

    if (email.length != 0 && password.length) {
      try {
        const UserCredential = await onLogin(email.trim(), password);
        // console.log(UserCredential);
        setActivityIndicator(false);
        try {
          await valueAdmin.authenticate(UserCredential?.user?.uid);
          cleanVariable();
        } catch (error) {
          setActivityIndicator(false);
          console.log("loginAdminError2::::", error);
        }
      } catch (error) {
        setActivityIndicator(false);

        console.log("LoginAdminError1::::", error);

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
    <Btncomponents onPress={adminLogin}>Se connecter </Btncomponents>
  );

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <Lottiecomponents />
      <View style={{ marginVertical: 200 }}>
        <View style={GlobaleStyles.container}>
          <Text
            style={{
              color: Colors.colorBlack,
              fontSize: 25,
              fontWeight: "bold",
            }}
          >
            ADMIN LOGIN
          </Text>

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
          </View>
          <IconComponent />
        </View>
      </View>
      <ToastConfig />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({});

export default LoginAdmin;
