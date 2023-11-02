import { View, StyleSheet, Keyboard } from "react-native";
import React, { useState, useEffect } from "react";
//navigation
import { useNavigation } from "@react-navigation/native";
//firebase function
import { onResetPassword } from "../../firebase/Firebase";
//components
import TextinputComponent from "../../components/TextinputComponent";
import Btncomponents from "../../components/Btncomponents";
import Lottiecomponents from "../../components/Lottiecomponents";
import Activityindicatorcomponent from "../../components/Activityindicatorcomponent";
import IconComponent from "../../components/IconComponent";
import {
  ToastConfig,
  showToastError,
  showToastSuccess,
} from "../../components/Toastcomponent";
//globales styles
import { GlobaleStyles } from "../../globaleStyles/GlobaleStyles";
//KeyboardAwareScrollView
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ForgotPassword = () => {
  //variables
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [activityIndicator, setActivityIndicator] = useState(false);

  //vider les champs
  const cleanVariable = () => {
    setEmail("");
  };

  //function de reset mot de passe
  const userPasswordForget = async () => {
    let er;
    setActivityIndicator(true);
    Keyboard.dismiss();

    if (email.length !== 0) {
      try {
        await onResetPassword(email.trim());
        cleanVariable();
        showToastSuccess(
          "Email envoyer, Verifier votre boite de reception email 👋"
        );
        setActivityIndicator(false);
      } catch (error) {
        setActivityIndicator(false);
        console.log(error.code);
        if (error.code === "auth/invalid-email") {
          er = "Email incorrect";
          setErrMsg(er);
        } else if (error.code === "auth/user-not-found") {
          er = "Utilisateur Introuvable";
          setErrMsg(er);
        } else if (error.code === "auth/missing-email") {
          er = "Veillez remplir le champ d'Email";
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
      er = "Veillez remplire le champs Email";
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
  const btnMotDePasseOublier = activityIndicator ? (
    <Activityindicatorcomponent />
  ) : (
    <Btncomponents onPress={userPasswordForget}>Reinitialisé</Btncomponents>
  );

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <Lottiecomponents />
      <View style={{ marginVertical: 250 }}>
        <View style={GlobaleStyles.container}>
          <View style={GlobaleStyles.section}>
            <TextinputComponent
              label="Email"
              value={email}
              setValue={setEmail}
            />
            {btnMotDePasseOublier}
          </View>
          <Btncomponents
            onPress={() => navigation.navigate("Login")}
            style={GlobaleStyles.btncustom}
            mode="contained-tonal"
          >
            Se Connecter
          </Btncomponents>
          <IconComponent />
        </View>
      </View>

      <ToastConfig />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({});

export default ForgotPassword;
