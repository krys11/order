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
//Toast
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
//Color
import { Colors } from "../../constant/Colors";
//globales styles
import { GlobaleStyles } from "../../globaleStyles/GlobaleStyles";
//firebase api
import { resetPasswordUser } from "../../firebase/ApiFirebase";

//costum config Toast
const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "pink" }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: Colors.colorBlack,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
        color: Colors.colorWhite,
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: Colors.colorBlack,
      }}
      text1Style={{
        fontSize: 15,
        color: Colors.colorWhite,
      }}
      text2Style={{
        fontSize: 15,
        color: Colors.colorWhite,
      }}
    />
  ),
};

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

  //Toast message
  const showToastSuccess = () => {
    Toast.show({
      type: "success",
      text1: "Email envoyer, Verifier votre boite de reception email 👋",
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

  //function de reset mot de passe
  const userPasswordForget = async () => {
    let er;
    setActivityIndicator(true);
    Keyboard.dismiss();

    if (email.length !== 0) {
      try {
        // await onResetPassword(email);
        await resetPasswordUser(email.trim());
        cleanVariable();
        showToastSuccess();
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
    <View style={GlobaleStyles.container}>
      <Lottiecomponents />
      <View style={GlobaleStyles.section}>
        <TextinputComponent label="Email" value={email} setValue={setEmail} />
        {btnMotDePasseOublier}
      </View>
      <Btncomponents
        onPress={() => navigation.navigate("Login")}
        style={GlobaleStyles.btncustom}
        mode="contained-tonal"
      >
        Se Connecter
      </Btncomponents>
      <Toast config={toastConfig} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ForgotPassword;
