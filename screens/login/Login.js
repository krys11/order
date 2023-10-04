import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
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
//Toast
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
//Color
import { Colors } from "../../constant/Colors";
//context
import { MyContext } from "../../context/MyContext";
//Firestore
import { getUserData } from "../../firebase/Firebase";
//globale styles
import { GlobaleStyles } from "../../globaleStyles/GlobaleStyles";

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

const Login = () => {
  const { setLocalDataLogin, setUserUID, setCommande, setFacture } =
    useContext(MyContext);
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
        if (UserCredential) {
          setUserUID(UserCredential.user.uid);
          try {
            const dataCheck = await getUserData(UserCredential.user.uid);
            if (dataCheck) {
              try {
                const data = {
                  ...dataCheck.data(),
                  userID: UserCredential.user.uid,
                };
                console.log("loginCheck", data);
                await saveUserUIDLocal(data);
                setActivityIndicator(false);
                cleanVariable();
                showToastSuccess();
                setTimeout(() => {
                  setCommande(dataCheck.data().commande);
                  setFacture(dataCheck.data().facture);
                  setLocalDataLogin(dataCheck.data());
                }, 1000);
              } catch (error) {
                console.log("LoginErrorgetUserData:::::::::", error);
              }
            }
          } catch (error) {
            console.log("LoginErrorAsyncSave::::::::", error);
          }
        }
      } catch (error) {
        setActivityIndicator(false);
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
    <View style={GlobaleStyles.container}>
      <Lottiecomponents />
      <View style={[GlobaleStyles.section, { height: 250 }]}>
        <TextinputComponent label="Email" value={email} setValue={setEmail} />
        <TextinputComponent
          label="Mot de passe"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        {btnSeConnecter}
      </View>
      <Btncomponents
        onPress={() => navigation.navigate("Forgetpassword")}
        style={GlobaleStyles.btncustom}
        mode="contained-tonal"
      >
        Mot de Passe Oublié
      </Btncomponents>
      <Toast config={toastConfig} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Login;
