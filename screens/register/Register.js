import { View, StyleSheet, Keyboard } from "react-native";
import React, { useState, useEffect } from "react";
//firebase function
import { onRegister, setUserCollection } from "../../firebase/Firebase";
//navigation
import { useNavigation } from "@react-navigation/native";
//components
import TextinputComponent from "../../components/TextinputComponent";
import Lottiecomponents from "../../components/Lottiecomponents";
import Btncomponents from "../../components/Btncomponents";
import Activityindicatorcomponent from "../../components/Activityindicatorcomponent";
//Toast
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
//Color
import { Colors } from "../../constant/Colors";
//globales styles
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

const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [activityIndicator, setActivityIndicator] = useState(false);

  //vider les champs
  const cleanVariable = () => {
    setEmail(""), setTel(""), setPassword(""), setPassword2("");
  };

  //Toast message
  const showToastSuccess = () => {
    Toast.show({
      type: "success",
      text1: "Enregistrement reussi👋",
      visibilityTime: 5000,
    });

    setTimeout(() => {
      navigation.navigate("Login");
    }, 5000);
  };

  const showToastError = (msg) => {
    Toast.show({
      type: "error",
      text1: msg + " 👋",
      position: "top",
      visibilityTime: 5000,
    });
  };

  //function Register
  const userRegister = async () => {
    let er;
    Keyboard.dismiss();
    setActivityIndicator(true);

    if (
      name.length !== 0 &&
      email.length !== 0 &&
      tel.length !== 0 &&
      password.length !== 0 &&
      password2.length !== 0
    ) {
      if (password === password2) {
        try {
          const UserCredential = await onRegister(email, password);
          if (UserCredential) {
            try {
              await setUserCollection(UserCredential.user.uid, {
                email,
                tel,
                name,
              });
              setActivityIndicator(false);
              cleanVariable();
              showToastSuccess();
            } catch (error) {
              console.log("Register:::::", error);
            }
          } else {
            return;
          }
        } catch (error) {
          setActivityIndicator(false);
          console.log(error.code);
          if (error.code === "auth/wrong-password") {
            er = "Mot de passe incorrect";
            setErrMsg(er);
          } else if (error.code === "auth/weak-password") {
            er = "Le mot de passe doit depasser de 6 lettres";
            setErrMsg(er);
          } else if (error.code === "auth/email-already-in-use") {
            er = "Cet email est deja utiliser";
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
        er = "Les deux mots de passe doivent etre conforme";
        setErrMsg(er);
      }
    } else {
      setActivityIndicator(false);
      er = "Veillez remplire tous les champs";
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

  //btnSinscrire
  const btnSinscrire = activityIndicator ? (
    <Activityindicatorcomponent />
  ) : (
    <Btncomponents onPress={userRegister} style={{ width: 150 }}>
      Inscription
    </Btncomponents>
  );

  return (
    <View style={GlobaleStyles.container}>
      <Lottiecomponents />
      <View style={[GlobaleStyles.section, { height: 450 }]}>
        <TextinputComponent label="Prénom" value={name} setValue={setName} />

        <TextinputComponent label="Email" value={email} setValue={setEmail} />
        <TextinputComponent label="Téléphone" value={tel} setValue={setEmail} />
        <TextinputComponent
          label="Créer un mot de passe"
          value={password}
          setValue={setPassword}
        />
        <TextinputComponent
          label="Confimer votre mot de passe"
          value={password2}
          setValue={setPassword2}
        />

        {btnSinscrire}
      </View>
      <Btncomponents
        onPress={() => navigation.navigate("Login")}
        mode="contained-tonal"
        style={GlobaleStyles.btncustom}
      >
        Se Connecter
      </Btncomponents>
      <Toast config={toastConfig} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Register;
